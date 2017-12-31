import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link, // eslint-disable-line
  Redirect // eslint-disable-line
} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signedUp: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTest = this.handleTest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleClick() {
    console.log('Get all users!');
    axios.get('/db')
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  handleTest() {
    console.log('Testing bcrypt!');
    axios.get('/test')
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ signedUp: false });
    console.log('Submit pressed!');
    console.log('username is:', this.state.username);
    console.log('password is:', this.state.password);
    const credentialsPayload = {
      username: this.state.username,
      password: this.state.password,
    };

    if (window.location.pathname === '/signup') { // eslint-disable-line
      console.log('/SIGNUP');
      axios.post('/signup', credentialsPayload)
        .then((response) => {
          console.log(response);
          this.setState({ signedUp: true });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ username: '', password: '' });
        });
    }

    if (window.location.pathname === '/login') { // eslint-disable-line
      console.log('/LOGIN');
      axios.post('/login', credentialsPayload)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleUsername(e) {
    console.log(this.state.username);
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    console.log(this.state.password);
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  render() {
    const { signedUp } = this.state;
    return (
      <Router>
        <div>
          <Route
            path="/signup"
            render={() => (
              <Signup
                handleUsername={this.handleUsername}
                handlePassword={this.handlePassword}
                handleSubmit={this.handleSubmit}
              />
           )}
          />
          <Route
            path="/login"
            render={() => (
              <Login
                handleUsername={this.handleUsername}
                handlePassword={this.handlePassword}
                handleSubmit={this.handleSubmit}
              />
          )}
          />
          <Route exact path="/" component={Home} />
          {signedUp && (<Redirect to="/login" />)}
        </div>
      </Router>
    );
  }
}

export default App;
