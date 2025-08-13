import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import ContextualPanel from './ContextualPanel';
import './ChatPage.css';

const ChatPage = () => {
  const location = useLocation();
  const initialQuery = location.state?.initialQuery || '';
  
  const [messages, setMessages] = useState([]);
  const [productResults, setProductResults] = useState([]);
  const [recommendedProductId, setRecommendedProductId] = useState(null); // State for the recommended product's ID
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getChatResponse = async (query) => {
    setIsLoading(true);
    setProductResults([]);
    setRecommendedProductId(null); // Reset recommendation on new query

    try {
      const response = await fetch('http://20.115.96.172:8001/ask_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'U002', user_query: query }),
      });

      if (!response.ok) throw new Error(`API request failed: ${response.status}`);

      const data = await response.json();
      const apiReplyText = `${data.insight}\n${data.recommendation}`;
      setMessages(prev => [...prev, { text: apiReplyText, sender: 'api' }]);

      if (data.results) {
        setProductResults(data.results);
        
        // *** LOGIC TO FIND RECOMMENDED PRODUCT ***
        // Find the product that matches the recommendation text.
        // This is a simple parser based on the example response.
        const recommendationText = data.recommendation.toLowerCase();
        const recommendedProduct = data.results.find(p => 
            recommendationText.includes(p.supplier_name.toLowerCase()) && 
            recommendationText.includes(p.unit_price.toString())
        );

        if (recommendedProduct) {
          setRecommendedProductId(recommendedProduct.product_id);
        }
      }

    } catch (error) {
      console.error("Chat API error:", error);
      setMessages(prev => [...prev, { text: "There was an error connecting to the chat service.", sender: 'api' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setMessages([{ text: initialQuery, sender: 'user' }]);
      getChatResponse(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      getChatResponse(input);
      setInput('');
    }
  };

  return (
    <div>
      <Header />
      <div className="chat-layout-container">
        <div className="chat-panel-left">
          {/* Chat window code remains the same as before */}
           <div className="chat-window">
            <div className="chat-messages">
              {messages.map((msg, index) => {
                if (index === 0 && msg.sender === 'user') {
                  return <div key={index} className="user-query-bubble">{msg.text}</div>;
                }
                if (msg.sender === 'api') {
                  const parts = msg.text.split('\n');
                  const insight = parts[0] || '';
                  const recommendation = parts[1] || '';
                  return (
                    <div key={index} className="message api-structured">
                      <p dangerouslySetInnerHTML={{ __html: insight.replace(/•/g, '<br/>•') }} />
                      <p><strong>{recommendation}</strong></p>
                    </div>
                  );
                }
                return <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>;
              })}
              {isLoading && <div className="message api loading">...</div>}
            </div>
            <form className="chat-input-area" onSubmit={handleSend}>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={isLoading ? "Waiting for response..." : "Ask a follow-up question..."} disabled={isLoading}/>
              <button type="submit" disabled={isLoading}>Send</button>
            </form>
          </div>
        </div>
        <div className="content-panel-right">
          {/* Pass both the results and the recommended ID to the panel */}
          <ContextualPanel 
            productData={productResults} 
            recommendedId={recommendedProductId} 
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
