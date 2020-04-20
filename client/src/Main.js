import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
            <ul className="header">
                <li><NavLink to="/Login">Login</NavLink></li>
                <li><NavLink to="/Register">Register</NavLink></li>
            </ul>
            <div className="content">
                <Route exact path="/" component={Login}/>
                <Route path="/Login" component={Login}/>
                <Route path="/Register" component={Register}/>
            </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;