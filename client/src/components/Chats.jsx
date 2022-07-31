import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Chats() {
	const [rooms, setRooms] = useState(null);

	const fetchRooms = async () => {
		let res = await axios.get('/api/rooms').then((res) => res.data);
		console.log(res);
		setRooms(res.rows.map(({ doc }) => doc));
	};

	useEffect(() => {
		fetchRooms();
	}, []);

	return (
		<div className='chats-page [ flex flex-row ] [ w-full bg-orange-500 ]'>
			<div className='chat-rooms [ flex flex-col gap-5 ] [ w-1/4 p-5 ] '>
				<h2>Chat rooms</h2>

				{rooms &&
					rooms?.map(({ name, _id }) => (
						<NavLink key={_id} className='chat-join-open-btn [  ] [ p-3 bg-green-500 ]' to={`room/${_id}`}>
							{name}
						</NavLink>
					))}
			</div>

			<div className='chat_details_container [  ] [ w-3/4 ]'>
				<Outlet>
					<span>Nothing has been defined</span>
				</Outlet>
			</div>
		</div>
	);
}

export default Chats;
