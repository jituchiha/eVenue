import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import './ForgotPassword.css';
import TopNav from './Navbar';
import axios from 'axios';

function ResetPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {id} = useParams();
  
    function handleSubmit(){
        axios.post("/resetpassword",{"_id":id,"password":password})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    }
  
    return (
      <div>
         <form onSubmit={handleSubmit} className="container">
        <label>
          New Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} placeholder="Enter New Password" required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Re-enter Same Password" required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form> 
      </div>
    );
  }
  
  export default ResetPasswordForm;
  