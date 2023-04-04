import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendHost } from '../../api-config';

import './ChatList.css';

function ChatList({ usr_id }) {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    axios.get(`${backendHost}/chat/list/18`)
      .then(response => {
        setChatList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [usr_id]);

  

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="chat-list-container">
      <div className="chat-list">
        {chatList.map(chat => (
          <div className={`chat-message ${selectedChat === chat ? 'selected' : ''}`} key={chat.Rowno} onClick={() => handleChatClick(chat)}>
            <img src={chat.avatarUrl} alt="Avatar" className="avatar" />
            <div className="details">
              <div className="name">{chat.First_name} {chat.Last_name}</div>
              <div className="message">{chat.Message}</div>
            </div>
            <div className="time">{chat.Time}</div>
            {chat.unread && <div className="unread-indicator"></div>}
          </div>
        ))}
      </div>
      <div className="chat-view">
        {selectedChat && (
          <div className="chat-view-container">
            <div className="chat-view-header">
              <div className="name">{selectedChat.First_name} {selectedChat.Last_name}</div>
              <div className="status">Online</div>
            </div>
            <div className="chat-view-messages">
              {/* render messages for selected chat here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatList;
