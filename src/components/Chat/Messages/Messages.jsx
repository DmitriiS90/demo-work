import React, { useEffect, useState } from 'react';

const Messages = ({webSocketChannel}) => {

    const [messages, setMessages] = useState([])

    useEffect(()=>{
        webSocketChannel.addEventListener('message', (e)=>{
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages)=>[...prevMessages, ...newMessages])
        })
    },[])

    return (
        <div style={{height:'500px', overflowY:'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

const Message = ({message}) => {
  
    return (
        <div>
            <img src={message.photo} /> <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
}

export default Messages