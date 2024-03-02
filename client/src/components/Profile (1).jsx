import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { setProfile } from "../redux/user";
import { Link } from "react-router-dom";
//import themeStyles from "./themestyles";
import './styles/Profile.css';
//import TopNav from './Navbar';

function Profile()  {
  
    return (
      <div className="profile-page">
        <div
          className={"mx-auto"}
          
        >
        <div className="container-profile">
          <h1 className="text-center">Profile Details</h1>
          <br />
          
          <ul>
            <li className="list-group-item">
              <b>Username:</b> 
            </li>
            <li className="list-group-item">
              <b>First Name:</b> 
            </li>
            <li className="list-group-item">
              <b>Last Name:</b> 
            </li>
            <li className="list-group-item">
              <b>Email:</b> 
            </li>
            <li className="list-group-item">
              <b>Are You a Venue Owner?: </b>
              
            </li>
            <li className="list-group-item">
              <b>Age: </b>
              
            </li>
            <li className="list-group-item">
              <b>Gender: </b>
              
            </li>
            
            <li className="list-group-item">
              <b>Favorite Category of Events: </b>
              
            </li>
            
            <li className="list-group-item">
              <b>City: </b>
              
            </li>
            <li className="list-group-item">
              <b>State: </b>
              
            </li>
          </ul>
          <br />
          <br />
          <div className="text-center">
          <button className="btn_profile">
          Edit 
          
          </button>
          </div>
        </div>
        </div>
      </div>
    );
};
//<Link to="edit-profile" className="btn btn-danger ">
//Update Details
//</Link>
export default Profile;
