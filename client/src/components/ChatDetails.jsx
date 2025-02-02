import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { MessengerContext } from '../MessengerContextProvider';

function ChatDetails() {
	const MESSAGE_INTERVAL_TIME = 10_000;

	/** @type {MessengerContextValue} */
	const { contextState } = useContext(MessengerContext);

	const navigate = useNavigate();

	const host = contextState?.host;

	const [messages, setMessages] = useState(null);

	const location = useLocation();

	const guest = /** @type {User} */ (location.state); // roomid
	const { roomID } = useParams();

	const [members, setMembers] = useState([]);

	const fetchMessages = async (_roomID = roomID) => {
		const res = await axios.get(`${process.env.REACT_APP_API ?? ''}/api/messages/room/${_roomID}`).then((_res) => _res.data);
		const docs = (res?.rows ?? []).map(({ doc }) => doc);
		setMessages(docs);
	};

	// const fetchMembers = (roomId) => {
	// 	// return
	// };

	useEffect(() => {
		if (!contextState?.host) {
			alert('Error: You must set a username');
			navigate('/');
		}
	}, [contextState]);

	useEffect(() => {
		setMembers([]);

		if (!roomID) return;

		fetchMessages(roomID);

		const fetchMessagesInterval = setInterval(async () => {
			try {
				await fetchMessages(roomID);
			} catch (error) {
				clearInterval(fetchMessagesInterval);
				throw Error('Error: unable to fetch messages');
			}
		}, MESSAGE_INTERVAL_TIME);

		// eslint-disable-next-line consistent-return
		return function cleanUp() {
			clearInterval(fetchMessagesInterval);
		};
	}, [roomID]);

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

	const [msgText, setMsgText] = useState('');

	const msgToHtml = (msg, key) => {
		const placementStype = msg?.sendername === host.username ? ' ml-auto  border-r-8' : ' mr-auto  border-l-8';

		return (
			<div className='chat__message_row  [  flex ] [  ]' key={key} data-sender={msg?.sender_id}>
				<div className={`chat__message [ flex flex-col ] [ bg-pink-200 ${placementStype} ]`}>
					<div className='message_text p-2 '>{msg?.message ?? 'Error: no msg'}</div>
					<span className='message_sender bg-pink-300 text-xs p-2 pt-0'>{msg?.sendername ?? 'No sender'}</span>
				</div>
			</div>
		);
	};

	const showMessages = (msgs) => msgs && msgs.map(msgToHtml);

	const sendMessageHandler = async (event) => {
		try {
			event.preventDefault();

			const newMessage = {
				message: msgText,
				sender_id: '',
				room_id: roomID,
				sendername: host?.username,
			};

			await axios.post(`${process.env.REACT_APP_API ?? ''}/api/messages`, { new_message: newMessage });
			fetchMessages(roomID);
			setMsgText('');
		} catch (error) {
			throw Error('Error: sending new message');
		}
	};

	return (
		<div className='chat-details [ flex ] [ w-full h-full ]'>
			<form className='chats [ flex flex-col gap-3 ] [ h-full p-3 w-2/3 ]' onSubmit={sendMessageHandler}>
				<div className='chats__header w-full h-[5%] '>Messages {messages?.length ?? 0}</div>

				<div className='chats__messages [ flex flex-col gap-3 ] [ h-[80%] overflow-auto mt-auto ]'>{showMessages(messages)}</div>

				<div className='chats__footer [ flex mt-auto ] [ h-[45px] ]'>
					<input
						type='text'
						className='new_message_input [ ]  [ w-3/4 p-3 ]'
						placeholder='message'
						onChange={(event) => setMsgText(event.target.value)}
						value={msgText}
					/>
					<button className='chats__send_btn [ bg-blue-400 p-3 w-1/4 ]' type='submit'>
						Send {guest?.username}
					</button>
				</div>
			</form>

			<div className='contacts__content [ flex-col gap-3 ] [ w-1/3 bg-blue-400 p-2 ]'>
				<h2 className='mb-3 mt-6'>Members Online</h2>
				{showMembers(members)}
			</div>
		</div>
	);
}

export default ChatDetails;
