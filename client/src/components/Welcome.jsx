import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MessengerContext } from '../MessengerContextProvider';

function Welcome() {
	/** @type {MessengerContextValue} */
	const context = useContext(MessengerContext);

	const { contextState } = context;
	const { setHost } = context;

	console.log({ contextState: context.contextState, context });

	const host = contextState?.host;

	const handleUpdateHost = (event) => {
		event.preventDefault();

		console.log(event.target.elements.host_name.value);
		setHost({ username: event.target.elements.host_name.value });
	};

	return (
		<div className='welcome [ flex flex-col ] [ bg-orange-300 w-[70%] m-auto h-full p-5 ]'>
			<div> Welcome home</div>
			<form action='' onSubmit={handleUpdateHost} className=' [ flex flex-col ] [ ]'>
				<ol>
					<h1>Register</h1>
					<li>
						<div className='form_group [ flex ]  '>
							<label htmlFor='host_name' className=' [ flex ] [ w-full ]'>
								<span>Sender name</span>
								<input type='text' id='host_name' name='host_name' value={host?.username} className=' [  ] [ w-3/4 p-5 ]' />
							</label>
						</div>
					</li>
					<li>
						<div className='form_group [ flex ]'>
							<button type='submit' className=' [  ] [ w-3/4 bg-blue-600 ml-auto p-5 text-left pl-0 ]'>
								Submit
							</button>
						</div>
					</li>
				</ol>
			</form>

			<div className='ready [ flex flex-col ] [  ]'>
				<span>Ready</span>
				<Link to='/chats' className=' [  ] [ w-3/4 ml-auto bg-blue-200 ]'>
					Go to Chat rooms
				</Link>
			</div>
		</div>
	);
}

export default Welcome;
