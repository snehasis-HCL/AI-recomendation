import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import './ChatPage.css';
import ContextualPanel from './ContextualPanel';

 
const ChatPage = () => {
  const location = useLocation();
  const initialQuery = location.state?.initialQuery || '';
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const getChatResponse = async (query) => {
    setIsLoading(true);
    const storedUser = await window.localStorage.getItem("user");
    console.log(storedUser);
    try {
      const response = await fetch('http://20.115.96.172:8001/ask_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: storedUser.user_id || 'U002',
          user_query: query,
        }),
      });
 
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
 
      const data = await response.json();
      const apiReply = data.insight || "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { text: apiReply, sender: 'api' }]);
 
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
 
  // *** MODIFIED handleSend function ***
  // It now accepts the event 'e' to prevent the default form submission behavior (page reload).
  const handleSend = (e) => {
    e.preventDefault(); // This is crucial to stop the page from reloading
    if (input.trim() && !isLoading) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      getChatResponse(input);
      setInput('');
    }
  };
 
  console.log(messages);
  return (
<div>
<Header />
<div className="chat-layout-container">
<div className="chat-panel-left">
<div className="chat-window">
<div className="chat-messages">
                        {messages.map((msg, index) => (
<div key={index} className={`message ${msg.sender}`}>
                              {msg.text}
</div>
                        ))}
                        {isLoading && <div className="message api loading">...</div>}
</div>
                    {/* *** REFACTORED to use a <form> element *** */}
<form className="chat-input-area" onSubmit={handleSend}>
<input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          // The onKeyPress listener is now gone!
                          placeholder={isLoading ? "Waiting for response..." : "Ask a follow-up question..."}
                          disabled={isLoading}
                        />
                        {/* The button's type is now "submit" */}
<button type="submit" disabled={isLoading}>
                          {isLoading ? 'Sending...' : 'Send'}
</button>
</form>
</div>
</div>
<div className="content-panel-right">
                <ContextualPanel />
            </div>
</div>
</div>
  );
};
 
export default ChatPage;