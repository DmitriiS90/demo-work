import React, { useState } from 'react';

const AddMessage = ({webSocketChannel}) => {

    const [message, setMessage] = useState('')

    const sendMessage = () =>{
        if(!message) {
            return
        }
        webSocketChannel.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default AddMessage