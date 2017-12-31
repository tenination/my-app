/* eslint-disable */
import React from 'react';
import {
  Link,
} from 'react-router-dom';

const Signup = props => (
  <div style={{ padding: '20px', margin: '100px 100px 100px 40%' }}>
    <h1>Signup</h1>
    <input type="text" onChange={props.handleUsername} /><span>Username</span>
    <br />
    <input type="text" onChange={props.handlePassword} /><span>Password</span>
    <br />
    <button onClick={props.handleSubmit}>Submit</button>
    <li><Link to="/login">Already have an account?</Link></li>
  </div>
);

export default Signup;
