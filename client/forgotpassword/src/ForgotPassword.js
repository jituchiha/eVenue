import { Link } from 'react-router-dom';
import { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('/api/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
  
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

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = new URLSearchParams(window.location.search).get('token');
      const response = await fetch('/api/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='forgot-password'>
    <h2 style={{ fontFamily: 'Trattatello, fantasy', fontSize: '50px' }}>eVenue...</h2>
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

//export default ForgotPassword;
export default ResetPasswordForm;
