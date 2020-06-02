import React, { Component } from "react";
import {
  Route,
  HashRouter
} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import TopNavBar from "./Components/Top-Navbar/top-navbar"
import KidHome from "./Pages/kid-page/kid-page";
import NearKiosk from "./near-kiosk/near-kiosk";
import OwnerHome from "./Pages/owner-page/owner-page";
import ParentHome  from "./Pages/parent-page/parent-page";
import Home from "./Pages/home/home";
import BarcodeScanner from "./utils/barcode-reader/barcode-reader";
import { userContext } from "./utils/fire-base/userContext";
import Auth from "./utils/fire-base/firebase";
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      uid: '',
      userToken: '',
      userType: '',
      firstTime: true
    };

    this.setUser = this.setUser.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  componentDidMount = async () => {
    Auth.onAuthStateChanged(async userAuth => {
      this.setState({ user: userAuth });
      if (userAuth) {
        let token = await userAuth.getIdToken();
        this.setUser(userAuth.uid, token);  
      }

      if (this.state.uid !== '' && this.state.userToken !== '' && this.state.firstTime) {
        // TODO : if its first time then redirect to home
        const response = await axios.get(
          'http://localhost:8080/auth/userByToken',
          { headers: { 'authtoken': this.state.userToken } }
          );
  
          this.setState({ firstTime: false });
          this.setState({ userType: response.data.type });
      };
    });
  }


  setUser(uid, token) {
    this.setState({ uid: uid });
    if (token === undefined) {
      this.setState({ userToken: '' });
      return;
    }
    this.setState({ userToken: token });
  }

  isLoggedIn(){
    if (!(this.state.uid !== '' || this.state.userToken !== '')) {
      this.props.location.href = "/";
    }
  }

  render() {
    const value = {
      uid: this.state.uid,
      userToken: this.state.userToken,
      setUserFunc: this.setUser,
      isLoggedInFunc: this.isLoggedIn,
      userType: this.state.userType
    }
    return (
      <userContext.Provider value={value}>
        <HashRouter>
          <TopNavBar />
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/KidPage" component={KidHome} />
            <Route exact path="/OwnerPage" component={OwnerHome} />
            <Route exact path="/NearKiosks" component={NearKiosk} />
            <Route exact path="/Barcode" component={BarcodeScanner} />
            <Route exact path="/Parent" component={ParentHome} />

          </div>
        </HashRouter>
      </userContext.Provider>
    );
  }
}

export default Main;