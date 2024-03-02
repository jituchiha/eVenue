import { useState } from 'react';
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

function Register() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  //const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //const [registerError,setRegisterError] = useState(null);
  const [phone, setPhoneNumber] = useState('');
  const [usertype, setUsertype] = useState('1');
  const [captchaValue, setCaptchaValue] = useState(null);
  const organize=[]

  const radios = [
    { name: 'User', value: '1' },
    { name: 'Venue Owner', value: '2' },
  ];

  function handleCaptchaChange(value) {
    setCaptchaValue(value);
    console.log(captchaValue)
  }
  
  function handleRegister(event) {
    event.preventDefault();
    console.log("OKAY IM HERE")
    axios({
      method : "POST",
      url: '/register',
      data: {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        password: password,
        usertype: usertype,
        organized_events:organize
      }
    })
    .then((response) => {
      const res = response.data
      console.log(res.message)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }

return (
  <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
            <Nav.Link style={{color: 'black'}} href="/Login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={{color: 'black'}} href="/Register">SignUp</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="firstname">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="firstname" name='firstname' placeholder="Enter first name" value={firstname} onChange={(event) => setFirstname(event.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastname">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="lastname" name='lastname' placeholder="Enter last name" value={lastname} onChange={(event) => setLastname(event.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(event) => setConfirmPassword(event.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="tel" name='phone' value={phone} placeholder="Phone" onChange={(event) => setPhoneNumber(event.target.value)} required />
      </Form.Group>
      <ButtonGroup>
        
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? '#ffbd59' : '#ffbd59'}
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
      <Button style={{backgroundColor: '#ffbd59', color: 'black'}} type='submit'>Register</Button>
      <p><Link to='/'>Home</Link> </p>

    </Form>
        </Card.Body>
      </Card>
    );
  }
  
  export default Register;