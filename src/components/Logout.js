import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      //...
    }
  }, [navigate]);

  const handleLogout = () => {
    axios.post('http://api.homiechef.loc/logout') 
      .then(response => {
        console.log(response.data);
        setMessage('Logout successfully');

        localStorage.removeItem('userEmail');

        navigate('/');
      })
      .catch(error => {
        console.error(error);
        setMessage('Logout error');
      });
  }

  return (
    <div>
      <h1>Вихід</h1>
      <p>Ви дійсно хочете вийти?</p>
      <button onClick={handleLogout}>Вийти</button>
      <p>{message}</p>
    </div>
  );
}

export default Logout;
