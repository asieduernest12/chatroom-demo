import React, { useState } from 'react';

function Chats(props) {
    const [msg_text, setMsgText] = useState("")


    const showMessages = (msgs) => {
        return (msgs.map(msgToHtml))
    }



    const msgToHtml = (msg, key) => {

        let classes = 'chat__message bg-pink-300 p-2 mb-2'
        classes += (msg.sender.name === props.sender.name) ? ' ml-auto  border-r-8' : '  border-l-8'

        return (
            <div className="chat__row flex" key={key}>
                <div className={classes}>
                    {msg.message}
                </div>
            </div>

        )
    }
    const reverseSend = () => {
        props.sendMessage({ message: msg_text, sender: props.receiver, receiver: props.sender });
        setMsgText('');
    }
    const forwardSend = () => {
        props.sendMessage({ message: msg_text, sender: props.sender, receiver: props.receiver });
        setMsgText('');
    }


    return (
        <div className='chats flex flex-col h-full p-3'>
            <div className="chats__header w-full">
                {props.receiver.name} {props.messages.length}
            </div>
            <div className="chats__messages">
                {showMessages(props.messages)}
            </div>
            <div className="chats__footer flex mt-auto">

                <button className='chats__send_btn bg-blue-500' onClick={reverseSend}>
                    Send from {props.receiver.name}
                </button>
                <input type="text" placeholder='message' onChange={(event) => setMsgText(event.target.value)} value={msg_text} />
                <button className='chats__send_btn bg-orange-500' onClick={forwardSend}>
                    Send From {props.sender.name}
                </button>
            </div>
        </div>
    );
}

export default Chats;