import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../Register/register.css';
 
class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      showParent: false,
      showKid: false,
      showFirstTime: true
    };

    this.handleKidRegister = this.handleKidRegister.bind(this);
    this.handleParentRegister = this.handleParentRegister.bind(this);
  }

  handleKidRegister(evt) {
    this.setState({ showParent: false });
    this.setState({ showKid: true });
    this.setState({ showFirstTime: false });
}

  handleParentRegister(evt) {
    this.setState({ showParent: true });
    this.setState({ showKid: false });
    this.setState({ showFirstTime: false });
}


  render() {
    return (
      <div id="body-register">
        {
          this.state.showFirstTime &&
            <span className="first-time-span-register-page">
                  ?בתור מי תרצה/י להירשם
            </span>
            &&
        <div>
            <div id="signup-outer-register-page">
                <button className="btn btn-light signup-button" onClick={this.handleKidRegister}><span>ילד/ה</span></button>
                <button className="btn btn-light signup-button" onClick={this.handleParentRegister}>הורה</button>
                <button className="btn btn-light signup-button" onClick={this.handleParentRegister}><span>בעל/ת עסק</span></button>
            </div>
          </div>
  }
        {
          this.state.showKid &&
        <div className="register-outer" id="kid-section">
            <form className="register-form">
                <input className="register-input" placeholder="מספר פלאפון של ההורה" type="text"/>
                    <input className="register-input" placeholder="שם מלא" type="text"/>
                    <input className="register-input" placeholder="מספר פלאפון" type="text"/>
                    <input className="register-input" placeholder="סיסמא" type="password"/>
                    <input className="btn btn-light register-submit-button" type="submit" value="הירשם"/>
            </form>
          </div>
        }

        {
          this.state.showParent &&
        <div className="register-outer" id="parent-section">
            <form className="register-form">
                <input className="register-input" placeholder="שם מלא" type="text"/>
                <input className="register-input" placeholder="מספר פלאפון" type="text"/>
                <input className="register-input" placeholder="סיסמא" type="password"/>
                <input className="btn btn-light register-submit-button" type="submit" value="הירשם"/>
            </form>
        </div>
        }
      </div>
    );
  }
}
 
export default Register;