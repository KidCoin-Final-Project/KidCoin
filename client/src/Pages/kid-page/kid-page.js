import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../kid-page/kid-page.css"
import { NavLink } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../utils/fire-base/userContext";

class KidHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remainCash: '',
            lastActivities: [],
            lastActivitiesDOM: []
        };
    }

    componentDidMount() {
        this.context.isLoggedInFunc();
        let childId = sessionStorage.getItem('userUID');
        let userToken = sessionStorage.getItem('userToken');
        const lastActivitiesDataFromServer = this.getLastActivitiesDataFromServer(childId, userToken);
        const remainCachDataFromServer = this.getRemainCashFromServer();
        this.setState({ remainCash: remainCachDataFromServer.remainCash });
        this.setState({ lastActivities: [lastActivitiesDataFromServer] });
        this.setState({ lastActivitiesDOM: this.mapLastActivities(lastActivitiesDataFromServer) })
    }

    getLastActivitiesDataFromServer(childId, token) {
        //  const amit =  await axios.get(
        //     'http://localhost:8080/child/:' + childId,
        //     { headers: { 'authtoken': token } }
        // );

        // return amit.data;

        return [
                {activity: {
                    product: {
                        name: 'במבה נוגט',
                        price: '1',
                        id: 1
                    },
                    moreDetails: {
                        date: '3.3.20',
                        location: 'רכישה בקיוסק הוד השרון'
                    }
                }},
                {activity: {
                    product: {
                        name: 'במבה',
                        price: '8',
                        id: 2
                    },
                    moreDetails: {
                        date: '3.4.20',
                        location: 'רכישה בקי'
                    }
                }}
            ];
    }

    getRemainCashFromServer() {
        return { remainCash: 15 };
    }

    mapLastActivities(lastActivities) {
        return lastActivities.map((activity) =>
            <div className="activity-kid-page" key={activity.activity.product.id} >
                <div className="product-kid-page">
                    <span className="cost-kid-page">{activity.activity.product.price}$</span>
                    <span className="product-name-kid-page">{activity.activity.product.name}</span>
                </div>
                <div className="more-details-kid-page">
                    <span>{activity.activity.moreDetails.date}</span>
                    <span>{activity.activity.moreDetails.location}</span>
                </div>
            </div>
        );
    }

    render() {
        return (
            <userContext.Consumer>
                {user => {
                    return (
                        <div id="body-kid-page">
                            <div id="remain-cash-and-options-kid-page">
                                <div id="remain-cash-kid-page">
                                    <div id="cash-kid-page">
                                        <span id="amount-kid-page">{this.state.remainCash}</span>
                                        <span id="coin">$</span>
                                    </div>
                                    <span>היתרה שלי</span>
                                </div>

                                <NavLink to={{ pathname: "/barcode" }}><button className="btn btn-light selected-button-kid-page"><span>סריקת מוצר</span></button></NavLink>
                                
                                <button className="btn btn-light option-button-kid-page"><span>בקשה להורה</span></button>
                                <NavLink to={{ pathname: "/nearkiosks" }}><button className="btn btn-light option-button-kid-page"><span>חיפוש קיוסק קרוב</span></button></NavLink>
                            </div>
                            <div id="kid-page-outer">
                                <span id="last-activity-span-kid-page">
                                    פעילות אחרונה
        </span>
                                {this.state.lastActivitiesDOM}

                            </div>
                        </div>
                    )
                }}
            </userContext.Consumer>

        );

    }
}

KidHome.contextType = userContext;
export default KidHome;

