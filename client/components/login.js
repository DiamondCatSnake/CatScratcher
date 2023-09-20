import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const login = () => {

  //Authentication Login

  // Step 1: Learn Sign Ip/ Login
  //Step 2: Configure out mongodb to hanlde user login
  //Step 3: Bcrypt for the passwords
  //Figure out how to check authetnication

  const [userNameLogin, setUserNameLogin] = useState('');
  const [userPasswordLogin, setUserPasswordLogin] = useState('');

  const loginUser = async (ev) => {
    ev.preventDefault();

    const response = await fetch('http://localhost:3000/userAccess/login', {
      method: 'POST',
      body: JSON.stringify({userNameLogin, userPasswordLogin}),
      headers: {
        'Content-Type':'application/json'
      }});

    if (response.status === 200) {
      alert('login successful');
    } 
    else {
      alert('credentials failed');
    }
  };

  return (
    <div>
      <h2> Login Page</h2>
      <form onSubmit={loginUser}>
        <label>
            Username:
          <input type="text" 
            placeholder='Enter Username' 
            value={userNameLogin} 
            onChange={(ev) => setUserNameLogin(ev.target.value)}/>
            Password:
          <input type="text"
            placeholder ='Enter Password' 
            value={userPasswordLogin} 
            onChange={(ev) => setUserPasswordLogin(ev.target.value)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );

};




export default login;
