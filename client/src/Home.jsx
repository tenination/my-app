/* eslint-disable */
import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
  	console.log('handleLogout being called');
    axios.get('/logout')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
  	return (
  	  <div style={{ padding: '20px', margin: '100px 100px 100px 40%' }}>
        <h1>Home</h1>
        <h2>{`Welcome ${this.props.username}!`}</h2>
        <li><Link onClick={this.handleLogout} to="/login">Logout</Link></li>
      </div>
  	);
  }
}

export default Home;
