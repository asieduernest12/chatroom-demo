import React, { useContext } from "react";
import { MessengerContext } from "../MessengerContextProvider";

function Welcome(props) {
	const { store, setSender } = useContext(MessengerContext);
	const { sender } = { sender: { name: "sender" }, receiver: { name: "receiver" }, ...store };

	const updateSender = (event) => {
		event.preventDefault();

		console.log(event.target.elements.sender_name.value);
		setSender({ name: event.target.elements.sender_name.value });
	};
	return (
		<>
			<div> Welcome home</div>
			<form action='' onSubmit={updateSender}></form>
			<label htmlFor=''>
				Sender name <input type='text' name='sender_name'  value={sender?.name} />
			</label>
		</>
	);
}

export default Welcome;
