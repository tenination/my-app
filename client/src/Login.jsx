import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Login = (props) => (
  <div style={{padding: '20px', margin: '100px 100px 100px 40%'}}>
    <h1>Login</h1>
    <input type="text" onChange={props.handleUsername} /><span>Username</span>
    <br />
    <input type="text" onChange={props.handlePassword} /><span>Password</span>
    <br />
    <button onClick={props.handleSubmit}>Submit</button>
    <li><Link to="/signup">Don't have an account?</Link></li>
  </div>
);

export default Login;
