import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Chats() {
	const [rooms, setRooms] = useState(null);

	const fetchRooms = async () => {
		const res = await axios.get('/api/rooms').then((_res) => _res.data);
		console.log(res);
		setRooms(res.rows.map(({ doc }) => doc));
	};


	const makeChatNameClassName = ({isActive}) => `chat_room_item_link [  ] [ p-3  ${isActive ? 'bg-orange-200': 'bg-blue-100'} ]`
	useEffect(() => {
		fetchRooms();
	}, []);

	return (
		<div className='chats-page [ flex flex-row ] [ w-full h-full  lg:px-[30rem] ]'>
			<div className='chat-rooms [ flex flex-col gap-5 ] [ w-1/4 p-5 bg-orange-500 ] '>
				<h2>Chat rooms</h2>

				{rooms &&
					rooms?.map(({ name, _id }) => (
						<NavLink key={_id} className={makeChatNameClassName} to={`room/${_id}`}>
							{name}
						</NavLink>
					))}
			</div>

			<div className='chat_details_container [  ] [ w-3/4 bg-orange-300 ]'>
				<Outlet>
					<span>Nothing has been defined</span>
				</Outlet>
			</div>
		</div>
	);
}

export default Chats;
