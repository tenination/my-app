import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Home = () => (
  <div style={{padding: '20px', margin: '100px 100px 100px 40%'}}>
    <h1>Home</h1>
    <li><Link to="/login">Logout</Link></li>
  </div>
);

export default Home;
