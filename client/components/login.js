import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { setUserId,setCategories } from '../reducers/categorySlice';
import { useDispatch } from 'react-redux';

const login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const responseData = await response.json();

    if (response.status === 200) {
      alert('login successful');
      console.log('responseData',responseData);
      dispatch(setUserId(responseData.existingUser._id));
      const obj = {tasks: responseData.tasks, names: responseData.names}
      dispatch(setCategories(obj));
      navigate('/mainpage');
    } 
    else {
      alert('credentials failed');
    }
  };
  

  return (
    <div className="login-div">
      <form className="login-form" onSubmit={loginUser}>
        <h2 className='login-heading'> Login </h2>
        <div className='username-div-login'> 
          <input className="login-inp" type="text" 
            placeholder='Enter Username' 
            value={userNameLogin} 
            onChange={(ev) => setUserNameLogin(ev.target.value)}/>
        </div>  
        <div className='username-div-login'>
          <input className='pass-inp' type="password"
            placeholder ='Enter Password' 
            value={userPasswordLogin} 
            onChange={(ev) => setUserPasswordLogin(ev.target.value)}/>
        </div>
        <div>
          <input className="login-submit-btn" type="submit" value="Submit" />
          <p>New User? <Link to="/signup">Sign up here</Link></p>
        </div>
      
      </form>
    </div>
  );

};
export default login;


 