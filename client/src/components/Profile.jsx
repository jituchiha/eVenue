import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { setProfile } from "../redux/user";
import { Link, useParams } from "react-router-dom";
//import themeStyles from "./themestyles";
import './Profile.css';
import axios from 'axios';

function Profile()  {

  const[data,setData]=useState("");
  const {id}=useParams();

  axios.get('/profile'+id)
  .then(response => {
    setData(response.data);
  })
  .catch(error => {
    console.error(error);
  });
  
    return (
      <div className="profile-page">
        <div
          className={"mx-auto"}
          
        >
        <div className="container">
          <h1 className="text-center">Profile Details</h1>
          <br />
          <br />
          <ul>
            <li className="list-group-item">
              <b>First Name:<p>{data["firstname"]}</p></b> 
            </li>
            <li className="list-group-item">
              <b>Last Name:<p>{data["lastname"]}</p></b> 
            </li>
            <li className="list-group-item">
              <b>Email:<p>{data["email"]}</p></b> 
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
          <button className="btn btn-danger ">
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
