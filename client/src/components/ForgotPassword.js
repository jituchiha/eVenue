import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import './ForgotPassword.css';
import TopNav from './Navbar';
import axios from 'axios';


function ForgotPassword() {
    const [email, setEmail] = useState('');

    function handleSubmit(){
        axios.post('/forgot password',{"email":email})
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.error(error);
              });
    
    }
    
    return (
      <div className='forgot-password'>
      <h2 style={{ fontFamily: 'Trattatello, fantasy', fontSize: '50px' }}>eVenue...</h2>
      <form onSubmit={handleSubmit} className="container">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value) } placeholder="Enter Email" required
          />
        </label>
        <br></br>
        <button type="submit">Reset Password</button>
      </form>
      </div>
    );
}
export default ForgotPassword;


  