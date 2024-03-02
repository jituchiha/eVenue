import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';
import TopNav from './Navbar';
import "./OrganizeEvent.css"; 

function OrganizeEvent(){

    const [eventName,setEventName]=useState("");
    const [description,setDescription]=useState("");
    const [address,setAddress]=useState("");
    const [location,setLocation]=useState("");
    const [date,setDate]=useState("");
    const [time,setTime]=useState("");
    const [capacity,setCapacity]=useState("");
    const [data,setData]=useState("");
    let session_id;


    function handleName(event){
        setEventName(event.target.value);
    }

    function handleDescription(event){
        setDescription(event.target.value);
    }

    function handleAddress(event){
        setAddress(event.target.value);
    }

    function handleLocation(event){
        setLocation(event.target.value);
    }

    function handleDate(event){
        setDate(event.target.value);
    }

    function handleTime(event){
        setTime(event.target.value);
    }

    function handleCapacity(event){
        setCapacity(event.target.value);
    }

    axios.get("/profile")
      .then(response => {
        session_id=response.data['_id']
    })
    .catch(error => {
      console.error(error);
    });
    
    function handleSubmit(){
        axios.post('/create_events', {
            "name":eventName,
            "description":description,
            "address":address,
            "location":location,
            "date":date,
            "time":time,
            "capacity":capacity,
            "organizer":"don't know",
            "_id":session_id
        })
         .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
            });
    }

    return(
        <div className="bgs" >
                <div style={{ alignSelf: 'center', alignContent:'center'}}>
                <TopNav />
                    <div>
                        <div class="input-container">
                            <h2>Name of the event:</h2>
                            <input type="text" value={eventName} onChange={(event) => handleName(event)}/>
                        </div>
                        <div class="input-container">
                            <h2>Description:</h2>
                            <textarea rows="4" cols="50" value={description} onChange={(event) => handleDescription(event)}></textarea>
                        </div>
                        <div class="input-container">
                            <h2>Address:</h2>
                            <input type="text" value={address} onChange={(event) => handleAddress(event)}/>
                        </div>
                        <div class="input-container">
                            <h2>Location:</h2>
                            <input type="text" value={location} onChange={(event) => handleLocation(event)}/>
                        </div>
                        <div class="input-container">
                            <h2>Date:</h2>
                            <input type="text" value={date} onChange={(event) => handleDate(event)}/>
                        </div>
                        <div class="input-container">
                            <h2>Time:</h2>
                            <input type="text" value={time} onChange={(event) => handleTime(event)}/>
                        </div>
                        <div class="input-container">
                            <h2>Capacity:</h2>
                            <input type="text" value={capacity} onChange={(event) => handleCapacity(event)}/>
                        </div>
                        <div class="input-container">
                            <h2>Organizer: don't know</h2>
                        </div>
                        <button onClick={handleSubmit}>Create Event</button>
                    </div>
                </div>
        </div>


    );

}

export default OrganizeEvent;