import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../owner-page/owner-page.css"
import { userContext } from "../../utils/fire-base/userContext";
import { NavLink } from "react-router-dom";
import TopNavBar from "../../Components/Top-Navbar/top-navbar";

class OwnerHome extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <TopNavBar />
        );

    }
}

OwnerHome.contextType = userContext;
export default OwnerHome;

