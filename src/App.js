import React, { useContext } from 'react';
import {
  Route, Routes, Navigate, NavLink,
} from 'react-router-dom';
import About from './components/About';
import Chats from './components/Chats';

// import logo from './logo.png';
import Welcome from './components/Welcome';
import { MessengerContext } from './MessengerContextProvider';
import ChatDetails from './components/ChatDetails';

function App() {
  const { store, setReceiver, updateStore } = useContext(MessengerContext);
  // setReceiver({ name: "Alice" });
  // const [sender, setSender] = useState();

  // updateStore("messages", []);
  // const [messages, setMessages] = useState([]);

  // const setUpChat = (receiver) => {
  // 	console.log("app.js setupChat");
  // 	setReceiver(receiver);
  // };

  // const addNewMessage = (msg) => {
  // 	// setMessages([...messages, msg]);
  // 	updateStore("messages", [...store?.messages, msg]);
  // };

  // updateStore("messages", []);
  // useEffect(() => {
  // 	if (store?.messages?.length >= 0) {
  // 		return;
  // 	}
  // }, [store, updateStore]);

  const contacts = [
    {
      url: 'https://camerajabber.com/wp-content/uploads/2021/10/001_17-1410x793.jpg',
      name: 'dji ronin',
    },
    {
      name: 'larry page',
      url: 'https://media.gettyimages.com/photos/google-cofounder-and-ceo-larry-page-speaks-during-a-news-conference-picture-id144948917?s=2048x2048',
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-500 text-white shadow-md flex-col">
        <div className="title__bar flex justify-end">
          <div className="back__container w-5">
            <button className="rounded-full ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <h2 className="app__title p-3 w-full">Secure Mesaging</h2>
        </div>
        <nav className="bg-blue-400 p-3 pl-8">
          <ul className="flex gap-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/chats">Chats</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            {store?.messages.length}
          </ul>
        </nav>
      </div>
      <div className="app_content h-full">
        <Routes>
          <Route path="/home" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/chats" element={<Chats contact_list={contacts} />}>
            <Route path=":name" element={<ChatDetails />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
