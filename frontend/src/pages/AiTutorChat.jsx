import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  User,
  Plus,
  Trash2,
  Copy,
  Check,
  MessageSquare,
  PanelLeft,
  ArrowRight
} from 'lucide-react';
import { toast } from '../utils/toast';
import { getTutorReply } from '../services/tutorService';
import './AiTutorChat.css';

const initialConversations = [
  { id: 'session-1', title: 'Programming Concepts' }
];

const AiTutorChat = () => {
  const [chats, setChats] = useState(initialConversations);
  const [activeChatId, setActiveChatId] = useState('session-1');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;
    if (mobileDrawerOpen) setMobileDrawerOpen(false);

    const userMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getTutorReply(query);
      const botMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: reply.text,
        chips: reply.chips || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 500);
  };

  const handleNewChat = () => {
    const newSession = {
      id: 'session-' + Date.now(),
      title: 'Conversation ' + (chats.length + 1)
    };
    setChats((prev) => [newSession, ...prev]);
    setActiveChatId(newSession.id);
    setMessages([]);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied definition to clipboard!');
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <main className='aitutor-container'>
      {mobileDrawerOpen && (
        <div
          className='chat-drawer-backdrop'
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}
      <aside className={`aitutor-sidebar ${mobileDrawerOpen ? 'mobile-open' : ''}`}>
        <button
          type='button'
          className='new-chat-btn'
          onClick={handleNewChat}
        >
          <Plus size={16} />
          <span>New Chat</span>
        </button>
        <div className='chat-sec-heading'>Chat History</div>
        <div className='chat-sessions-list'>
          {chats.map((c) => (
            <button
              key={c.id}
              type='button'
              className={`session-item-btn ${activeChatId === c.id ? 'active' : ''}`}
              onClick={() => setActiveChatId(c.id)}
            >
              <MessageSquare size={14} />
              <span className='session-title-text'>{c.title}</span>
            </button>
          ))}
        </div>
      </aside>
      <section className='aitutor-main'>
        <header className='aitutor-header'>
          <button
            type='button'
            className='mobile-drawer-toggle'
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            title='Toggle history'
          >
            <PanelLeft size={17} />
            <span>History</span>
          </button>
          <div className='header-info'>
            <div className='tutor-badge-icon'>
              <Bot size={18} />
            </div>
            <div>
              <div className='title-with-pill'>
                <h2 className='header-title'>AI Socratic Tutor</h2>
                <span className='socratic-mode-pill'>Definitions Only</span>
              </div>
              <span className='header-sub'>
                Explaining concepts in clear simple sentences • Code should be written in the Code Editor
              </span>
            </div>
          </div>
          <button
            type='button'
            className='clear-chat-btn'
            onClick={handleClearChat}
            title='Clear Chat'
          >
            <Trash2 size={15} />
            <span>Clear</span>
          </button>
        </header>
        {messages.length === 0 ? (
          <div className='empty-chat-screen'>
            <div className='empty-chat-content'>
              <div className='empty-chat-icon'>
                <Bot size={32} />
              </div>
              <h3 className='empty-chat-title'>AI Socratic Tutor</h3>
              <p className='empty-chat-subtitle'>
                Ask any programming concept to get its clear definition in simple words.
              </p>
              <form
                className='input-form-bar empty-input-form'
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <input
                  type='text'
                  className='chat-text-input'
                  placeholder='Ask about a programming concept...'
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button
                  type='submit'
                  className='chat-send-btn'
                  disabled={!inputText.trim() || isTyping}
                  title='Send message'
                >
                  <Send size={15} />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className='messages-viewport'>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
                >
                  <div className='avatar-wrap'>
                    {msg.sender === 'user' ? (
                      <div className='avatar user-avatar' title='You'>
                        <User size={16} />
                      </div>
                    ) : (
                      <div className='avatar bot-avatar' title='AI Socratic Tutor'>
                        <Bot size={16} />
                      </div>
                    )}
                  </div>
                  <div className='bubble-content-box'>
                    <div className='bubble-header'>
                      <span className='bubble-author'>
                        {msg.sender === 'user' ? 'You' : 'AI Socratic Tutor'}
                      </span>
                      <span className='bubble-time'>{msg.timestamp}</span>
                      {msg.sender === 'bot' && (
                        <button
                          type='button'
                          className='copy-msg-btn'
                          onClick={() => handleCopy(msg.id, msg.text)}
                          title='Copy definition'
                        >
                          {copiedId === msg.id ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                    <div className={`message-bubble-body ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                      <p className='definition-text'>{msg.text}</p>
                      {msg.chips && msg.chips.length > 0 && (
                        <div className='related-chips-row'>
                          {msg.chips.map((chip) => (
                            <button
                              key={chip}
                              type='button'
                              className='related-chip-btn'
                              onClick={() => handleSendMessage(chip)}
                            >
                              <span>{chip}</span>
                              <ArrowRight size={12} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className='chat-bubble-row bot-row'>
                  <div className='avatar-wrap'>
                    <div className='avatar bot-avatar'>
                      <Bot size={16} />
                    </div>
                  </div>
                  <div className='bubble-content-box typing-box'>
                    <div className='typing-indicator-wrap'>
                      <span className='typing-label'>AI Tutor is thinking</span>
                      <div className='typing-dots'>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className='aitutor-bottom-panel'>
              <form
                className='input-form-bar'
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <input
                  type='text'
                  className='chat-text-input'
                  placeholder='Ask about a programming concept...'
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button
                  type='submit'
                  className='chat-send-btn'
                  disabled={!inputText.trim() || isTyping}
                  title='Send message'
                >
                  <Send size={15} />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default AiTutorChat;
