import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import "./UserProfile.css"; 
import axios from 'axios';
import TopNav from './Navbar'

function UserProfile () {

  const[data,setData]=useState("");
  const [isEditing, setIsEditing] = useState(false);

  const URL="http://localhost:3000/Profile";
  
  useEffect(()=>{
    axios.get("/profile_data")
      .then(response => {
        //console.log(response)
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      })},[URL]);
  
  

  console.log("->"+data);
  
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");

  const [age,setAge] = useState("");
  const [gender,setGender] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState("");

  function handleUpdate(){
    if(firstName=="")
      setFirstName(data["firstname"]);
    if(lastName=="")
      setLastName(data["lastname"]);
    if(age=="")
      setAge(data["age"]);
    if(gender="")
      setGender(data["gender"]);
    if(city="")
      setCity(data["city"]);
    if(state="")
      setState(data["state"]);
    
    
    axios.post('/update_user_details', {
      "first_name": firstName,
      "last_name": lastName,
      "age": age,
      "gender":gender,
      "city":city,
      "state":state
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setIsEditing(false);
    });
  }

  function updateFirstName(event){
    console.log(event.target.value);
    if(event.target.value!="")
      setFirstName(event.target.value);
  }

  function updateLastName(event){
    console.log(event.target.value);
    if(event.target.value!="")
      setLastName(event.target.value);
  }

  function updateAge(event){
    console.log(event.target.value);
    if(event.target.value!="")
      setAge(event.target.value);
  
   
  }

  function updateGender(event){
    console.log(event.target.value);
    if(event.target.value!="")
      setGender(event.target.value);
    
  }
    
  function updateCity(event){
    console.log(event.target.value);
    if(event.target.value!="")
      setCity(event.target.value);
    
    
  }
  
  function updateState(event){
    console.log(event.target.value);
    if(event.target.value!="")
      setState(event.target.value);
    
    
  }

  let age_set="";
  let gender_set="";
  let city_set="";
  let state_set="";

  if(data.hasOwnProperty("age")){
  
    age_set=data["age"];
  }

  if(data.hasOwnProperty("gender")){
    gender_set=data["gender"];
  }

  if(data.hasOwnProperty("city")){
    city_set=data["city"];
  }

  if(data.hasOwnProperty("state")){
    state_set=data["state"];
  }

  
  return (
      
    <div className="profile-container"> 
     <TopNav/>
      <div className="user-profile-container">
    <div>
      <div >
        <div className="user-picture">
          <img src="https://via.placeholder.com/150" alt="User" />
          <h2>First Name:</h2>
          {isEditing ? (
          <input type="text" id="firstNameEdit" name="firstNameEdit" value={firstName} onChange={updateFirstName} />
        ) :(
          <p>{data["firstname"]}</p>
        )}
          <h2>Last Name:</h2>
          {isEditing ? (
          <input type="text" id="lastName" name="lastName" value={lastName} disabled={!isEditing} onChange={updateLastName} />
        ) :(
          <p>{data["lastname"]}</p>
        )}
        </div>
      </div>
      
    </div>
    <div >
    <div >
        <div className="user-basic-data">
          <h2>Personal Details</h2>            
          <div >
            <div >
            <p>Email:<p>{data["email"]}</p> </p>
              <p>Age </p>
              {isEditing ? (
          <input type="text" id="age" name="age" value={age}  disabled={!isEditing} onChange={updateAge} />
        ) :(
          <p>{age_set}</p>
        )}
              <p>Gender</p>
              {isEditing ? (
          <input type="text" id="gender" name="gender" value={gender}  disabled={!isEditing} onChange={updateGender} />
        ) :(
          <p>{gender_set}</p>
        )}
              <p>City</p>
              {isEditing ? (
          <input type="text" id="city" name="city" value={city}  disabled={!isEditing} onChange={updateCity} />
        ) :(
          <p>{city_set}</p>
        )}
              <p>State</p>
              {isEditing ? (
          <input type="text" id="state" name="state" value={state}  disabled={!isEditing} onChange={updateState} />
        ) :(
          <p>{state_set}</p>
        )}
            </div>              
          </div>
        </div>
      </div> 
      <br></br>      
      <div >
        <div className="user-other-interests">
          <h2>Other Details</h2>
          <div>
            <div >
              <p>Favorite Category of Events</p>
              <p>Are you a Venue Owner?</p>
            </div>
          </div>
        </div>
      </div>
      <div >
        <div className="user-registered-events">
          <h2>Events Organized by you</h2>
          <h2>no events</h2>
          {/*
              try{
                  data["organized_events"].map((json) => (
                    <tr key={json._id}>
                      <td style={{color:'black'}}>{json.name}</td>
                      <td style={{color:'black'}}>{json.description}</td>
                      <td style={{color:'black'}}>{json.address}</td>
                      <td style={{color:'black'}}>{json.location}</td>
                      <td style={{color:'black'}}>{json.date}</td>
                      <td style={{color:'black'}}>{json.time}</td>
                      <td style={{color:'black'}}>{json.capacity}</td>
                      <td style={{color:'black'}}>{json.organizer}</td>
                    </tr>
                  ))
              }catch (error) {
                console.error("this is an error")
              }*/}
          <div>
            <div >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
    {isEditing ? (
          <button className='btn-uprofile' onClick={handleUpdate}>Save Update</button>
        ) :(
          <button className='btn-uprofile' onClick={() => setIsEditing(true)}>Update</button>
        )}
    </div>
  </div>
  
  </div>
);
  
  };

  export default UserProfile;