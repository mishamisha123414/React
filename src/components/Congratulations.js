import React from 'react';

function Congratulations() {
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div>
      <h1>Congratulations!</h1>
      <p>You have successfully registered.</p>
      <p>Your email address is: {userEmail}</p>
    </div>
  );
}

export default Congratulations;