import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../owner-page/owner-page.css"

class OwnerHome extends Component {
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
        this.setState({ lastActivitiesDOM: this.mapLastActivities(lastActivitiesDataFromServer) })
    }

    getLastActivitiesDataFromServer() {
        return [
            {
                activity: {
                    product: {
                        name: 'במבה נוגט',
                        price: '1'
                    },
                    moreDetails: {
                        date: '3.3.20',
                        location: 'רכישה בקיוסק הוד השרון'
                    }
                }
            },
            {
                activity: {
                    product: {
                        name: 'במבה',
                        price: '8'
                    },
                    moreDetails: {
                        date: '3.4.20',
                        location: 'רכישה בקי'
                    }
                }
            }
        ];
    }

    getRemainCashFromServer() {
        return { remainCash: 15 };
    }

    mapLastActivities(lastActivities) {
        return lastActivities.map((activity) =>
            <div className="activity">
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
            <div id="body-owner-page">
                <div id="remain-cash-and-options">
                    <div id="remain-cash-owner-page">
                        <div className="cash">
                            <span id="amount">430</span>
                            <span id="coin">$</span>
                        </div>
                        <span>סך ההכנסות</span>
                    </div>

                    <div id="remain-Transactions-owner-page">
                        <div className="cash">
                            <span id="Transactions">235</span>
                        </div>
                        <span>עסקאות בוצעו</span>
                    </div>
                </div>
                <button className="btn btn-light option-button"><span>פירוט עסקאות</span></button>
                <div id="outer-products-list">

                    <button className="btn btn-light food-btn">
                        <span><img className="product-image" src="images/bread.png" /></span>
                        <span className="product-name">לחמים</span>
                    </button>

                    <button className="btn btn-light food-btn">
                        <span><img className="product-image" src="images/milk.png" /></span>
                        <span className="product-name">מוצרי חלב</span>
                    </button>

                    <button className="btn btn-light food-btn">
                        <img className="product-image" src="images/apple.png" />
                        <span className="product-name">ירקות ופירות</span>
                    </button>

                    <button className="btn btn-light food-btn">
                        <img className="product-image" src="images/ice-cream.png" />
                        <span className="product-name">ממתקים וחטיפים</span>
                    </button>

                    <button className="btn btn-light food-btn">
                        <img className="product-image" src="images/papers.png" />
                        <span className="product-name">טואלט</span>
                    </button>

                    <button className="btn btn-light food-btn">
                        <img className="product-image" src="images/press.png" />
                        <span className="product-name">עיתונים</span>
                    </button>

                </div>
            </div>
        );

    }
}

export default OwnerHome;

