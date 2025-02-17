// src/components/LoginForm/LoginForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');  // State to handle errors
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('Form submitted with:', { email, password });

      try {
        // Send login request to backend
        const response = await axios.post('https://api.thesamodrei.com:5050/api/auth/login', {
          email,
          password,
        });

        // Store JWT token in localStorage (or sessionStorage)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('customerId', response.data.customer.customer_id);

        // Redirect user to the dashboard or any protected route after successful login
        navigate('/contact');
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      }
    }
    setValidated(true);
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <motion.div
      className="login-form-wrapper container"
      initial={{ opacity: 0, x: 350 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="row">
        {/* Login Section */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Sign In Button */}
            <Button variant="success" type="submit" className="btn btn-md rounded-2 mt-4">
              SIGN IN
            </Button>
          </Form>
        </div>

        {/* Signup Section */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <motion.div
            className="signup-section"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <strong className="d-block mb-2">New Customer?</strong>
            <p>Create an account with us and you'll be able to:</p>
            <ul>
              <li>Check out faster</li>
              <li>Save multiple shipping addresses</li>
              <li>Access your order history</li>
              <li>Track new orders</li>
              <li>Save items to your Wish List</li>
            </ul>
            <Button 
              variant="success" 
              type="button" 
              className="btn btn-md rounded-2 mt-2"
              onClick={handleCreateAccount}
            >
              CREATE ACCOUNT
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginForm;
