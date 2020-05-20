import React, { Component } from "react";
import {
    Route,
    HashRouter,
    Redirect
} from "react-router-dom";
import { userContext } from "../../utils/fire-base/userContext";
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToChild: false,
            moveToParent: false,
            moveToOwner: false
        }
    }

    redirectToHome(type) {

        if (type !== '') {
            


            // type === "parent" ? this.props.history.push('/KidPage') : type === "owner" ? this.props.history.push('/OwnerPage') : this.props.history.push('/KidPage');

            return type === "parent" ? <Redirect to="/KidPage"></Redirect> : type === "owner" ? <Redirect to="/OwnerPage"></Redirect> : <Redirect to="/KidPage"></Redirect>;



        } else {
            return <Redirect to="/Login"></Redirect>;
            // return true;
        }
    }
//     {this.redirectToHome(user.uid, user.userToken)}
    render() {
        return (
            <userContext.Consumer>
                {user => {
                    return (
                         <div>
                             {this.redirectToHome(user.userType)}
                         </div>

                    )
                }
                }
            </userContext.Consumer>
        );
    }
}

export default Home;