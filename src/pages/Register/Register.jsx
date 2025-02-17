// src/pages/Register/Register.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import RegisterForm from '../../components/Register/RegisterForm';

function Register() {
  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="mb-4 text-center page-title">New Account</h2>
        <RegisterForm />
      </motion.div>
    </Container>
  );
}

export default Register;
