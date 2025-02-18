import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './ProfileForm.css';
import axios from 'axios';

function ProfileForm() {
  const [formData, setFormData] = useState({
    id: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword:'',
  });

  const [clientId, setClientId] = useState('');
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

  useEffect(() => {
    const clientIdFromStorage = localStorage.getItem('customerId');
    if (clientIdFromStorage) {
      formData.clientId = clientIdFromStorage;
      setClientId(clientIdFromStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false || formData.newPassword !== formData.confirmPassword) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post('https://api.wausaukeeclub.org/api/auth/update', formData);
      setMessage("Updated Successfully!");
      setSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong.');
      console.error('Error during update:', error);
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
        {/* Client ID */}
        <Form.Group className="w-100" controlId="registerEmail">
          <Form.Label>Client ID</Form.Label>
            <Form.Control
              className="rounded-0"
              type="text"
              id="client-id"
              value={formData.clientId}
              readOnly
            />
          <Form.Control.Feedback type="invalid">
            Please enter a valid ID.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Old Password */}
        <Form.Group className="w-100" controlId="oldPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your current password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter the current password.
          </Form.Control.Feedback>
        </Form.Group>

        {/* New Password */}
        <Form.Group className="w-100" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter the current password.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="w-100" controlId="confirmPassword">
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
            {formData.newPassword !== formData.confirmPassword
              ? 'Passwords do not match.'
              : 'Please confirm your password.'}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="button-container" controlId="registerButton">
          <Button variant="success" type="submit" className="mt-3">
            Update
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
            onClick={() => setMessage('')}
          ></button>
        </div>
      )}

    </motion.div>
  );
}

export default ProfileForm;
