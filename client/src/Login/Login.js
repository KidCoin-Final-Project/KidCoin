import React, { Component } from 'react';
import {auth} from "../utils/firebase";
// import './App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleLogin(evt) {
    evt.preventDefault();

    if(this.validateFields(evt)) {
      return this.setState({ error: this.validateFields(evt) });
    }

    return auth.signInWithEmailAndPassword(this.state.username, this.state.password).catch(error => {
      return this.setState({ error: "Error signing in with password and email!" })
    });

    // TODO : Redirect to home page after login
  }

  //TODO : Need to add more validations
  validateFields(evt) {
    let currError;

    if (!this.state.username) {
      currError = 'Username is required';
    }

    if (!this.state.password) {
      currError = currError ? currError + ' and password is required' : 'Password is required';
    }

    return currError;
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleLogin}>
          {
            this.state.error &&
            <h3>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }

          <input type="text" value={this.state.username} placeholder="Username/Email" onChange={this.handleUserChange} />

          <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePassChange} />

          <input type="submit" value="Log In"/>
        </form>
      </div>
    );
  }
}

export default Login;