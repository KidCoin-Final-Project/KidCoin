import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../near-kiosk/near-kiosk.css';
import axios from "axios";
import { userContext } from "../utils/fire-base/userContext";



class NearKiosk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: ''
        };
    }

    componentDidMount() {
        this.context.isLoggedInFunc();
        var that = this;
        this.setState({ userToken: this.context.userToken });
        if ("geolocation" in navigator) {
            const coords =  navigator.geolocation.getCurrentPosition(
                function (position) {
                    that.setState({ nearKiosks : that.getNearKiosksFromServer(coords, that.state.userToken)});
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
            'http://localhost:8080/byLocation',
            {
                headers: { 'authtoken': token },
                params: {
                    longitude: coords.longitude,
                    latitude: coords.latitude,
                    maxDistanceInMeters: 9999999
                }
            }
        );

        return await nearKiosks.data;
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
                    <div className="activity">
                        <div className="product">
                            <span className="cost">נווט/י לשם</span>
                            <span className="product-name">הקיוסק המקורי</span>
                        </div>
                        <div className="more-details">
                            <span>800 מטר</span>
                            <span>עולי ציון 8, הוד השרון</span>
                        </div>
                    </div>
                    <div className="activity">
                        <div className="product">
                            <span className="cost">נווט/י לשם</span>
                            <span className="product-name">הקיוסק המקורי</span>
                        </div>
                        <div className="more-details">
                            <span>800 מטר</span>
                            <span>עולי ציון 8, הוד השרון</span>
                        </div>
                    </div>
                    <div className="activity">
                        <div className="product">
                            <span className="cost">נווט/י לשם</span>
                            <span className="product-name">הקיוסק המקורי</span>
                        </div>
                        <div className="more-details">
                            <span>800 מטר</span>
                            <span>עולי ציון 8, הוד השרון</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NearKiosk.contextType = userContext;
export default NearKiosk;