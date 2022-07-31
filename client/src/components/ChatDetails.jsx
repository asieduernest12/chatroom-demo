import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { MessengerContext } from '../MessengerContextProvider';

function ChatDetails() {
	const MESSAGE_INTERVAL_TIME = 15_000;

	// /** @type {MessengerContextValue} */
	// const { contextState, sendMessage } = useContext(MessengerContext);

	const [messages, setMessages] = useState(null);

	const location = useLocation();

	const guest = /** @type {User} */ (location.state); //roomid
	const { room_id } = useParams();

	const [members, setMembers] = useState([]);

	const fetchMessages = async (room_id) => {
		const res = axios.get('api/messages/room/' + room_id).then((res) => res.data);
		setMessages((oldMessages) => {
			const docs = (res?.['rows'] ?? []).map(({ doc }) => doc);
			let tempSet = new Set(...(oldMessages ?? []), ...docs);
			return [...tempSet];
		});
	};

	const fetchMembers = (roomId) => {
		// return
	};

	useEffect(() => {
		setMembers([]);

		if (!room_id) return;

		console.log('room_id', room_id, location);

		fetchMessages(room_id);

		const fetchMessagesInterval = setInterval(async () => {
			try {
				await fetchMessages();
			} catch (error) {
				if (!res?.['rows']) {
					clearInterval(fetchMessagesInterval);
					throw alert('Error: unable to fetch messages');
				}
			}
		}, MESSAGE_INTERVAL_TIME);

		return () => {
			console.log('clearing interval');
			clearInterval(fetchMessagesInterval);
		};
	}, []);

	const makeMemberElement = (contact, key) => (
		<Link to={contact.name} state={contact} key={key} className='mt-3'>
			<div className='flex border-black'>
				<div className='contact__avatar ml-3 mr-3'>
					<img src={contact.url} alt={contact.name} className='rounded-full h-20 w-20' />
				</div>
				<div className='contact__content'>
					<h2 className='ml-2 message__title text-left'>{contact.name}</h2>
					<p className='message__peak text-left'>Lorem ipsum dolor sit amet.</p>
				</div>
				<div className='contact__stats flex flex-col'>
					<span className='message__time text-right'> 12:01 AM</span>
					<span className='message__count text-right'>41</span>
				</div>
			</div>
		</Link>
	);

	const showNoContacts = () => <div>Your contacts is empty</div>;

	const showMembers = (list) => (list.length ? list.map(makeMemberElement) : showNoContacts());

	// const host = contextState?.host;

	// const messageFilter = (msg) =>
	// 	(msg.guest.username === guest?.username && msg.host.username === host?.username) ||
	// 	(msg.guest.username === host?.username && msg.host.username === guest?.username);

	// const messages = (contextState?.messages ?? []).filter(messageFilter);

	// console.log({ state,context });
	const [msgText, setMsgText] = useState('');

	const msgToHtml = (msg, key) => {
		let classes = 'chat__message bg-pink-300 p-2 mb-2';
		classes += msg.guest.username === guest.username ? ' ml-auto  border-r-8' : '  border-l-8';

		return (
			<div className='chat__row flex' key={key}>
				<div className={classes}>{msg.message}</div>
			</div>
		);
	};

	const showMessages = (msgs) => msgs && msgs.map(msgToHtml);

	const forwardSend = () => {
		sendMessage({
			message: msgText,
			host_username: host.username,
			guest_username: guest.username,
			destination_room_id: '',
		});
		setMsgText('');
	};

	return (
		<div className='chat-details [ flex ] [ w-full ]'>
			<div className='chats [ flex flex-col ] [ h-full p-3 w-2/3 ]'>
				<div className='chats__header w-full'>
					{"host here"} {messages?.length ?? 0}
				</div>

				<div className='chats__messages'>{showMessages(messages)}</div>

				<div className='chats__footer flex mt-auto'>
					{/* <button className='chats__send_btn bg-blue-500 hidden' onClick={reverseSend} type='button'>
					Send from {host?.username}
				</button> */}
					<input type='text' placeholder='message' onChange={(event) => setMsgText(event.target.value)} value={msgText} />
					<button className='chats__send_btn bg-orange-500' onClick={forwardSend} type='button'>
						Send {guest?.username}
					</button>
				</div>
			</div>

			<div className='contacts__content [ flex-col gap-3 ] [ w-1/3 ]'>
				<h2 className='mb-3 mt-6'>Members Online</h2>
				{showMembers(members)}
			</div>
		</div>
	);
}

export default ChatDetails;
