import React, { useContext } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Chats from './components/Chats';

// import logo from './logo.png';
import ChatDetails from './components/ChatDetails';
import Welcome from './components/Welcome';
import { MessengerContext } from './MessengerContextProvider';

function App() {
	const { contextState } = /** @type {MessengerContextValue} */ (useContext(/** @type {any} */ (MessengerContext)));
	


	return (
		<div className='flex flex-col h-screen'>
			<div className='bg-blue-500 text-white shadow-md flex-col'>
				<div className='title__bar flex justify-end'>
					<div className='back__container w-5'>
						<button className='rounded-full bg-orange' type='button'>
							<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
					</div>
					<h2 className='app__title p-3 w-full'>Secure Mesaging</h2>
				</div>
				<nav className='bg-blue-400 p-3 pl-8'>
					<ul className='flex gap-2'>
						<li>
							<NavLink to='/'>Home</NavLink>
						</li>
						<li>
							<NavLink to='/chats'>Chats</NavLink>
						</li>
						<li>
							<NavLink to='/about'>About</NavLink>
						</li>
						
					</ul>
				</nav>
			</div>
			<div className='app_content h-full'>
				<Routes>
					<Route path='/home' element={<Welcome />} />
					<Route path='/about' element={<About />} />
					<Route path='/chats' element={<Chats/>}>
						<Route path='room/:room_id' element={<ChatDetails />} />
					</Route>
					<Route path='*' element={<Navigate to='/home' />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
