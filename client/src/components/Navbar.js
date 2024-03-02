import React, { useState } from 'react';
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'

function TopNav(props) {

   const [user, setUser] = useState("");
   const [loggedin, setLoggedin] = useState(false);

    axios({
        method: "GET",
        url: '/profile'
    })
    .then((response) => {
        const res = response.data
        if (res.session_email !== "") {
          setUser(res.session_email);
          setLoggedin(true)
        }
        console.log(user)
    })
    .catch ((err) => {
      console.log(err.response)
    })

  const brandname = 'evenue'

  return (
    <Navbar collapseOnSelect className='mx-auto px-5' expand="lg" sticky="top" style={{height: "50", fontFamily: 'Montserrat', fontWeight: 500, backgroundColor: '#ffbd59'}} >
        <Navbar.Brand href='/'>{brandname}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features"style={{fontSize: '22px'}}>Arts and Theater</Nav.Link>
            <Nav.Link href="#pricing" style={{fontSize: '22px'}}>Movies</Nav.Link> */}
          </Nav>
          <Nav>
          <NavDropdown title="Venues" style={{fontSize: '22px'}} id="collasible-nav-dropdown">
              <NavDropdown.Item href="#">Sports Venues</NavDropdown.Item>
              <NavDropdown.Item href="">
              Dance Studios
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="">
                More
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#activities" style={{fontSize: '22px'}}>Activities</Nav.Link>
            <Nav.Link href="#sports" style={{fontSize: '22px'}}>Sports</Nav.Link>
            {loggedin ? (<Nav.Link eventKey={2} style={{fontSize: '22px'}} href="/Profile">
              Profile
            </Nav.Link>) : (<Nav.Link eventKey={2} style={{fontSize: '22px'}} href="/Login">
              Login/Signup
            </Nav.Link>)}
            {/* <Nav.Link eventKey={2} style={{fontSize: '22px'}} href="/Login">
              Login/Signup
            </Nav.Link>  */}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default TopNav;