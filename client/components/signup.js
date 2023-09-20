import React, { useState } from 'react';

const signup = () => {
  
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const register = async (ev) => {
    ev.preventDefault();  //This will not let the user go to the next page yet:

    const response = await fetch('http://localhost:3000/userAccess/signup', {
      method: 'POST',
      body: JSON.stringify({userName, userPassword}),
      headers: {
        'Content-Type':'application/json'
      }});
    
    if (response.status === 200) {
      alert('Registration successful');
    } else {
      alert('Registration failed');
    }
  };


  return (
    <div>
      <h2>this is SIGNUP</h2>
      <form onSubmit={register}>
        <label>
          Username:
          <input type="text" placeholder='Enter Username'
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}    
          />
          Password:
          <input type="text" placeholder ='Enter Password' 
            value={userPassword}
            onChange={(ev) => setUserPassword(ev.target.value)}
          />
        </label>
        <input type="submit" value="SignUp" />
      </form>
    </div>
  );
};

export default signup;
