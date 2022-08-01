
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MessengerContext } from './MessengerContextProvider';

export default function Header() {
	const { contextState: {host} } = /** @type {MessengerContextValue} */ (useContext(/** @type {any} */ (MessengerContext)));

	const setNavClassName = ({ isActive }) => `nav_link_item nav_home p-3 ${isActive && 'bg-blue-500'}`;

	return (
		<div className='bg-blue-500 text-white shadow-md flex-col [ h-auto w-full ]'>
			<div className='title__bar flex justify-end p-3 pl-8'>
				<Link to='/' replace className='back_btn [ flex ] [ rounded-full hover:bg-green-500 ]' type='button'>
					<svg xmlns='http://www.w3.org/2000/svg' className='[ h-5 w-5 m-auto ]' viewBox='0 0 20 20' fill='currentColor'>
						<path
							fillRule='evenodd'
							d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
							clipRule='evenodd'
						/>
					</svg>
				</Link>
				{/* <div className='back__container w-5'>
    </div> */}
				<h2 className='app__title p-3 w-full'>Secure Mesaging</h2>

				<span className='navigation_username [  ] [ ml-auto ]'>{host?.username ?? 'No user'}</span>
			</div>
			<nav className='bg-blue-400 pl-8'>
				<ul className='flex gap-2 p-3 h-full'>
					<li>
						<NavLink className={setNavClassName} to='/home'>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink className={setNavClassName} to='/chats'>
							Chats
						</NavLink>
					</li>
					<li>
						<NavLink className={setNavClassName} to='/about'>
							About
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
}
