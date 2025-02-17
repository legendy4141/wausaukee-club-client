import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './RegisterForm.css';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    country: '',
    zip: '',
    city: '',
    state: '',
    address1: '',
    address2: '',
    phone: ''
  });

  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || formData.password !== formData.confirmPassword) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage("Registered Successfully!");
      setSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong.');
      console.error('Error during registration:', error);
      setSuccess(false);
    }
  };

  return (
    <motion.div
      className="register-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Email Address */}
        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-3" controlId="registerConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            isInvalid={formData.password !== formData.confirmPassword && validated}
          />
          <Form.Control.Feedback type="invalid">
            {formData.password !== formData.confirmPassword
              ? 'Passwords do not match.'
              : 'Please confirm your password.'}
          </Form.Control.Feedback>
        </Form.Group>

        {/* First Name */}
        <Form.Group className="mb-3" controlId="registerFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your first name.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Last Name */}
        <Form.Group className="mb-3" controlId="registerLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your last name.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Country */}
        <Form.Group className="mb-3" controlId="registerCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your country.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Zip/Postcode */}
        <Form.Group className="mb-3" controlId="registerZip">
          <Form.Label>Zip/Postcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Zip or Postcode"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your Zip/Postcode.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Suburb/City */}
        <Form.Group className="mb-3" controlId="registerSuburb">
          <Form.Label>Suburb/City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your suburb or city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your suburb or city.
          </Form.Control.Feedback>
        </Form.Group>

        {/* State/Province */}
        <Form.Group className="mb-3" controlId="registerState">
          <Form.Label>State/Province</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your state or province"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your state or province.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Address Line 1 */}
        <Form.Group className="mb-3" controlId="registerAddress1">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address line 1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your address.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Address Line 2 (Optional) */}
        <Form.Group className="mb-3" controlId="registerAddress2">
          <Form.Label>Address Line 2 (Optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address line 2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Phone Number */}
        <Form.Group className="mb-3" controlId="registerPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your phone number.
          </Form.Control.Feedback>
        </Form.Group>
        
        
        <Form.Group className="mb-3 button-container" controlId="registerButton">
          <Button variant="success" type="submit" className="mt-3">
            Register
          </Button>
        </Form.Group>
      </Form>
      {message && (
        <div
          className={`alert ${success ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}
          role="alert"
        >
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setMessage('')} // Close the message when clicked
          ></button>
        </div>
      )}

    </motion.div>
  );
}

export default RegisterForm;
