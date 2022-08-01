import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessengerContext } from '../MessengerContextProvider';

function Welcome() {
	/** @type {MessengerContextValue} */
	const context = useContext(MessengerContext);

	const {
		contextState: { host },
	} = context;
	const { setHost } = context;

	const [hostInput, setHostInput] = useState({ ...host });

	const handleUpdateHost = (event) => {
		event.preventDefault();

		console.log(event.target.elements.host_name.value);
		setHost({ username: event.target.elements.host_name.value });
	};

	return (
		<div className='welcome [ flex flex-col ] [ bg-orange-300 w-[70%] m-auto h-full p-5 ]'>
			<div> Welcome home</div>
			{!host?.username.length && (
				<form action='' onSubmit={handleUpdateHost} className=' [ flex flex-col ] [ ]'>
					<ol start='1'>
						<h1>Register</h1>
						<li>
							<div className='form_group [ flex ]  '>
								<label htmlFor='host_name' className=' [ flex ] [ w-full ]'>
									<span>Sender name</span>
									<input
										type='text'
										id='host_name'
										name='host_name'
										onChange={(event) => setHostInput({ username: event.target.value })}
										value={hostInput?.username ?? ''}
										className=' [  ] [ w-3/4 p-5 ml-auto ]'
										placeholder='Enter name'
										required
									/>
								</label>
							</div>
						</li>
						<li>
							<div className='form_group [ flex ]'>
								<button type='submit' className=' [  ] [ w-3/4 bg-blue-600 ml-auto p-5 text-left ]'>
									Submit
								</button>
							</div>
						</li>
					</ol>
				</form>
			)}

			{host?.username?.length && (
				<div className='ready [ flex flex-col ] [  ]'>
					<span>Ready</span>
					<Link to='/chats' className=' [  ] [ w-3/4 ml-auto bg-blue-200 p-5 ]'>
						Go to Chat rooms
					</Link>
				</div>
			)}
		</div>
	);
}

export default Welcome;
