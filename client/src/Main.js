import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
 import TopNavBar from "./Components/Top-Navbar/top-navbar"
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
          <TopNavBar/>
            {/* <NavLink to="/Login">Login</NavLink>
            <NavLink to="/Register">Register</NavLink> */}
            <div>
                <Route exact path="/" component={Login}/>
                <Route path="/Login" component={Login}/>
                <Route path="/Register" component={Register}/>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;