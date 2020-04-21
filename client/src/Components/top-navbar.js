import React, { Component } from 'react';
import "../css/top-navbar.css";

class TopNavBar extends Component {

    render() {
        return (
          <div id="body">
            <div id="top-navbar">
            <div>
                <a className="fa fa-envelope navbar-fav"></a>
            </div>
            <div>
                <img id="logo-img" src="images/kid-coin-logo.jpg"/>
            </div>
            <div>
                <a className="fa fa-bars navbar-fav"></a>
            </div>
            </div>
          </div>
        );
      }
    }
    
export default TopNavBar;