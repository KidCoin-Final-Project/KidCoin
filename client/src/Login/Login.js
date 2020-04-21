import React, { Component } from 'react';
import {auth} from "../utils/firebase";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/login.css';

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
      console.log("Error signing in with password and email!");
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

    console.log(currError);
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
      <div id="body">
        <div id="login-outer">
            <form id="login-form" onSubmit={this.handleLogin}>
                <input className="login-input" placeholder="אימייל/שם משתמש" type="text" value={this.state.username} onChange={this.handleUserChange}/>
                <input className="login-input" placeholder="סיסמא" type="password" value={this.state.password} onChange={this.handlePassChange}/>
                <input className="btn btn-light" id="login-submit-button" type="submit" value="כניסה לחשבון"/>
            </form>
        </div>
        <div id="signup-outer">
            <span id="first-time-span">
              פעם ראשונה פה? הרשמ/י
            </span>
            <button className="btn btn-light signup-button"><span>ילד/ה</span></button>
            <button className="btn btn-light signup-button"><span>הורה</span></button>
            <button className="btn btn-light signup-button"><span>בעל/ת עסק</span></button>
        </div>
      </div>
    );
  }
}

export default Login;