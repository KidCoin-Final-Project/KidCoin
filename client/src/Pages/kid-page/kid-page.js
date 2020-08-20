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

    async componentDidMount() {
        this.context.isLoggedInFunc();
        let childId = sessionStorage.getItem('userUID');
        let userToken = sessionStorage.getItem('userToken');
        const lastActivitiesDataFromServer = await this.getLastActivitiesDataFromServer(childId, userToken);
        const remainCachDataFromServer = await this.getRemainCashFromServer();
        this.setState({remainCash: remainCachDataFromServer});
        this.setState({lastActivities: [lastActivitiesDataFromServer]});
        this.setState({lastActivitiesDOM: this.mapLastActivities(lastActivitiesDataFromServer)})
    }

    async getLastActivitiesDataFromServer(childId, token) {
        const response = await axios.get(
            'http://localhost:8080/purchase/ofChild/',
            {
                headers: { 'authtoken': token },
            }
        ).catch(error => {
            alert(error);
        });
        return response.data;
    }

    async getRemainCashFromServer() {
        const response = await axios.get(
            'http://localhost:8080/auth/userByToken',
            { headers: { 'authtoken': localStorage.getItem('userToken')} }
        ).catch(error => {
            alert(error);
        });
        return response.data.balance;
    }

    mapLastActivities(lastActivities) {
        return lastActivities.map((activity, index) =>
            <div className="activity-kid-page" key={index} >
                <div className="product-kid-page">
                    <span className="cost-kid-page">{activity.price}$</span>
                    <span className="product-name-kid-page">{activity.name}</span>
                </div>
                <div className="more-details-kid-page">
                    <span>{activity.date}</span>
                    <span>{activity.location}</span>
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

