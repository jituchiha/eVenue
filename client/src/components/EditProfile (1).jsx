import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { setProfile } from "../redux/user";
import { Link } from "react-router-dom";
//import themeStyles from "./themestyles";
import './styles/Profile.css';

function EditProfile()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsertypeChange = (event) => {
    setUsertype(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  
    return (
      <div className="profile-page">
        <div
          className={"mx-auto"}
          
        >
        <form onSubmit={handleSubmit} className="container-profile">
          
          
          <ul>
            <li className="list-group-item">
              <b>Username:</b> <input type="Username" />
            </li>
            <li className="list-group-item">
              <b>First Name:</b><input type="First Name"    /> 
            </li>
            <li className="list-group-item">
              <b>Last Name:</b> 
              <input type="Last Name"    />
            </li>
            <li className="list-group-item">
              <b>Email:</b> 
              <input type="email"    />
            </li>
            <li className="list-group-item">
              <b>Are You a Venue Owner?: </b>
              <input type="usertype"    />
              
            </li>
            <li className="list-group-item">
              <b>Age: </b>
              <input type="Age"    />
            
            </li>
            <li className="list-group-item">
              <b>Gender: </b>
              <input type="Gender"  />
            </li>         
            <li className="list-group-item">
              <b>Favorite Category of Events: </b>
              <input type="events"    />
            </li>
            
            <li className="list-group-item">
              <b>City: </b>
              <input type="City"    />
            </li>
            <li className="list-group-item">
              <b>State: </b>
              <input type="State"  />
            </li>
          </ul>
          <br />
          
          <div className="text-center">
          <button className="btn_profile ">
            Update           
          </button>
          </div>
        </form>
        </div>
      </div>
    );
};
//<Link to="edit-profile" className="btn btn-danger ">
//Update Details
//</Link>
export default EditProfile;
