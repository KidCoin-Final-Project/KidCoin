import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css"
import "../kid-page/kid-page.css"

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
        const lastActivitiesDataFromServer = this.getLastActivitiesDataFromServer();
        const remainCachDataFromServer = this.getRemainCashFromServer();
        this.setState({ remainCash: remainCachDataFromServer.remainCash });
        this.setState({ lastActivities: [lastActivitiesDataFromServer] });
        this.setState({lastActivitiesDOM: this.mapLastActivities(lastActivitiesDataFromServer)})
    }

    getLastActivitiesDataFromServer() {
        // const response = await axios.get(
        //     'http://localhost:8080/child/:' + this.props.location.state.uid,
        //     { headers: { 'token': this.props.location.state.token } }
        //   );
      
        //   return await response.data;

        // /child/:childID
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

    getRemainCashFromServer(){
        return { remainCash : 15 };
    }

    mapLastActivities(lastActivities){
        return lastActivities.map((activity) =>
        <div className="activity" key={activity.activity.product.id} >
            <div className="product">
                <span className="cost">{activity.activity.product.price}$</span>
                <span className="product-name">{activity.activity.product.name}</span>
            </div>
            <div className="more-details">
                <span>{activity.activity.moreDetails.date}</span>
                <span>{activity.activity.moreDetails.location}</span>
            </div>
        </div>
    );
    }

    render() {
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

                    <button className="btn btn-light selected-button"><span>סריקת מוצר</span></button>
                    <button className="btn btn-light option-button"><span>בקשה להורה</span></button>
                    <button className="btn btn-light option-button"><span>חיפוש קיוסק קרוב</span></button>
                </div>
                <div id="kid-page-outer">
                    <span id="last-activity-span">
                        פעילות אחרונה
        </span>
                    {this.state.lastActivitiesDOM}
                    
                </div>
            </div>
        );

    }
}

export default KidHome;

