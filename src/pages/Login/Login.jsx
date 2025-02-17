// src/pages/Login/Login.js
import React from 'react';
import './Login.css';
import LoginForm from '../../components/LoginForm/LoginForm';

function Login() {
  return (
    <div className="login-page" id="login-page">
      <header className="mt-5">
        <h2 className="login-header">Sign In</h2>
      </header>
      
      <div className="container my-5">
        <LoginForm />
      </div>

      <div className="bg-dark text-light py-5">
      </div>
    </div>
  );
}

export default Login;
