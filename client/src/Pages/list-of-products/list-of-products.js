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
            products: []
        };
    }

    async componentDidMount() {
        const productsByCategoryFromServer = await this.getProductsByCategoryFromServer(this.props.location.state.category, localStorage.getItem('userToken'));
        this.setState({products: productsByCategoryFromServer});
    }

    async getProductsByCategoryFromServer(category, token) {
        const response = await axios.get(
            'http://localhost:8080/product/byCategory/'+category,
            {
                headers: { 'authtoken': token },
                params: {
                    category: category
                }
            }
        ).catch(error => {
            alert(error);
        });
        return response.data;
    }


    render() {
        const ProductsList = (props) => {
            const products = props.products;
            const listItems = products.map((product) =>
                <NavLink to={{ pathname: "Product",  state: { category: product.productID} }}>
                <div className="product-list-products">
                    <img className="product-image-list-products" src={"http://localhost:8080/images/" + product.picture} />
                    <span className="product-name-list-products">{product.name}</span>
                    <span>{product.money} ש"ח </span>
                </div>
                </NavLink>
            );
            return (
                <div id="outer-products-list">{listItems}</div>
            );
        }
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
                        <ProductsList products={this.state.products} />
            </div>


        );

    }
}

ListProducts.contextType = userContext;
export default ListProducts;

