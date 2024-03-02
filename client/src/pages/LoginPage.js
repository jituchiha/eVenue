import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);

  function handleCaptchaChange(value) {
    setCaptchaValue(value);
  }
  
  
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
    if (captchaValue) {
        // submit login form
      } else {
        alert('Please complete the CAPTCHA');
      }
    console.log(`Email: ${email}, Password: ${password}, User Type: ${usertype}`);
  };

  return (
    
    <div className="login-page">
      <div className="left">
      <h1 style={{ fontFamily: 'Trattatello, fantasy', fontSize: '50px' }}>eVenue...</h1>
        <h2>Welcome to our website!!</h2>
        <p>One-stop-solution for event bookers and the venue owners!!</p>
        <p>Helps connect the venue owners with the customers!!</p>
        <p>We make it easy to find, book and list your venue.</p>
        <p>With smooth connections between a participant and organizer</p>
        <p>We make the entire process hassle free for you.</p>
        
        <button>Register</button>
        
      </div>
      <form onSubmit={handleSubmit} className="container">
      <h2>Login</h2>
        <div >
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange}  placeholder="Enter Email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password" required />
        </div>
        
        <div>
            <label>User Type</label>
             <input type="text" value={usertype} onChange={handleUsertypeChange} placeholder="User/Venue Owner" required />
        </div>
        <ReCAPTCHA
          sitekey="YOUR_SITE_KEY"
          onChange={handleCaptchaChange}
        />
        
        <button type="submit">Login</button>
        <p><a href='/ForgotPassword'>Forgot Password</a> </p>
      </form>
    </div>
  );
}

export default LoginPage;