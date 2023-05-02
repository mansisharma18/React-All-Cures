import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


function ChatApp() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [time,setTime]=useState(new Date())

  const fromId = 3;

  useEffect(() => {
    const ws = new WebSocket("ws://all-cures.com:8000");
    ws.onopen = () => {
      console.log("Connected to the Chat Server");
      ws.send("User");
    };
    ws.onmessage = (event) => {
      console.log(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false }))
      const time=new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
      const from = event.data.split(':')[0];
      const receivedMessage = event.data.split(':').pop();
      console.log("Message", from);
      setMessages(prevMessages => [...prevMessages, { fromId: from, message: receivedMessage,time:time }]);
    };
    setSocket(ws);
  }, []);

  // const sendMessage = (e) => {
  //   e.preventDefault(); 
  //   const toId = 18;
  //   const chatId = 1;
  //   const time=new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
  //   const newMessage = `${fromId}:${toId}:${chatId}:${message}`;
  //   socket.send(newMessage);
  //   setMessage('');
  //   setMessages(prevMessages => [...prevMessages, { fromId: 3, message: message,time: time }]);
  // };

  const sendMessage = (e) => {
    e.preventDefault();
    const toId = 18;
    const chatId = 1;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
    const newMessage = `${fromId}:${toId}:${chatId}:${message}`;
    socket.send(newMessage);
    setMessage('');
    setMessages(prevMessages => [...prevMessages, { fromId: 3, message: message, time: time }]);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  return (
 
   <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
        {messages.map((message, index) => (
          <>
          <div className={`message-container ${message.fromId === 3 ? 'sent' : 'received'}`} key={index}>
            <div>
              {message.message}
              </div>
            <div>
               {message.time}
            </div>
            </div>

          </>
        ))}
        <div style={{justifyContent:'space-between',display:'flex'}}>
              {/* <input type="text" style={{width:'80%'}} value={message} onChange={(e) => setMessage(e.target.value)} /> */}
              <input type="text" style={{width:'80%'}} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} />

{/* <button style={{backgroundColor:'#00415e',borderRadius:200}} onClick={sendMessage}>
  <FontAwesomeIcon icon={faPaperPlane} />
</button> */}

      <button style={{backgroundColor:'#00415e',borderRadius:200}} onClick={sendMessage}>Send</button>
      </div>
      
      </div>

  );
}

export default ChatApp;
