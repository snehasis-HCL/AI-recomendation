import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import ContextualPanel from './ContextualPanel';
import './ChatPage.css'; // We will add new styles here

const ChatPage = () => {
  const location = useLocation();
  const initialQuery = location.state?.initialQuery || '';
  
  const [messages, setMessages] = useState([]);
  const [productResults, setProductResults] = useState([]); // State for product results
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getChatResponse = async (query) => {
    setIsLoading(true);
    setProductResults([]); // Clear previous results

    try {
      const storedUser = await window.localStorage.getItem("user");
      const response = await fetch('http://20.115.96.172:8001/ask_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: storedUser.user_id || 'U002',
          user_query: query,
        }),
      });

      if (!response.ok) throw new Error(`API request failed: ${response.status}`);

      const data = await response.json();

      // Combine insight and recommendation for the chat bubble
      const apiReplyText = `${data.insight}\n${data.recommendation}`;
      setMessages(prev => [...prev, { text: apiReplyText, sender: 'api' }]);

      // Set the product results to be passed to the contextual panel
      if (data.results) {
        setProductResults(data.results);
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
          <div className="chat-window">
            <div className="chat-messages">
              {messages.map((msg, index) => {
                // Special style for the user's main query
                if (index === 0 && msg.sender === 'user') {
                  return <div key={index} className="user-query-bubble">{msg.text}</div>;
                }
                
                // New structured style for the API response
                if (msg.sender === 'api') {
                  const parts = msg.text.split('\n');
                  const insight = parts[0] || '';
                  const recommendation = parts[1] || '';

                  return (
                    <div key={index} className="message api-structured">
                      <p>{insight.replace(/•/g, '<br/>•')}</p>
                      <p><strong>{recommendation}</strong></p>
                    </div>
                  );
                }

                // Fallback for regular user follow-up messages
                return <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>;
              })}
              {isLoading && <div className="message api loading">...</div>}
            </div>
            <form className="chat-input-area" onSubmit={handleSend}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "Waiting for response..." : "Ask a follow-up question..."}
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading}>Send</button>
            </form>
          </div>
        </div>
        <div className="content-panel-right">
          {/* Pass the dynamic product results to the panel */}
          <ContextualPanel productData={productResults} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
