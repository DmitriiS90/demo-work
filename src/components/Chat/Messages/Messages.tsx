import React, { useEffect, useState } from 'react';
import { ChatMessageType } from '../../../types/types';

const Messages: React.FC<{webSocketChannel: WebSocket | null}> = ({webSocketChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(()=>{
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages)=>[...prevMessages, ...newMessages])
        }
        webSocketChannel?.addEventListener('message', messageHandler)
        
        return () => {
            webSocketChannel?.removeEventListener('message', messageHandler)
        }
    },[webSocketChannel])

    return (
        <div style={{height:'500px', overflowY:'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
  
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