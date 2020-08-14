import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../new-product/new-product.css"
import { userContext } from "../../utils/fire-base/userContext";
import TopNavBar from "../../Components/Top-Navbar/top-navbar";
import {Field} from "formik";

class NewProduct extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="signup-outer-register-page hide-element" id="kid-section">
                <form className="register-form">
                    <div className="col-auto my-1">
                        <select className="custom-select mr-sm-2 category" id="inlineFormCustomSelect">
                            <option selected>קטגוריה</option>
                            <option value="milk">מוצרי חלב</option>
                            <option value="bread">לחמים</option>
                            <option value="candy">ממתקים</option>
                            <option value="fruit">פירות וירקות</option>
                            <option value="paper">עיתונים</option>
                            <option value="toalet">טואלט</option>
                        </select>
                    </div>
                    <input name="name" className="register-input" placeholder="שם המוצר" type="text"/>
                    <input name="price" className="register-input" placeholder="מחיר" type="text"/>
                    <input name="barcode" className="register-input" placeholder="ברקוד מוצר" type="text"/>
                    <input name="more-detail" className="more-details" placeholder="פירוט נוסף" type="text"/>
                    <label htmlFor="img" className="product-pic">תמונת מוצר</label>
                    <input className="img" type="file" id="img" name="img" accept="image/*"/>
                    <button className="btn btn-light register-submit-button" type="submit" >שלח</button>
                </form>
            </div>

        );

    }
}

NewProduct.contextType = userContext;
export default NewProduct;

