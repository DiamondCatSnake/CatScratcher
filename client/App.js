import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import HomeBoard from './components/HomeBoard';
import List from './components/list';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/mainpage' element={<HomeBoard />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </div>
  );
};

export default App;