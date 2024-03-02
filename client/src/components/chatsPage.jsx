import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { PrettyChatWindow } from "react-chat-engine-pretty";
import axios from "axios";

/*
const ChatsPage = (props) => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="f9e9b244-4209-448f-b36d-a1725d2d01eb"
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};
*/
function ChatsPage(){

  const[data,setData]=useState("");
  const URL="http://localhost:8080/chat"

  useEffect(()=>{
    axios.get('/chat_authentication')
    .then(response => {
      //console.log(response)
      setData(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  },[URL]);

  console.log("->"+data["email"])
  console.log("->"+data["password"])

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="f9e9b244-4209-448f-b36d-a1725d2d01eb"
        username={data["email"]} // adam
        secret={data["password"]} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
}

export default ChatsPage;