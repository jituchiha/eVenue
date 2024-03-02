import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from "axios";
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/Alert'


function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('1');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const radios = [
    { name: 'User', value: '1' },
    { name: 'Venue Owner', value: '2' },
  ];

  function handleCaptchaChange(value) {
    setCaptchaValue(value);
    console.log(captchaValue)
  }
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsertypeChange = (event) => {
    setUsertype(event.target.name);
  };

  const handleGoogleLogin = () => {
    const redirectUri = `http://localhost:3000`;
    const authEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = '487637006084-qn5i9lvc40pebgfmg78km72pjoqd9cmd.apps.googleusercontent.com';
    const scope = 'https://www.googleapis.com/auth/userinfo.email';
    const url = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    window.location.href = url;
  };
  
  function handleLogin(event) {
    event.preventDefault();
    axios({
      method : "POST",
      url: '/login',
      data: {
        email: email,
        password: password,
        usertype: usertype
      }
    })
    .then((response) => {
      const res = response.data
      setMessage(res.message)
      setShow(true)
      if (res.message === "Login Succesful") {
        setType("success")
      }
      if (res.message === "Wrong Password. Try Again." || res.message === "User not found") {
        setType("warning")
      }
      
      console.log(res.message)
      console.log("message: " + message)
      console.log("type: " + type)
    })

    .catch((error) => {
      console.log(error.response)
    })
  }
  
  return (
    <Card> 
      {show && type && message && 
      <div>
        <Alert variant={type} onClose={() => {setShow(false); setType("")}} dismissible>
          {message}
        </Alert>
      </div>
      }    
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
          <Nav.Link style={{color: 'black'}} href="#first">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{color: 'black'}} href="/Register">SignUp</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleLogin}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name='email' placeholder="Enter email" value={email} onChange={handleEmailChange} required />
      <Form.Text className="text-muted">
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name='password' placeholder="Password" value={password} onChange={handlePasswordChange} required />
    </Form.Group>
    <ButtonGroup>
    {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"

            variant={idx % 2 ? 'outline-dark' : 'outline-dark'}
            name="radio"
            value={radio.value}
            checked={usertype === radio.value}
            onChange={(event) => setUsertype(event.target.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}

      </ButtonGroup>
      <ReCAPTCHA onChange={handleCaptchaChange} sitekey="6LcyQo8kAAAAAI99slVWg8WGEjGFE7QneFvb-wew"></ReCAPTCHA>
      <Button style={{backgroundColor: '#ffbd59', color: 'black'}} type='submit'>Login</Button>
    
      <Button variant='outline-primary' onClick={handleGoogleLogin}>Login with Google</Button>
      <Row>
        <Col>
        <p style={{fontSize: '18px'}}><Link to='/ForgotPassword'>Forgot Password</Link> </p>

        </Col>
          <Col>
          <p style={{fontSize: '18px'}}><Link to='/'> Home </Link></p>
          </Col>
      </Row>

    </Form>
        </Card.Body>
      </Card>
    );
  }
  
  export default LoginPage;