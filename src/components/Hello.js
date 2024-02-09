import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userName, setUserName] = useState('');
  const [response, setResponse] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  
  

  useEffect(() => {
    // Отримайте CSRF-токен із мета-тегу
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
      setCsrfToken(metaTag.getAttribute('content'));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://api.homiechef.loc/welcome',
        {
          name: userName,
        },
        {
          headers: {
            'X-CSRF-TOKEN': csrfToken, // Включіть CSRF-токен у заголовок
          },
        }
      );
      setResponse(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Привіт, {response}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введіть ім'я користувача"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">Відправити</button>
      </form>
    </div>
  );
}

export default App;
