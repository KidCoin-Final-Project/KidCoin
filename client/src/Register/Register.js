import React, { Component } from "react";
 
class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      error: '',
    };

    // this.handlePassChange = this.handlePassChange.bind(this);
    // this.handleUserChange = this.handleUserChange.bind(this);
    // this.handleRegister = this.handleRegister.bind(this);
    // this.dismissError = this.dismissError.bind(this);
  }


  render() {
    return (
      <div className="Register">
        {/* <form onSubmit={this.handleRegister}>
          {
            this.state.error &&
            <h3>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }

          <input type="text" value={this.state.firstName} placeholder="First name"/>
          <input type="text" value={this.state.LastName} placeholder="Last name"/>


          <input type="text" value={this.state.username} placeholder="Username/Email" onChange={this.handleUserChange} />

          <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePassChange} />


          <input type="submit" value="Log In"/>
        </form> */}
      </div>
    );
  }
}
 
export default Register;