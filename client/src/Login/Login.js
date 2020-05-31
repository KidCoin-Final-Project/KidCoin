import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../Login/login.css';
import Auth from "../utils/fire-base/firebase";
import Alert from "react-bootstrap/Alert"



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  async handleLogin(evt) {
    evt.preventDefault();
    this.state.error = '';

    if (this.validateFields(evt)) {
      return this.setState({ error: this.validateFields(evt) });
    }

    await Auth.signInWithEmailAndPassword(this.state.username, this.state.password).catch(error => {
      this.setState({ error: " אירעה שגיאה במהלך כניסה לחשבון באמצעות מייל וסיסמא " + error });
      this.setState({ password: '' });
      return;
    });

    if (this.state.error === '') {
      this.props.history.push("/");
    }

  }

  //TODO : Need to add more validations
  validateFields(evt) {
    let currError;

    if (!this.state.username) {
      currError = 'שם משתמש נחוץ';
    }

    if (!this.state.password) {
      currError = currError ? currError + ' וגם סיסמא' : 'סיסמא נחוצה';
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
      <div id="body-login">
        <div id="login-outer">
          <Alert variant="danger" show={this.state.error !== ''} onClose={() => this.setState({error:''})} dismissible>
            <Alert.Heading>קרתה שגיאה!</Alert.Heading>
            <p>
              {this.state.error}
        </p>
          </Alert>
          <form id="login-form" onSubmit={this.handleLogin}>
            <input className="login-input" placeholder="אימייל/שם משתמש" type="text" value={this.state.username} onChange={this.handleUserChange} />
            <input className="login-input" placeholder="סיסמא" type="password" value={this.state.password} onChange={this.handlePassChange} />
            <input className="btn btn-light" id="login-submit-button" type="submit" value="כניסה לחשבון" />
          </form>
        </div>
        <div id="signup-outer-login-page">
          <span id="first-time-span-login-page">
            פעם ראשונה פה? הרשמ/י
            </span>
          <NavLink to={{ pathname: "Register", state: { isKid: true, isFromLoginPage: true, isOwner: false } }}>
            <button className="btn btn-light signup-login-page-button">
              <span>ילד/ה</span></button></NavLink>

          <NavLink to={{ pathname: "Register", state: { isKid: false, isFromLoginPage: true, isOwner: false } }}>
            <button className="btn btn-light signup-login-page-button">
              <span>הורה</span></button></NavLink>

          <NavLink to={{ pathname: "Register", state: { isKid: false, isFromLoginPage: true, isOwner: true } }}>
            <button className="btn btn-light signup-login-page-button">
              <span>בעל/ת עסק</span></button></NavLink>
        </div>
      </div>
    );
  }
}

export default Login;