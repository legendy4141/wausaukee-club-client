  import React, { useState, useEffect } from 'react';
  import './ReservationForm.css';
  import Form from 'react-bootstrap/Form';
  import Col from 'react-bootstrap/Col';
  import Button from 'react-bootstrap/Button';
  import { motion } from 'framer-motion';
  import axios from 'axios';

  function ReservationForm() {
    const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalFirstMeal, setArrivalFirstMeal] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureLastMeal, setDepartureLastMeal] = useState('');
  const [airportPickup, setAirportPickup] = useState(false);
  const [housekeeping, setHousekeeping] = useState(false);
  const [firewood, setFirewood] = useState(false);
  const [golfCartRental, setGolfCartRental] = useState(false);
  const [validated, setValidated] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [names, setNames] = useState([{ firstName: '', lastName: '', isAdult: true, isFamily: true }]);
  const [maxGuests] = useState(7);
  const [flightDescription, setFlightDescription] = useState('');

    const firstMealList = [
      { id: 1, name: 'Breakfast' },
      { id: 2, name: 'Lunch' },
      { id: 3, name: 'Dinner' },
    ];

    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(
            'https://api.wausaukeeclub.org/api/jobs/get_job_list', 
            {},
            {
              headers: {
                'Authorization': `Bearer ${token}`  // Add token in the Authorization header
              }
            }
          );

          const jobsList = response.data.map(item => ({
            id: item.job_id,
            description: item.job_description
          }));
          
          setJobs(jobsList);
        } catch(err) {
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError('An unexpected error occurred. Please try again later.');
          }
        }
      };
      
      const clientIdFromStorage = localStorage.getItem('customerId');
      if (clientIdFromStorage) {
        setClientId(clientIdFromStorage); // Set the clientId state with the retrieved value
        fetchJobs();
      }

    }, []);

    const handleSubmit = async (event) => {
      const form = event.currentTarget;
    
      // Prevent the default form submission behavior
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        event.stopPropagation();
    
        // Prepare the data to send to the backend
        const reservationData = {
          arrivalDate,
          arrivalFirstMeal,
          departureDate,
          departureLastMeal,
          airportPickup,
          flightDescription,
          housekeeping,
          firewood,
          golfCartRental,
          selectedJob,
          clientId,
          names,
        };
    
        try {
          const token = localStorage.getItem('token'); // Get the token from localStorage
          const response = await axios.post(
            'https://api.wausaukeeclub.org/api/reservations', // API endpoint to send the data
            reservationData,
            {
              headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the header
                'Content-Type': 'application/json',
              }
            }
          );
    
          // Handle success response (you can show a success modal or message)
          const results = document.getElementById('results');
          results.innerHTML = `
            <div class="modal" id="modal">
              <div class="modal-dialog d-flex align-items-center">
                <div class="modal-content rounded-0">
                  <div class="modal-header">
                    <h5 class="modal-title">Thank You!</h5>
                  </div>
                  <div class="modal-body">
                    <p>Your Arrival Date: ${arrivalDate}</p>
                    <p>Your Arrival First Meal: ${arrivalFirstMeal}</p>
                    <p>Your Departure Date: ${departureDate}</p>
                    <p>Your Departure Last Meal: ${departureLastMeal}</p>
                    <p>Airport Pickup: ${airportPickup ? "Yes" : "No"}</p>
                    <p>Flight Description: ${flightDescription || "N/A"}</p>
                    <p>Housekeeping: ${housekeeping ? "Yes" : "No"}</p>
                    <p>Firewood: ${firewood ? "Yes" : "No"}</p>
                    <p>Golf Cart Rental: ${golfCartRental ? "Yes" : "No"}</p>
                    <p>Selected job: ${selectedJob}</p>
                    <p>Client ID: ${clientId}</p>
                    <p>Names: ${names.map(name => `${name.firstName} ${name.lastName} (Adult: ${name.isAdult ? 'Yes' : 'No'}, Family: ${name.isFamily ? 'Yes' : 'No'})`).join(', ')}</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-lg rounded-0" data-bs-dismiss="modal" onClick="window.location.reload()">Close</button>
                  </div>
                </div>
              </div>
            </div>
          `;
          document.getElementById('contact-page').classList.add('scrolling-stop');
          document.getElementById('footer').style.display = 'none';
        } catch (err) {
          // Handle error (show error message or modal)
          const results = document.getElementById('results');
          results.innerHTML = `
            <div class="modal" id="modal">
              <div class="modal-dialog d-flex align-items-center">
                <div class="modal-content rounded-0">
                  <div class="modal-header">
                    <h5 class="modal-title">Error</h5>
                  </div>
                  <div class="modal-body">
                    <p>Something went wrong. Please try again later.</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-lg rounded-0" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          `;
          document.getElementById('contact-page').classList.add('scrolling-stop');
          document.getElementById('footer').style.display = 'none';
        }
      }
    
      setValidated(true); // Set the form validated flag
    };
    
    const handleAddName = () => {
      if (names.length < maxGuests + 1) {  // Allow only up to 7 additional people
        setNames([...names, { firstName: '', lastName: '', isAdult: true, isFamily: true }]);
      }
    };

    const handleRemoveName = (index) => {
      setNames(names.filter((_, i) => i !== index));
    };

    const handleNameChange = (index, field, value) => {
      const updatedNames = names.map((name, i) =>
        i === index ? { ...name, [field]: value } : name
      );
      setNames(updatedNames);
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 350 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Form noValidate validated={validated} className="bg-dark text-light p-5 needs-validation" id="form" onSubmit={handleSubmit}>
          {/* Client ID */}
          <Form.Group className="row mb-3">
            <Col md={12}>
              <Form.Label htmlFor="client-id">Client ID</Form.Label>
              <Form.Control
                className="rounded-0"
                type="text"
                id="client-id"
                value={clientId || ''}
                readOnly
              />
            </Col>
          </Form.Group>

          {/* Names Section */}
          <div className="names-section">
            <Form.Label className="names-label">Names</Form.Label>
            {names.map((name, index) => (
              <div key={index} className="name-entry d-flex mb-3 align-items-center">
                <Col md={4}>
                  <Form.Control
                    className="name-input rounded-0"
                    type="text"
                    placeholder="First Name"
                    value={name.firstName}
                    onChange={(e) => handleNameChange(index, 'firstName', e.target.value)}
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    className="name-input rounded-0"
                    type="text"
                    placeholder="Last Name"
                    value={name.lastName}
                    onChange={(e) => handleNameChange(index, 'lastName', e.target.value)}
                    required
                  />
                </Col>
                <Col md={3} className="client-toggle">
                  <Form.Check
                    type="switch"
                    id={`is-adult-${index}`}
                    label="Children/Adult"
                    checked={name.isAdult}
                    onChange={(e) => handleNameChange(index, 'isAdult', e.target.checked)}
                  />
                  <Form.Check
                    type="switch"
                    id={`is-family-${index}`}
                    label="Guest/Family"
                    checked={name.isFamily}
                    onChange={(e) => handleNameChange(index, 'isFamily', e.target.checked)}
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline-secondary"
                    className={`name-action-btn ${index === names.length - 1 ? 'add-btn' : 'remove-btn'}`}
                    onClick={() => index === names.length - 1 ? handleAddName() : handleRemoveName(index)}
                  >
                    {index === names.length - 1 ? '+' : '-'}
                  </Button>
                </Col>
              </div>
            ))}
          </div>

          {/* Arrival Information */}
          <Form.Group className="row mb-3">
            <Col md={6}>
              <Form.Label htmlFor="arrival-date">Arrival Date</Form.Label>
              <Form.Control
                className="rounded-0"
                type="date"
                id="arrival-date"
                value={arrivalDate}
                onChange={(event) => setArrivalDate(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">Please choose your arrival date.</Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="arrival-first-meal">Arrival First Meal</Form.Label>
              <Form.Control
                as="select"
                id="arrival-first-meal-select"
                value={arrivalFirstMeal}
                onChange={(event) => setArrivalFirstMeal(event.target.value)}
                required
              >
                <option value="">Select Arrival First Meal</option>
                {firstMealList.map((firstMeal) => (
                  <option key={firstMeal.id} value={firstMeal.name}>
                    {firstMeal.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">Please choose your arrival first meal time.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Departure Information */}
          <Form.Group className="row mb-3">
            <Col md={6}>
              <Form.Label htmlFor="departure-date">Departure Date</Form.Label>
              <Form.Control
                className="rounded-0"
                type="date"
                id="departure-date"
                value={departureDate}
                onChange={(event) => setDepartureDate(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">Please choose your departure date.</Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label htmlFor="departure-last-meal">Departure Last Meal</Form.Label>
              <Form.Control
                as="select"
                id="departure-last-meal"
                value={departureLastMeal}
                onChange={(event) => setDepartureLastMeal(event.target.value)}
                required
              >
                <option value="">Select Departure Last Meal</option>
                {firstMealList.map((firstMeal) => (
                  <option key={firstMeal.id} value={firstMeal.name}>
                    {firstMeal.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">Please choose your departure last meal time.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* job Selection */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="job-select">Select Cabin</Form.Label>
            <Form.Control
              as="select"
              id="job-select"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              required
            >
              <option value="">Select a job</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.name}>
                  {job.description}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">Please select a cabin.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="airport-pickup"
              label="Airport Pickup"
              checked={airportPickup}
              onChange={(event) => setAirportPickup(event.target.checked)}
            />
          </Form.Group>

          {airportPickup && (
            <Form.Group className="mb-3">
              <Form.Label htmlFor="flight-description">Flight Description</Form.Label>
              <Form.Control
                type="text"
                id="flight-description"
                placeholder="Enter flight details"
                value={flightDescription}
                onChange={(e) => setFlightDescription(e.target.value)}
              />
            </Form.Group>
          )}
          
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="housekeeping"
              label="Housekeeping"
              checked={housekeeping}
              onChange={(event) => setHousekeeping(event.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="firewood"
              label="Firewood"
              checked={firewood}
              onChange={(event) => setFirewood(event.target.checked)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="golf-cart-rental"
              label="Golf Cart Rental"
              checked={golfCartRental}
              onChange={(event) => setGolfCartRental(event.target.checked)}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="btn btn-lg rounded-0 mt-4" id="submit-btn">
            Submit
          </Button>
        </Form>

        <div id="results"></div>
      </motion.div>
    );
  }

  export default ReservationForm;
