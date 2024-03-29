import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt from "jwt-decode";

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    google_id: '',
    coock: false,
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Видаляємо google_id перед відправкою даних через форму
    const { google_id, ...formDataWithoutGoogleId } = formData;

    try {
      const response = await axios.post('http://api.homiechef.loc/register', formDataWithoutGoogleId);
      setMessage(response.data.message);

      if (response.status === 200) {
        navigate('/role');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Помилка при реєстрації');
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
    formData.coock = false;

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
      <h2>User Registration</h2>
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
          <label>Телефон:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
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
        <div>
          <button type="submit">SignUp</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
