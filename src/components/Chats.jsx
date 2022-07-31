import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Chats() {
	return (
		<div className='chats-page [ flex flex-row ] [ w-full bg-orange-500 ]'>
			<div className='chat-rooms [ flex flex-col gap-5 ] [ w-1/4 p-5 ] '>
				<h2>Chat rooms</h2>

				<NavLink className='chat-join-open-btn [  ] [ p-3 bg-green-500 ]' to={`room/${1}`}>
					Room 1
				</NavLink>
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
