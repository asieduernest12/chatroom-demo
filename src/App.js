import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logo from './logo.png';


function App() {
  return (
    <div className='flex flex-col h-screen'>
      <div className="app__title bg-blue-500 text-white p-3 shadow-md">
        Secure Mesaging
      </div>
      <div className="app_content">

      </div>
    </div>
  );
}

export default App;
