/* eslint-disable */
import React from 'react';
import {
  Link,
} from 'react-router-dom';

const Home = props => (
  <div style={{ padding: '20px', margin: '100px 100px 100px 40%' }}>
    <h1>Home</h1>
    <h2>{`Welcome ${props.username}!`}</h2>
    <li><Link to="/login">Logout</Link></li>
  </div>
);

export default Home;
