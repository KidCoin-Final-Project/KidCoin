import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../near-kiosk/near-kiosk.css';
import axios from "axios";
import { userContext } from "../utils/fire-base/userContext";

class NearKiosk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: '',
            nearKiosksDOM: '',
            currentCords:''
        };
    }
    
    componentDidMount() {
        this.context.isLoggedInFunc();
        var that = this;
        this.setState({ userToken: localStorage.getItem('userToken') });
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    that.setState({currentCords: position.coords});
                    that.getNearKiosksFromServer(position.coords, that.state.userToken);
                },
                function (error) {
                    // default coordinates in center tlv
                    console.error("Error Code = " + error.code + " - " + error.message);
                }
            );
            
        } else {
            console.log("Not Available");
        }
    }

    async getNearKiosksFromServer(coords, token) {
        const nearKiosks = await axios.get(
            'http://localhost:8080/store/byLocation',
            {
                headers: { 'authtoken': token },
                params: {
                    longitude: coords.longitude,
                    latitude: coords.latitude,
                    maxDistanceInMeters: 9999999
                }
            }
        );

        this.setState({ nearKiosks: await nearKiosks.data });
        this.setState({ nearKiosksDOM: this.nearKiosksDOM(this.state.nearKiosks)});
    }

    nearKiosksDOM(nearKiosks) {
        return nearKiosks.map((kiosk) =>
            <div className="activity" key={kiosk.distance}>
                <div className="product">
                    <span className="cost"><a href={`https://www.google.com/maps/dir/?api=1&origin=${this.state.currentCords.latitude},${this.state.currentCords.longitude}&destination=${kiosk.location.latitude},${kiosk.location.longitude}`} target="_blank">נווט/י לשם</a></span>
                    <span className="product-name">{kiosk.name}</span>
                </div>
                <div className="more-details">
                    <span>{kiosk.distance} מטר</span>
                    <span>{kiosk.address}</span>
                </div>
            </div>
        );
    }


    render() {
        return (
            <div className="body-near">
                <div id="search-kiosk-outer">
                    <span id="near-kiosk-span">קיוסקים קרובים</span>

                    <div id="search-outer-near-kiosk">
                        <input id="search-input-near-kiosk" placeholder="חפש/י קיוסק" type="text" />
                        <div className="fa fa-search"></div>
                    </div>

                </div>

                <div id="signup-outer-near-kiosk">
                    <span id="near-kiosk-span">
                        הצעות
            </span>
                    {this.state.nearKiosksDOM}
                </div>
            </div>
        );
    }
}

NearKiosk.contextType = userContext;
export default NearKiosk;