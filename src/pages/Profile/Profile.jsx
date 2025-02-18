// src/pages/Profile/Profile.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ProfileForm from '../../components/Profile/ProfileForm';

function Profile() {
  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="mb-4 text-center page-title">Profile</h2>
        <ProfileForm />
      </motion.div>
    </Container>
  );
}

export default Profile;
