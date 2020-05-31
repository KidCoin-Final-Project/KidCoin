import React, { Component } from 'react';
import "../Top-Navbar/top-navbar.css";

class TopNavBar extends Component {

    render() {
        return (
          <div id="body-top-navbar">
            <div id="top-navbar">
            <div>
                <div className="fa fa-envelope navbar-fav"></div>
            </div>
            <div>
                <img id="logo-img" src="images/kid-coin-logo.jpg" alt="KidCoin Logo"/>
            </div>
            <div>
                <div className="fa fa-bars navbar-fav"></div>
            </div>
            </div>
          </div>
        );
      }
    }
    
export default TopNavBar;