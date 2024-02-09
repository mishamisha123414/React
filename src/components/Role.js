import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Role() {
  const [isCook, setIsCook] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Відправляємо запит до API, щоб оновити роль користувача
    axios.post('http://api.homiechef.loc/role', {
      is_seller: isCook,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.message);
          //navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Вибір ролі</h2>
      <p>
        Виберіть роль, яку ви хочете отримати:
      </p>
      <form onSubmit={Role}>
      <div>
        <label>Продавець</label>
        <input
          type="checkbox"
          name="is_seller"
          checked={isCook}
          onChange={(e) => setIsCook(e.target.checked)}
        />
      </div>
      <button type="submit" variant="primary">
        Підтвердити
      </button>
      </form>
    </div>
    
  );
}

export default Role;