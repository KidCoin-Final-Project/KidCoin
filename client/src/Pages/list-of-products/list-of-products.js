import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../list-of-products/list-of-products.css"
import { userContext } from "../../utils/fire-base/userContext";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class ListProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // componentDidMount() {
    //     if (this.props.location.state !== undefined) {
    //         const productsByCategoryFromServer = this.getProductsByCategoryFromServer(this.props.location.state.category, localStorage.getItem('userToken'));
    //         this.setState({ products: [productsByCategoryFromServer] });
    //         //  this.setState({ productsDOM: this.mapProducts(productsByCategoryFromServer) });
    //     }
    // }

    // async getProductsByCategoryFromServer(category, token) {
    //     const response = await axios.get(
    //         'http://localhost:8080/product/byCategory',
    //         {
    //             headers: { 'authtoken': token },
    //             params: {
    //                 category: category
    //             }
    //         }
    //     ).catch(error => {
    //         alert(error);
    //     });

    //     return response.data;
    // }

    // getRemainCashFromServer() {
    //     return { remainCash: 15 };
    // }

    // mapProducts(lastActivities) {
    //     return lastActivities.map((activity) =>
    //         <div className="activity-kid-page" key={activity.activity.product.id} >
    //             <div className="product-kid-page">
    //                 <span className="cost-kid-page">{activity.activity.product.price}$</span>
    //                 <span className="product-name-kid-page">{activity.activity.product.name}</span>
    //             </div>
    //             <div className="more-details-kid-page">
    //                 <span>{activity.activity.moreDetails.date}</span>
    //                 <span>{activity.activity.moreDetails.location}</span>
    //             </div>
    //         </div>
    //     );
    // }

    render() {
        return (
            <div id="body-list-products">
                <div id="search-kiosk-outer-list-products">
                    <span id="near-kiosk-span-list-products">ממתקים וחטיפים</span>
                </div>
                <div id="remain-cash-and-options-list-products">
                    <NavLink to={{ pathname: "NewProduct", state: {} }}>
                        <button className="btn btn-light option-button-list-products"><span>הוסף מוצר חדש</span></button>
                    </NavLink>
                </div>

                <div id="outer-products-list">
                    <div className="product-list-products">
                    <NavLink to={{ pathname: "Product", state: { category: 'Snack' } }}>
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        </NavLink>
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product-list-products">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product-list-products">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product-list-products">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product-list-products">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product-list-products">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product-list-products">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product-list-products">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product-list-products">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product-list-products">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                    <div className="product-list-products">
                        <img className="product-image-list-products" src="images/bisli.jpg" />
                        <span className="product-name-list-products">ביסלי גריל</span>
                        <span> ב.ק. 1.5</span>
                    </div>
                </div>
            </div>
        );

    }
}

ListProducts.contextType = userContext;
export default ListProducts;

