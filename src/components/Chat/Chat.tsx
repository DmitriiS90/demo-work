import React, { useEffect, useState } from 'react';
import AddMessage from './AddMessage/AddMessage';
import Messages from './Messages/Messages';

const Chat: React.FC = () => {
    const [webSocketChannel, setWebSocketChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket

        const closeHandler = () => {
            console.log('close channel')
            setTimeout(createChannel, 4000)
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

            webSocketChannel?.addEventListener('close', closeHandler)

            setWebSocketChannel(ws)
        }
        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages webSocketChannel={webSocketChannel} />
            <AddMessage webSocketChannel={webSocketChannel} />
        </div>
    )
}


export default Chat