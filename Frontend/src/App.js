import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
//import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';


import Home from './js/Home.js';
import SignIn from './js/SignIn.js';
import SignUp from './js/SignUp.js';
import Landing from './js/Landing.js';
import Contact from './js/Contact.js';
import Profile from './js/Profile.js';
import Guest from './js/Guest.js';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/"


const App = () => {
 return (
    <>
	  <HashRouter>

       <Routes>

	      <Route path="/forgetNot" element={<Landing />} />
		  <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
	<Route path="/contact" element={<Contact />} />
	<Route path="/profile" element={<Profile />} />
	<Route path="/guest" element={<Guest />} />
       </Routes>
	     </HashRouter>


    </>
 );
};

export default App;


