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
            kiosksDOM: '',
            currentCords:'',
            allKiosks: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    componentDidMount() {
        this.context.isLoggedInFunc();
        var that = this;
        this.setState({ userToken: localStorage.getItem('userToken') });
        this.getAllKiosks(localStorage.getItem('userToken'));
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
        this.setState({ kiosksDOM: this.convertKiosksToDOM(this.state.nearKiosks)});
    }

    async getAllKiosks(token) {
        const allKiosks = await axios.get(
            'http://localhost:8080/store/allStores',
            {
                headers: { 'authtoken': token }
            }
        );

        this.setState({ allKiosks: await allKiosks.data });
    }

    convertKiosksToDOM(nearKiosks) {
        return nearKiosks.map((kiosk) =>
            <div className="activity" key={kiosk.address}>
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

    handleNameChange(evt){//search
        let KioskToSearch = evt.target.value;

        if(KioskToSearch !== ''){
            let matches = this.state.allKiosks.filter(kiosk => kiosk.name.includes(KioskToSearch));

            this.setState({ kiosksDOM: this.convertKiosksToDOM(matches)});
        } else{
            this.setState({ kiosksDOM: this.convertKiosksToDOM(this.state.nearKiosks)});
        }
        
    } 


    render() {
        return (
            <div className="body-near">
                <div id="search-kiosk-outer">
                    <span id="near-kiosk-span">קיוסקים קרובים</span>

                    <div id="search-outer-near-kiosk">
                        <input id="search-input-near-kiosk" onChange={this.handleNameChange} placeholder="חפש/י קיוסק" type="text" />
                        <div className="fa fa-search"></div>
                    </div>

                </div>

                <div id="signup-outer-near-kiosk">
                    <span id="near-kiosk-span">
                        הצעות
            </span>
                    {this.state.kiosksDOM}
                </div>
            </div>
        );
    }
}

NearKiosk.contextType = userContext;
export default NearKiosk;