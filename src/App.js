import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Contacts from './components/Contacts';
import About from './components/About';

// import logo from './logo.png';
import Chats from './components/Chats';


function App() {

  const [receiver, setReceiver] = useState({ name: 'Bob' })
  const [sender, setSender] = useState({ name: 'Alice' })
  const [messages, setMessages] = useState([])


  const setUpChat = (receiver) => {
    console.log('app.js setupChat')
    setReceiver(receiver)

  }

  const addNewMessage = msg => {
    setMessages([...messages, msg])
  }

  const contacts = [
    {
      url: 'https://camerajabber.com/wp-content/uploads/2021/10/001_17-1410x793.jpg',
      name: 'dji ronin'
    },
    {
      name: 'larry page',
      url: 'https://media.gettyimages.com/photos/google-cofounder-and-ceo-larry-page-speaks-during-a-news-conference-picture-id144948917?s=2048x2048',
    }
  ]

  return (
    <div className='flex flex-col h-screen'>
      <Router>

        <div className="bg-blue-500 text-white shadow-md flex-col">
          <div className="title__bar flex justify-end">
            <div className="back__container w-5">
              <button className='rounded-full '><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg></button>

            </div>
            <h2 className="app__title p-3 w-full">
              Secure Mesaging
            </h2>

          </div>
          <nav className='bg-blue-400 p-3 pl-8'>
            <ul className='flex gap-2'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/contacts' >Contacts</Link></li>
              <li><Link to='/about' >About</Link></li>
              {messages.length}
            </ul>
          </nav>
        </div>
        <div className="app_content h-full">
          <Switch>
            <Route path='/contacts'>
              <Contacts contact_list={contacts} setUpChat={setUpChat} />
            </Route>
            <Route path='/about' component={About} />
            <Route path='/chat'>
              <Chats {...{ receiver, sender, messages: messages.filter(msg => (msg.sender.name === sender.name && msg.receiver.name === receiver.name) || (msg.sender.name === receiver.name && msg.receiver.name === sender.name)) }} sendMessage={addNewMessage}></Chats>
            </Route>
            <Route path="/">
              <div> Welcome home</div>
              <label htmlFor="">
                Sender name <input type="text" onChange={(event) => setSender({ name: event.target.value })} value={sender.name} />
              </label>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
