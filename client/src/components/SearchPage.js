import "./SearchPage.css";
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Table from 'react-bootstrap/Table'
import TopNav from "./Navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
//import Sidebar from "./Sidebar";

let baseURL = "http://localhost:8080/data?";
let reactURL = "?";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nameFilter, setnameFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [capacityFilter, setcapacityFilter] = useState("");
  const navigate=useNavigate();
  const [modalShow, setModalShow] = React.useState(false);

  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  
  const [data, setData] = useState(null);
  const [venues, setVenues] = useState([])
  const [date, setDate] = useState();
  const [start_time, setStartTime] = useState();
  const [end_time, setEndTime] = useState();
  const [user, setUser] = useState();
  const [booked, setBook] = useState();

  function checkAndBook() {
    const name = venues.name
    const location = venues.location
    const owner = venues.owner
    const date1 = date
    const time1 = start_time
    const booked_by = user

    const date12 = new Date(`${date1}T${time1}`);

    const formattedTime = date12.toTimeString().slice(0, 8);

    setStartTime(formattedTime)

    const endtime = new Date(date12.setHours(date12.getHours() + 1));
    const formattedEndTime = endtime.toTimeString().slice(0,8);

    setEndTime(formattedEndTime)

    axios({
      method : "POST",
      url: '/book_venue',
      data: {
        name: name,
        location: location,
        date: date,
        start_time: formattedTime,
        end_time: formattedEndTime,
        booked_by: booked_by,
        owner: owner
      }
    })
    .then((response) => {
      const res = response.data
      console.log(res.message)
      setMessage(res.message)
      setShow(true)
      if (res.message === "Not available. Try a different slot." || res.message === "Already booked. Check mail.") {
        setType("warning")
        setTimeout(() => setModalShow(false), 3000)
      }
      if (res.message === "Booking successful") {
        setType("success")
      }
    })
    .catch((error) => {
      console.log(error.response)
    })
  }

  function handleBook(id) {
    console.log(id)

    if (!data) {
      console.log("No data! :( ")
    }
    
    else {
      data.map((doc) => {
        if (doc._id === id) {
          setVenues(doc)
        }
      })
    }
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>  
          <Modal.Title id="contained-modal-title-vcenter">
            Check Availabilities
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {show && type && message && 
            <div>
              <Alert variant={type} onClose={() => {setShow(false); setType("")}} dismissible>
                {message}
              </Alert>
            </div>
          }  
          <Form>
          <Form.Group className="mb-3">
            <p>The default time for the venue reservation is one hour.</p>
          <Form.Label>Date</Form.Label>
            <Form.Control type="date" name='date' placeholder="Date" value={date} onChange={(e) => {e.preventDefault(); setDate(e.target.value); return false}} required />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>From</Form.Label>
            <Form.Control type="time" min="09:00" max="18:00" step={3600} name='time' placeholder="Start Time" value={start_time} onChange={(e) => {e.preventDefault(); setStartTime(e.target.value); return false}} required />
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: '#ffbd59', color: 'black'}} onClick={checkAndBook}>Book</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function setnameFilters(value){
    if (baseURL.indexOf("name=") !== -1) {
      const st="name"+"="+value

      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"name="}[^&]*`),
        st
      );

      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"name="}[^&]*`),
        st
      );

      setnameFilter(value);
      baseURL=updatedBaseURL
      reactURL=updatedReactURL
      

    } else {
      setnameFilter(value);

      // backend URL
      baseURL=baseURL+"&"+"name"+"="+value;

      // frontend URL
      reactURL=reactURL+"&"+"name"+"="+value;
    }

    navigate(reactURL)
  }

  function setLocationFilters(value){

    if (baseURL.indexOf("location=") !== -1) {
      const st="location"+"="+value

      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"location="}[^&]*`),
        st
      );

      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"location="}[^&]*`),
        st
        );

      setLocationFilter(value);
      baseURL=updatedBaseURL
      reactURL=updatedReactURL

    } else {
      setLocationFilter(value);
      baseURL=baseURL+"&"+"location"+"="+value;
      reactURL=reactURL+"&"+"location"+"="+value;
    }

    navigate(reactURL)
  }

  function setcapacityFilters(value){

    if (baseURL.indexOf("capacity=") !== -1) {
      const st="capacity"+"="+value

      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"capacity="}[^&]*`),
        st
      );

      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"capacity="}[^&]*`),
        st
        );

      setcapacityFilter(value);
      baseURL=updatedBaseURL
      reactURL=updatedReactURL

    } else {
      setcapacityFilter(value);
      baseURL=baseURL+"&"+"capacity"+"="+value;
      reactURL=reactURL+"&"+"capacity"+"="+value;
    }

    navigate(reactURL)

  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  function setSearchTerms(value){

    if (baseURL.indexOf("search_query=") !== -1) {
        const st="search_query"+"="+value

        // update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        // update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        baseURL=updatedBaseURL
        reactURL=updatedReactURL

        setSearchTerm(value);
      } else {
        baseURL=baseURL+"&"+"search_query"+"="+value;
        reactURL=reactURL+"&"+"search_query"+"="+value;
        setSearchTerm(value);
      }

      navigate(reactURL)
      
  }

  useEffect(() => {
    // try {
    //   const [response1, response2, response3] = Promise.all([
    //     axios.get('/profile'),
    //     axios.get('/getbooked'),
    //     axios.get(baseURL)
    //   ]);

    //   setUser(response1.data.session_email);
    //   setBook(response2.data);
    //   setData(response3.data)
    // } catch (error) {
    //   console.log(error);
    // }


    axios.get('/profile')
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error("Server responded with an error status: " + res.status);
      }
    })
    .then(data => {
      setUser(data.session_email);
    })
    .catch((error) => {
      console.log(error.response)
    });

    axios.get('/getbooked')
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        throw new Error("Server responded with an error status: " + res.status);
      }
    })
    .then(data => {
      setBook(data) 
    })
    .catch((error) => {
      console.log(error.response)
    });

    axios.get(baseURL)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.data;
        } else {
          throw new Error("Server responded with an error status: " + res.status);
        }
      })
      .then(data => {
        setData(data);
      })
      .catch(handleError);
  }, [nameFilter, locationFilter, capacityFilter,searchTerm],);

  function handleError(error) {
    console.error("Axios error:", error);
    // handle the error here, e.g. show an error message to the user
  }

  if (!data) return <div>Loading...</div>;

  return (
  <div className="bag">
      <TopNav/>
      
    <div>
      <Row>
      <div className="searchbox">        
        <input 
          //style={{backgroundColor: 'white', width: '100%', height: '50px'}}
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(event) => setSearchTerms(event.target.value)}
        />
        <div>
          <button onClick={toggleSidebar} className='btn-search' >Filters</button>
        </div>        
      </div>  
      </Row>
      <Row>
      <Col className="col-md-2" style={{color: 'black'}}>
      <div className="sidebar-container">
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        
          <div class="checkbox-container" style={{ display: 'flex', flexDirection: 'column' }}>
            <label class="checkbox-label">
              <input type="checkbox" value="tennis" onChange={(event) => setnameFilters(event.target.checked ? 'tennis' : '')} />
                <span class="checkmark">Tennis</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="badminton" onChange={(event) => setnameFilters(event.target.checked ? 'badminton' : '')} />
                  <span class="checkmark">Badminton</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="football" onChange={(event) => setnameFilters(event.target.checked ? 'football' : '')} />
                <span class="checkmark">Football</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="basketball" onChange={(event) => setnameFilters(event.target.checked ? 'basketball' : '')} />
                <span class="checkmark">Basketball </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="table tennis" onChange={(event) => setnameFilters(event.target.checked ? 'table tennis' : '')} />
                <span class="checkmark">Table Tennis </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="volleyball" onChange={(event) => setnameFilters(event.target.checked ? 'volleyball' : '')} />
                <span class="checkmark">Volleyball </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="squash" onChange={(event) => setnameFilters(event.target.checked ? 'squash' : '')} />
                <span class="checkmark">Squash</span> 
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label class="checkbox-label">
              <input type="checkbox" value="srsc" onChange={(event) => setLocationFilters(event.target.checked ? 'srsc' : '')} />
              <span class="checkmark">SRSC </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="north" onChange={(event) => setLocationFilters(event.target.checked ? 'north' : '')} />
              <span class="checkmark">North </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="south" onChange={(event) => setLocationFilters(event.target.checked ? 'south' : '')} />
              <span class="checkmark">South </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="east" onChange={(event) => setLocationFilters(event.target.checked ? 'east' : '')} />
              <span class="checkmark">East </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="west" onChange={(event) => setLocationFilters(event.target.checked ? 'west' : '')} />
              <span class="checkmark">West </span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="downtown" onChange={(event) => setLocationFilters(event.target.checked ? 'downtown' : '')} />
              <span class="checkmark">Downtown </span>
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label class="checkbox-label">
              <input type="checkbox" value="4" onChange={(event) => setcapacityFilters(event.target.checked ? '4' : '')} />
              <span class="checkmark">4</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="6" onChange={(event) => setcapacityFilters(event.target.checked ? '6' : '')} />
              <span class="checkmark">6</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="7" onChange={(event) => setcapacityFilters(event.target.checked ? '7' : '')} />
              <span class="checkmark">7</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="8" onChange={(event) => setcapacityFilters(event.target.checked ? '8' : '')} />
              <span class="checkmark">8</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="10" onChange={(event) => setcapacityFilters(event.target.checked ? '10' : '')} />
              <span class="checkmark">10</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="30" onChange={(event) => setcapacityFilters(event.target.checked ? '30' : '')} />
              <span class="checkmark">30</span>
            </label>
          </div>
        
        </div>        
      </div>
      </Col>
    <Col classname="col-md-8">
    <div className="filter-container">
      <h2 style={{color:'white'}}>Results</h2>
        <Table striped="columns">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((json) => (
              <tr key={json._id}>
                <td style={{color:'black'}}>{json.name}</td>
                <td style={{color:'black'}}>{json.location}</td>
                <td style={{color:'black'}}>{json.capacity}</td>
                <td >
            <button style={{backgroundColor: '#ffbd59', color: 'black'}} onClick={() => {handleBook(json._id); setModalShow(true)}}>
              book
              </button>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />            
            </td>
              </tr>
              ))) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </tbody>      
        </Table>
    </div>
    </Col>
    <Col className="col-md-2"></Col>
    </Row>
    </div>
  </div>
  );
}

export default App;