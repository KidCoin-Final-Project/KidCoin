import React, { Component } from "react";
import {
    Redirect
} from "react-router-dom";
import { userContext } from "../../utils/fire-base/userContext";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToChild: false,
            moveToParent: false,
            moveToOwner: false,
            moveToLogin: false
        }
    }

    componentDidMount() {
        const type = sessionStorage.getItem('userType');

        if (type !== null) {
            type === "parent" ? this.setState({moveToParent: true}) : type === "owner" ? this.setState({moveToOwner: true}) : this.setState({moveToChild: true});
        } else {
            this.setState({moveToLogin: true});
        }
      }

    render() {
        return (
            <userContext.Consumer>
                {user => {
                    return (
                        <div>

                            {this.state.moveToChild &&
                                <Redirect to="/KidPage"></Redirect>
                }
                {
                                this.state.moveToParent &&
                                    <Redirect to="/Parent"></Redirect>
                                
                }
                {
                                this.state.moveToOwner &&
                                    <Redirect to="/OwnerPage"></Redirect>
                                
                }
                {
                                this.state.moveToLogin &&
                                    <Redirect to="/Login"></Redirect>
                                
                }
                        </div>

                    )
                }
                }
            </userContext.Consumer >
        );
    }
}

Home.contextType = userContext;

export default Home;