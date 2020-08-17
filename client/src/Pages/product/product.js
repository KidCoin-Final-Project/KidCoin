import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../product/product.css";
import { userContext } from "../../utils/fire-base/userContext";
import { NavLink } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remainCash: '',
            lastActivities: [],
            lastActivitiesDOM: []
        };
    }

    async componentDidMount() {
        // const productsByCategoryFromServer = await this.getProductsByCategoryFromServer(this.props.location.state.category, localStorage.getItem('userToken'));
        // this.setState({products: productsByCategoryFromServer});
    }

    // async getProductsByCategoryFromServer(productId, token) {
    //     const response = await axios.get(
    //         'http://localhost:8080//product/byId/' + productId,
    //         {
    //             headers: { 'authtoken': token },
    //             params: {
    //                 category: productId
    //             }
    //         }
    //     ).catch(error => {
    //         alert(error);
    //     });
    //     return response.data;
    // }

    render() {
        // const ProductsList = (props) => {
        //     const products = props.products;
        //     const listItems = products.map((product) =>
        //         <NavLink to={{ pathname: "Product",  state: { category: product.productID} }}>
        //             <div className="product-list-products">
        //                 <img className="product-image-list-products" src="images/bisli.jpg" />
        //                 <span className="product-name-list-products">{product.name}</span>
        //                 <span>{product.money} ש"ח </span>
        //             </div>
        //     );
        //     return (
        //         <div id="outer-products-list">{listItems}</div>
        //     );
        // }


        return (
            <div id="body-product">
                <div id="remain-cash-and-options-product">
                    <div id="remain-cash-product">
                        <div id="cash-product">
                            <span id="titleText-product">דף מוצר</span>
                        </div>
                        <div>
                            <span id="emptyProductText-product">סמן כמוצר חסר</span>
                        </div>

                    </div>


                </div>
                <div className="signup-outer-product">

                    <div className="product-product">
                        <img className="product-image-product" src="images/bisli.jpg" />
                        <div>
                            <span className="product-name-product">מחיר בחנות:</span>
                            <span className="product-name-product">1.5</span>
                            <span className="product-name-product">ביטקוין</span>
                        </div>

                        <div id="ingredientsText-product">
                            <span id="ingredientsTitleText-product">רכיבים:</span>
                            <span> קמח חיטה (מכיל גלוטן) (72%), שמנים מהצומח, שמרים מיובשים, מלח,
                            סוכרים, הידרוליזט חלבון סויה, מחזקי טעם (מונוסודיום גלוטמט, E627, E631),
            עמילן אורז, תבלינים, חומרי טעם וריח, חלבון סויה, חומר מעכב חמצון (תמצית רוזמרין). </span>
                        </div>
                    </div>

                </div>

                <div className="comment-outer-product">
                    <span id="last-activity-span-product">
                        ביקורת אחרונה על המוצר
        </span>
                    <div className="activity-product">
                        <div className="more-details-product">
                        <StarRatingComponent
                                name="bamba"
                                editing={false}
                                starCount={5}
                                value={2}
                            />
                            <span>ציפורה כהן</span>
                        </div>
                        <div className="more-details-product">
                            <span>3.3.20</span>
                            <span>מלא מונוסודיום גלוטומט!</span>
                        </div>
                    </div>
                    <div className="activity-product">
                        <div className="more-details-product">
                        <StarRatingComponent
                                name="bamba"
                                editing={false}
                                starCount={5}
                                value={4}
                            />
                            <span>שקד דונל</span>
                        </div>
                        <div className="more-details-product">
                            <span>3.3.20</span>
                            <span>מלא מלחים ושמנים לא טובים</span>
                        </div>
                    </div>
                    <div className="activity-product">
                        <div className="more-details-product">
                            <span>3.3.20</span>
                            <span>שרון הראשון</span>
                        </div>
                        <div className="more-details-product">
                        <StarRatingComponent
                                name="bamba"
                                editing={false}
                                starCount={5}
                                value={5}
                            />
                            <span>טעים מאוד!</span>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

Product.contextType = userContext;
export default Product;