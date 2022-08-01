import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Chats from './components/Chats';

// import logo from './logo.png';
import ChatDetails from './components/ChatDetails';
import Welcome from './components/Welcome';
import Header from './Header';

function App() {
	
	return (
		<div className='flex flex-col h-screen'>
			{Header()}

			<div className='app_content [  ] [ h-[85%] overflow-hidden bg-orange-200 w-full ]'>
				<Routes>
					<Route path='/home' element={<Welcome />} />
					<Route path='/about' element={<About />} />
					<Route path='/chats' element={<Chats />}>
						<Route path='room/:roomID' element={<ChatDetails />} />
					</Route>
					<Route path='*' element={<Navigate to='/home' />} />
				</Routes>
			</div>
			<div className='footer [  ] [  bg-blue-400 p-3 ]'>MudonlineChatRoom &rightarrow;</div>
		</div>
	);
}

export default App;
