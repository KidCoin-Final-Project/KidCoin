import React, { Component } from "react";
import {
  Route,
  HashRouter,
  Redirect
} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import TopNavBar from "./Components/Top-Navbar/top-navbar"
import KidHome from "./Pages/kid-page/kid-page";
import NearKiosk from "./near-kiosk/near-kiosk";
import OwnerHome from "./Pages/owner-page/owner-page";
import ParentHome  from "./Pages/parent-page/parent-page";
import Home from "./Pages/home/home";
import ListProducts from "./Pages/list-of-products/list-of-products";
import Product from "./Pages/product/product";
import BarcodeScanner from "./utils/barcode-reader/barcode-reader";
import { userContext } from "./utils/fire-base/userContext";
import Auth from "./utils/fire-base/firebase";
import axios from 'axios';
import ChargeMoney from "./Pages/charge-money/charge-money";
import NewProduct from "./Pages/new-product/new-product";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import EditKidByParent from "./Pages/edit-kid-by-parent/edit-kid-by-parent";
import 'semantic-ui-css/semantic.min.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      uid: '',
      userToken: '',
      userType: '',
      firstTime: true,
      navigateHome: false
    };

    this.navigateHome = this.navigateHome.bind(this);
    this.setUser = this.setUser.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  componentDidMount = async () => {
    Auth.onAuthStateChanged(async userAuth => { 
      if (userAuth) {
        let token = await userAuth.getIdToken();
        this.setUser(userAuth.uid, token);  
      }else{
        this.setState({ navigateHome : false });
        this.setState({ firstTime : true });
      }

      if (sessionStorage.getItem('userUID') !== null && sessionStorage.getItem('userToken') !== null && this.state.firstTime) {
        const response = await axios.get(
          'http://localhost:8080/auth/userByToken',
          { headers: { 'authtoken': sessionStorage.getItem('userToken')} }
          );
  
          sessionStorage.setItem('userType', response.data.type);
          this.setState({ firstTime : false });
          this.setState({ navigateHome: true });
      };
    });
  }


  setUser(uid, token) {
    sessionStorage.setItem('userUID', uid);
    sessionStorage.setItem('userToken', token);
  }

  isLoggedIn(){
    if ((!(sessionStorage.getItem('userUID') !== null || sessionStorage.getItem('userToken') !== null)) && this.props.location) {
      this.props.location.href = "/";
    }
  }

  navigateHome(){
    this.props.location.href = "/";
  }
  

  render() {
    const value = {
      setUserFunc: this.setUser,
      isLoggedInFunc: this.isLoggedIn
    }
    return (
      <userContext.Provider value={value}>
        <ReactNotification />
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
            <Route exact path="/ChargeMoney" component={ChargeMoney} />
            <Route exact path="/Products" component={ListProducts} />
            <Route exact path="/Product" component={Product} />
            <Route exact path="/NewProduct" component={NewProduct} />
            <Route exact path="/EditKidByParent" component={EditKidByParent} />


          </div>
          {this.state.navigateHome &&
                                <Redirect to="/"></Redirect>
                }
        </HashRouter>
      </userContext.Provider>
    );
  }
}

export default Main;