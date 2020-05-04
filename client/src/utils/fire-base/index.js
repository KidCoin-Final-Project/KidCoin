import React, { Component, createContext } from "react";
import { auth } from "./firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null,
    userToken: null
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      this.setState({ user: userAuth });
      if(userAuth) {
        this.setState({ userToken: userAuth.getIdToken(false).then(idToken => {
          return idToken; })
        })
      }
      this.setState({ userToken: auth.userToken });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
