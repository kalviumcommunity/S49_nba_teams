import React, { useState } from "react";
import "./Login.css";
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  const [field, setField] = useState({
    firstName: "",
    password: "",
  });

  const [submitted, setSubmit] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', field);
      console.log(response.data); 
      Cookies.set('firstName', response.data.firstName);
      setSubmit(true);
    } catch (error) {
      console.error('Registration failed:', error.response.data.error);
      setError(error.response.data.error);
      // Display popup/alert for user already exists error
      alert(error.response.data.error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout'); // Endpoint for logout
      Cookies.remove('firstName');
      setSubmit(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted ? (
          <div className="success-message">You have successfully registered ✅</div>
        ) : null}
        {error ? <div className="error-message">{error}</div> : null}

        <input
          id="user-name"
          className="form-field"
          type="text"
          placeholder="User Name"
          name="  "
          value={field.firstName}
          onChange={(e) => setField({ ...field, firstName: e.target.value })}
        />

        <input
          id="password"
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          value={field.password}
          onChange={(e) => setField({ ...field, password: e.target.value })}
        />

        <button className="form-field" type="submit">
          🎊 Register 🎊
        </button>
      </form>
      {submitted && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}
