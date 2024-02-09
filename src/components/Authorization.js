import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt from "jwt-decode";



function Authorization() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://api.homiechef.loc/auth', formData);
      if (response.status === 200) {
        localStorage.setItem('userEmail', formData.email);
        navigate('/congratulations');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Помилка авторизації');
      }
      console.error(error);
    }
  };
  const googleProvider = new GoogleOAuthProvider({
    clientId: '',
    clientSecret: '',
    redirectUri: 'http://localhost:3000',
  });

  const onSuccess = async (token, google_id) => {
    localStorage.setItem('token', google_id);
    console.log(jwt(token.credential).sub);
    google_id = jwt(token.credential).sub;
    setFormData({ ...formData, google_id });
    formData.email = jwt(token.credential).email;
    formData.phone = "";
    formData.password = "";

    if (token) {
      formData.google_id = google_id;

      if (google_id) {
        console.log(google_id);
      } else {
        console.log('google_id is undefined.');
      }

      console.log(formData);
      try {
        const response = await axios.post('http://api.homiechef.loc/register', formData);
        setMessage(response.data.message);
        localStorage.setItem('userEmail', formData.email);
        if (response.status === 200) {
          navigate('/congratulations');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setMessage(error.response.data.message);
        } else {
          setMessage('Помилка при реєстрації');
        }
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Authorization</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
        <Link to={'/registration'}>Create account</Link>
        </div>
        <div>
          <GoogleLogin
            provider={googleProvider}
            style={{
              width: '150px',
              height: '40px',
            }}
            onSuccess={onSuccess}
          />
        </div>
      </form>
    </div>
  );
}

export default Authorization;
