import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../product/product.css";
import { userContext } from "../../utils/fire-base/userContext";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";


class Review extends Component {
    state = {
        rating: 0,
        place: "",
        comment: "",
        dateString: ""
    };

    componentDidMount() {
    }

    render() {
        return <div className="activity-product">
            <div className="more-details-product">
                <StarRatingComponent
                    name="bamba"
                    editing={false}
                    starCount={5}
                    value={this.props.rating}
                />
                <span>{this.props.place}</span>
            </div>
            <div className="more-details-product">
                <span>{this.props.dateString}</span>
                <span>{this.props.comment}</span>
            </div>
        </div>;
    }
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            description: "",
            ingredients: "",
            money: "0",
            picture: "",
            productID: "",
            file: null,
            reviews: []
        };
    }

    async getProductsByIDFromServer(productId, token) {
        const response = await axios.get(
            'http://localhost:8080/product/byId/' + productId,
            {
                headers: { 'authtoken': token },
                params: {
                    productID: productId
                }
            }
        ).catch(error => {
            alert(error);
        });
        return response.data;
    }

    async getProductReviewFromServer(productId, token) {
        const response = await axios.get(
            'http://localhost:8080/productReview/' + productId,
            {
                headers: { 'authtoken': token },
                params: {
                    productID: productId
                }
            }
        ).catch(error => {
            alert(error);
        });
        return response.data;
    }

    async componentDidMount() {
        this.setState({productID: localStorage.getItem('productID')})
        const productByIDFromServer = await this.getProductsByIDFromServer(localStorage.getItem('productID'), localStorage.getItem('userToken'));
        const productReviews = await this.getProductReviewFromServer(localStorage.getItem('productID'), localStorage.getItem('userToken'));
        this.setState({
            name: productByIDFromServer.name,
            category: productByIDFromServer.category,
            ingredients: productByIDFromServer.ingredients,
            picture: "http://localhost:8080/images/" + productByIDFromServer.picture,
            description: productByIDFromServer.description,
            money: productByIDFromServer.money,
            productID: productByIDFromServer.productID,
            reviews: productReviews
        })
        // this.setState({products: productsByCategoryFromServer});
    }



    render() {
        return (
            <div id="body-product">
                <div id="remain-cash-and-options-product">
                    <div id="remain-cash-product">
                        <div id="cash-product">
                            <span id="titleText-product">{this.state.name}</span>
                        </div>

                    </div>


                </div>
                <div className="signup-outer-product">

                    <div className="product-product">
                        <img className="product-image-product" src={this.state.picture} />
                        <div>
                            <span className="product-name-product">מחיר בחנות: </span>
                            <span className="product-name-product">{this.state.money}</span>
                            <span className="product-name-product"> שקלים </span>
                        </div>

                        <div id="ingredientsText-product">
                            <span id="ingredientsTitleText-product"> רכיבים: </span>
                            <span>{this.state.ingredients}</span>
                        </div>
                    </div>

                </div>

                <div className="comment-outer-product">
                    <span id="last-activity-span-product">
                        ביקורת אחרונה על המוצר
        </span>
                    {this.state.reviews.map((review,index) =>
                        <Review key={index}
                                  place={review.place} dateString={review.dateString} rating={review.rating} comment={review.comment} />
                    )}
                </div>
            </div>
        );

    }
}

Product.contextType = userContext;
export default Product;