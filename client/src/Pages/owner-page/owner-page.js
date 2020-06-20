import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../owner-page/owner-page.css"
import { userContext } from "../../utils/fire-base/userContext";
import { NavLink } from "react-router-dom";

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
        // this.context.isLoggedInFunc();
        // const lastActivitiesDataFromServer = this.getLastActivitiesDataFromServer();
        // const remainCachDataFromServer = this.getRemainCashFromServer();
        // this.setState({ remainCash: remainCachDataFromServer.remainCash });
        // this.setState({ lastActivities: [lastActivitiesDataFromServer] });
        // this.setState({ lastActivitiesDOM: this.mapLastActivities(lastActivitiesDataFromServer) })
    }

    // getLastActivitiesDataFromServer() {
    //     return [
    //         {
    //             activity: {
    //                 product: {
    //                     name: 'במבה נוגט',
    //                     price: '1'
    //                 },
    //                 moreDetails: {
    //                     date: '3.3.20',
    //                     location: 'רכישה בקיוסק הוד השרון'
    //                 }
    //             }
    //         },
    //         {
    //             activity: {
    //                 product: {
    //                     name: 'במבה',
    //                     price: '8'
    //                 },
    //                 moreDetails: {
    //                     date: '3.4.20',
    //                     location: 'רכישה בקי'
    //                 }
    //             }
    //         }
    //     ];
    // }

    // getRemainCashFromServer() {
    //     return { remainCash: 15 };
    // }


    render() {
        return (
            <div id="body-owner-page">
                <div id="remain-cash-and-options-owner">
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
                <div id="outer-products-list-owner">

                    <button className="btn btn-light food-btn">
                        <span><img className="product-image-owner" src="images/bread.png" alt="מוצר"/></span>
                        <span className="product-name-owner">לחמים</span>
                    </button>

                    <button className="btn btn-light food-btn">
                        <span><img className="product-image-owner" src="images/milk.png" alt="מוצר"/></span>
                        <span className="product-name-owner">מוצרי חלב</span>
                    </button>

                    <button className="btn btn-light food-btn">
                        <img className="product-image-owner" src="images/apple.png" alt="מוצר"/>
                        <span className="product-name-owner">ירקות ופירות</span>
                    </button>

                    <NavLink to={{ pathname: "Products", state: { category: 'Snack' } }}>
                    <button className="btn btn-light food-btn">
                        <img className="product-image-owner" src="images/ice-cream.png" alt="מוצר"/>
                        <span className="product-name-owner">ממתקים וחטיפים</span>
                    </button>
                    </NavLink>

                    <button className="btn btn-light food-btn">
                        <img className="product-image-owner" src="images/papers.png" alt="מוצר"/>
                        <span className="product-name-owner">טואלט</span>
                    </button>

                    <button className="btn btn-light food-btn">
                        <img className="product-image-owner" src="images/press.png" alt="מוצר"/>
                        <span className="product-name-owner">עיתונים</span>
                    </button>

                </div>
            </div>
        );

    }
}

OwnerHome.contextType = userContext;
export default OwnerHome;

