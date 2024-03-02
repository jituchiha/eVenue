import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import Home from './components/Home'
import Navbar from './components/Navbar'
import SearchPage from './components/SearchPage'
//import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import {useForm} from "react-hook-form";
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import UserProfile from './components/UserProfile';
import Logout from './components/Logout';
import ResetPassword from './components/resetPassword';
import Organize from './components/OrganizeEvent';
import ChatsPage from "./components/chatsPage";

function App() {
  // const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // const { trial, setTrial} = useState('')
  // const [serverResponse,setServerResponse]=useState('')
  // const [data, setData] = useState(null)

  // function submitForm() {
  //   axios({
  //     method: "GET",
  //     url: '/profile',
  //   })
  //   .then((response) => {
  //     const res = response.data
  //     setData(({
  //       profile_name: res.name,
  //       about: res.about
  //     }))
  //   })
  //   .catch((err) => {
  //     if (err.response) {
  //       console.log(err.response)
  //     }
  //   })
  // }

  return (
  //   <div className='App'>
  //   <p>To get your profile details: </p><button onClick={submitForm}>Click me</button>
  //       {data && <div>
  //             <p>Profile name: {data.profile_name}</p>
  //             <p>About me: {data.about}</p>
  //           </div>
  //       }
  //   </div>


    <div className="App">
      <header className="App-header">
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/Login' element= {<LoginPage/>} />
              <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
              <Route path ='/Register' element={<Register/>}/>
              <Route path ='/Search' element={<SearchPage/>}/>
              <Route path = '/Profile' element={<UserProfile/>} />
              <Route path = '/Logout' element={<Logout/>} />
              <Route path ='/resetpassword/:id/:token' element={<ResetPassword/>} />
              <Route path = '/organize_event' element={<Organize/>} />
              <Route path = '/chat' element={<ChatsPage/>} />
              {/* <Route path = '/Activites' element={<Activities />} /> */}
              {/* <Route path = 'Sports' elemetn = {<SportsPage/>} /> */}
          </Routes>
        </BrowserRouter>
      </header>


    </div>
  );
}

export default App;
