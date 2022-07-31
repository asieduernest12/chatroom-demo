import React from 'react';
import { Outlet } from 'react-router-dom';

function Chats() {
	// const loadChat = (receiver) => {
	// 	console.log("loading chat for ", receiver);
	// 	setUpChat(receiver);
	// };

	return (
		<div className='chats-page [ flex justify-between ] [ w-full bg-orange-500 ]'>
			<div className='chat-rooms [ flex flex-col ] [ w-[2/7] p-5 ] '>
				<ul>
					<h2>Chat rooms</h2>
					<li>
						<span className='chat-rooms-item label'>room x</span>
						<button className='chat-join-open-btn [  ] [ p-3 bg-green-500 ]' type='button'>
							Join
						</button>
					</li>
					<li>room y</li>
				</ul>
			</div>

			<div className='chat_details_container [  ] [ w-[3/7] ]'>
				<Outlet>
					<span>Nothing has been defined</span>
				</Outlet>
			</div>
		</div>
	);
}

export default Chats;
