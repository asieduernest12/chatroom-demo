import React, { useContext } from 'react';
import { MessengerContext } from '../MessengerContextProvider';

function Welcome() {
	/** @type {MessengerContextValue} */
	const { contextState, setHost } = useContext(MessengerContext);

	const host = contextState?.host;

	const handleUpdateHost = (event) => {
		event.preventDefault();

		console.log(event.target.elements.sender_name.value);
		setHost({ username: /** @type {string} */ (event.target.elements.sender_name.value) });
	};

	return (
		<div className='welcome [ flex flex-col ] [ bg-orange-300 w-[70%] m-auto h-full p-5 ]'>
			<div> Welcome home</div>
			<form action='' onSubmit={handleUpdateHost} className=' [ flex flex-col ] [ ]' />
			<label htmlFor='host_name' className=' [ flex ] [  ]'>
				<span>Sender name</span> <input type='text' name='host_name' value={host?.username} />
			</label>
		</div>
	);
}

export default Welcome;
