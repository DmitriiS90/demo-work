import React, { useEffect, useState } from 'react';

const AddMessage: React.FC<{webSocketChannel: WebSocket | null}> = ({webSocketChannel}) => {
    const [message, setMessage] = useState('')

    const [readyStatus, setReadyStatus] = useState('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        }

        webSocketChannel?.addEventListener('open', openHandler)

        return () => {
            webSocketChannel?.removeEventListener('open', openHandler)
        }
    },[webSocketChannel])

    const sendMessage = () =>{
        if(!message) {
            return
        }
        webSocketChannel?.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={webSocketChannel == null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default AddMessage