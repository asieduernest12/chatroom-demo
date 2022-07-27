import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessengerContext } from "../MessengerContextProvider";

function ChatDetails(props) {
	const { store, /** @type {updateStore} */ updateStore } = /** @type {MessagerStoreInterface} */ useContext(MessengerContext);
	const { state: receiver } = useLocation();
	const sender = store?.sender

	const messageFilter = (msg) =>
		(msg.sender.name === store.sender.name && msg.receiver.name === store.receiver.name) ||
		(msg.sender.name === store.receiver.name && msg.receiver.name === store.sender.name);

	const messages = (store?.message ?? []).filter(messageFilter);
	const [msg_text, setMsgText] = useState("");

	const showMessages = (msgs) => {
		return msgs.map(msgToHtml);
	};

	const sendMessage = (message) => updateStore("messages", [...messages, message]);

	const msgToHtml = (msg, key) => {
		let classes = "chat__message bg-pink-300 p-2 mb-2";
		classes += msg.sender.name === props.sender.name ? " ml-auto  border-r-8" : "  border-l-8";

		return (
			<div className='chat__row flex' key={key}>
				<div className={classes}>{msg.message}</div>
			</div>
		);
	};
	const reverseSend = () => {
		props.sendMessage({ message: msg_text, sender: receiver, receiver: props.sender });
		setMsgText("");
	};
	const forwardSend = () => {
		sendMessage({ message: msg_text, sender: props.sender, receiver: receiver });
		setMsgText("");
	};

	return (

		<div className='chats flex flex-col h-full p-3'>
			<div className='chats__header w-full'>
				{receiver.name} {messages.length}
			</div>
			<div className='chats__messages'>{showMessages(messages)}</div>
			<div className='chats__footer flex mt-auto'>
				<button className='chats__send_btn bg-blue-500' onClick={reverseSend}>
					Send from {receiver.name}
				</button>
				<input type='text' placeholder='message' onChange={(event) => setMsgText(event.target.value)} value={msg_text} />
				<button className='chats__send_btn bg-orange-500' onClick={forwardSend}>
					Send From {sender.name}
				</button>
			</div>
		</div>
	);
}

export default ChatDetails;
