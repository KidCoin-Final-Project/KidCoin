import React, { Component } from 'react';
import "../Top-Navbar/top-navbar.css";
import Auth from "../../utils/fire-base/firebase";
import {
  Redirect
} from "react-router-dom";

class TopNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moveToLogin: false
    };

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.setState({ moveToLogin: false });
    Auth.signOut().then(function() {
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('userUID');
      sessionStorage.removeItem('userType');

    }).catch(function(error) {
      // An error happened.
    });
    this.setState({ moveToLogin: true });
  }

    render() {
        return (
          <div id="body-top-navbar">
            <div id="top-navbar">
            <div>
                <div className="fa fa-sign-out navbar-fav" onClick={() => this.handleSignOut()}></div>
                { this.state.moveToLogin &&
                <Redirect to="/Login"></Redirect>
    }
            </div>
            <div>
                <img id="logo-img" src="images/kid-coin-logo.jpg" alt="KidCoin Logo"/>
            </div>
            <div>
            </div>
            </div>
          </div>
        );
      }
    }
    
export default TopNavBar;