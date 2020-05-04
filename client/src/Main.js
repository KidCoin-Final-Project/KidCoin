import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import TopNavBar from "./Components/Top-Navbar/top-navbar"
import KidHome from "./Pages/kid-page/kid-page";
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
          <TopNavBar/>
            <div>
                <Route exact path="/" component={Login}/>
                <Route exact path="/Login" component={Login}/>
                <Route exact path="/Register" component={Register}/>
                <Route exact path="/KidPage" component={KidHome}/>
                
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;