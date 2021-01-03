import React from 'react';
import AddMessage from './AddMessage/AddMessage';
import Messages from './Messages/Messages';

const Chat = () => {
    const webSocketChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

    return (
        <div>
            <Messages webSocketChannel={webSocketChannel}/>
            <AddMessage webSocketChannel={webSocketChannel}/>
        </div>
    )
}


export default Chat