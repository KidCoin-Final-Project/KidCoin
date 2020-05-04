import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import UserProvider from "./utils/fire-base/index";
 
ReactDOM.render(
  <UserProvider>
  <Main/>
  </UserProvider>, 
  document.getElementById("root")
);