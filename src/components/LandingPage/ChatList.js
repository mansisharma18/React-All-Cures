import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { backendHost } from '../../api-config'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { userId } from '../UserId';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ChatWindow from '../Profile/ChatWindow';
import { userAccess } from '../UserAccess';




import './ChatList.css';


export default function App(usr_id) {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [alert, setAlert] = useState();
  const [chats, setChats] = useState([]);
  const [first,setFirst]=useState([])
  const [last,setLast]=useState([])
  const [header,setHeader]=useState(false)
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const fromId = userId;
  const [toId,setToId]=useState()
  const [showChatWindow, setShowChatWindow] = useState(false);
  const chatRef=useRef(null)
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    axios.get(`${backendHost}/chat/list/${userId}`)
      .then(response => {
        console.log(response.data)
        setChatList(response.data);
      })
      .catch(error => {
        console.log(error);
      });

      console.log(chats)
  }, [usr_id]);

  const checkChat=(getId)=>{

   console.log(getId)
    axios.get(`${backendHost}/chat/${userAccess!=1?userId:getId}/${userAccess!=1?getId:userId}`)
    .then(res=>{
      setChatId(res.data[0].Chat_id)
      setToId(getId)
      setChats(res.data);
      
     
    
    
      }
    ).catch(err=>err)
    
  }
  
  const handleClick = (chat) => {

   const chatData= new Promise((resolve,reject)=>{
resolve(    chatList.map((item)=>{
  checkChat(item.User)

}))

   })
   chatData.then(()=>{
    setSelectedChat(chat);
    setFirst(chat.First_name)
    setLast(chat.Last_name)
    setHeader(true)
    const ws = new WebSocket("ws://all-cures.com:8000");
    ws.onopen = () => {
      console.log("Connected to the Chat Server");
      ws.send(`{"Room_No":"${chatId}"}`);
    };
    ws.onmessage = (event) => {
      console.log(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false }))
      const time=new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
      const from = event.data.split(':')[0];
      const receivedMessage = event.data.split(':').pop();
      const newChat={
        Message:receivedMessage,
        From_id:userId
      }
      console.log("Message", from);
      setChats(prevMessages => [...prevMessages,newChat]);
      chatRef.current.scrollIntoView({ behavior: 'smooth' }); 
    };
    setSocket(ws);
   })
   
  
  };

  useEffect(() => {
   
  }, []);

  const sendMessage = (e) => {
    
    e.preventDefault();
    const newChat={
      Message:message,
      From_id:userId

    }

   
    setChats(prevMessages => [...prevMessages,newChat]);
    const ToId = toId;
    const chatId = chats[0].Chat_id;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
    const newMessage = `${fromId}:${ToId}:${chatId}:${message}`;
    socket.send(newMessage);
    setMessage('');
    chatRef.current.scrollIntoView({ behavior: 'smooth' });
    
  console.log(newMessage)
  
  };
  return (
 <>
 <Header/>
 <div className='p-4'>
  <div className='border'>
 <div className="container1">
      <div className="chat">
      <div className='message-header'>
      <FontAwesomeIcon icon={faInbox} size={'3x'} />


        <div className='header-info'>
      
      <h3 style={{color:'#00415e',marginLeft:20}}>Inbox</h3>
        </div>
      </div>

     <div className="chat-list">
      {chatList.map(user => (
        <div key={user.user} className={`chat-item ${selectedChat === user ? 'selected-chat' : ''}`} >
           <FontAwesomeIcon icon={faUserCircle} size={'3x'} />
          <div className="chat-info" style={{marginLeft:20}} onClick={() => handleClick(user)} >
            <h3 >{user.First_name} {user.Last_name}</h3>
            <p>{user.Message}</p>
          </div>
          <div className="chat-time">{moment(user.Time).format('h:mm A')}</div>
        </div>
      ))}
    </div>


      </div>

      <div className="message">

      <div className='message-header' style={{display:header?'flex':'none'}} >
      <FontAwesomeIcon icon={faUserCircle} size={'3x'} />
        <div className='header-info'>
<h3 style={{color:'#00415e',marginLeft:20}} >{first} {last}</h3>
        </div>
      </div>

      <div className="message-list">
      {chats.map((message, index) => {
        const isSender = message.From_id === userId;
        const messageClass = isSender ? 'sender-message' : 'receiver-message';

        return (
          <div key={index} className={`message-item ${messageClass}`} ref={chatRef}>
            <p className="message-text" style={{color:message.From_id===userId?'#fff':'#000'}}>{message.Message}
            
            <span className="message-time"  style={{color:message.From_id===userId?'#fff':'#000'}}>{moment(message.Time).format('h:mm A')}</span>

            </p>          </div>
        );
      })}




    </div>

   
      
    <div className='message-footer' style={{display:header?'flex':'none'}} >
        <form onSubmit={sendMessage}>
          <input type='text' placeholder='Type a message' value={message} onChange={(e) => setMessage(e.target.value)}  />
          <button type='submit' >send message</button>
        </form>

      </div>
  

      </div>



    </div>
    </div>
    </div>
     <Footer/>
    </>
  );
}
