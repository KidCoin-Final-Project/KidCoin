import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../owner-page/owner-page.css"
import { userContext } from "../../utils/fire-base/userContext";
import { NavLink } from "react-router-dom";
import axios from "axios";

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
        this.context.isLoggedInFunc();
        let userId = localStorage.getItem('userUID');
        let userToken = localStorage.getItem('userToken');
        // const lastActivitiesDataFromServer = this.getPurchaseOfStoreFromServer(userToken);
        // const remainCachDataFromServer = this.getRemainCashFromServer(userToken);
        // console.log(remainCachDataFromServer);
        // console.log(remainCachDataFromServer);

        // this.setState({ remainCash: remainCachDataFromServer.remainCash });
        // this.setState({ purchaseOfStore: remainCachDataFromServer.purchaseOfStore });

        // this.setState({ remainCash: remainCachDataFromServer.remainCash });
        // this.setState({ lastActivities: [lastActivitiesDataFromServer] });
        // this.setState({ lastActivitiesDOM: this.mapLastActivities(lastActivitiesDataFromServer) })
    }

    getLastActivitiesDataFromServer() {
        // return [
        //     {
        //         activity: {
        //             product: {
        //                 name: 'במבה נוגט',
        //                 price: '1'
        //             },
        //             moreDetails: {
        //                 date: '3.3.20',
        //                 location: 'רכישה בקיוסק הוד השרון'
        //             }
        //         }
        //     },
        //     {
        //         activity: {
        //             product: {
        //                 name: 'במבה',
        //                 price: '8'
        //             },
        //             moreDetails: {
        //                 date: '3.4.20',
        //                 location: 'רכישה בקי'
        //             }
        //         }
        //     }
        // ];
    }

    async getRemainCashFromServer(token) {
        const response = await axios.get(
            'http://localhost:8080/purchase/totalRevenue/',
            {
                headers: {'authtoken': token}
            }
        ).catch(error => {
            alert(error);
        });
        return response.data;
        // return { remainCash: 15 };
    }

    async getPurchaseOfStoreFromServer(token) {
        console.log("token: ", token);

        const response = await axios.get(
            'http://localhost:8080/purchase/ofStore/',
            {
                headers: {'authtoken': token}
            }
        ).catch(error => {
            alert(error);
        });
        // console.log("response: ", response);
        //
        // console.log("response.data: ", response.data);

        // response.data.getData(this.sFilter).then(function(result) {
        //     console.log("controller unmatched: ", result);
        // });
        return response.data;
        // return { remainCash: 15 };
    }

    render() {
        return (
            <div id="body-owner-page">
                <div id="remain-cash-and-options-owner">
                    <div id="remain-cash-owner-page">
                        <div className="cash">
                            <span id="amount">{this.state.remainCash}</span>
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

                    <NavLink to={{ pathname: "Products", state: { category: 'Bread' } }}>
                    <button className="btn btn-light food-btn">
                        <span><img className="product-image-owner" src="images/bread.png" alt="מוצר"/></span>
                        <span className="product-name-owner">לחמים</span>
                    </button>
                    </NavLink>

                    <NavLink to={{ pathname: "Products", state: { category: 'Milk' } }}>
                    <button className="btn btn-light food-btn">
                        <span><img className="product-image-owner" src="images/milk.png" alt="מוצר"/></span>
                        <span className="product-name-owner">מוצרי חלב</span>
                    </button>
                    </NavLink>

                    <NavLink to={{ pathname: "Products", state: { category: 'Fruit' } }}>
                    <button className="btn btn-light food-btn">
                        <img className="product-image-owner" src="images/apple.png" alt="מוצר"/>
                        <span className="product-name-owner">ירקות ופירות</span>
                    </button>
                    </NavLink>

                    <NavLink to={{ pathname: "Products", state: { category: 'Snack' } }}>
                    <button className="btn btn-light food-btn">
                        <img className="product-image-owner" src="images/ice-cream.png" alt="מוצר"/>
                        <span className="product-name-owner">ממתקים וחטיפים</span>
                    </button>
                    </NavLink>

                    <NavLink to={{ pathname: "Products", state: { category: 'Drinks' } }}>
                    <button className="btn btn-light food-btn">
                        <img className="product-image-owner" src="images/papers.png" alt="מוצר"/>
                        <span className="product-name-owner">שתייה</span>
                    </button>
                </NavLink>

                    <NavLink to={{ pathname: "Products", state: { category: 'Paper' } }}>
                    <button className="btn btn-light food-btn">
                        <img className="product-image-owner" src="images/press.png" alt="מוצר"/>
                        <span className="product-name-owner">עיתונים</span>
                    </button>
                    </NavLink>

                </div>
            </div>
        );

    }
}

OwnerHome.contextType = userContext;
export default OwnerHome;

