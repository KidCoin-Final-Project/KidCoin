import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../new-product/new-product.css"
import {userContext} from "../../utils/fire-base/userContext";
import axios from "axios";

class NewProduct extends Component {
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
            barcode: '',
            file: null
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
        this.handleMoneyChange = this.handleMoneyChange.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.handleBarcodeChange = this.handleBarcodeChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleBarcodeChange(event) {
        this.setState({barcode: event.target.value});
    }

    handleMoneyChange(event) {
        this.setState({money: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    handleIngredientsChange(event) {
        this.setState({ingredients: event.target.value});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handlePictureChange(event) {
        this.setState({file: event.target.files[0]});
    }

    async componentDidMount() {
        let response2 = await axios.get(
            'http://localhost:8080/store/allStores',
            {
                headers: { 'authtoken': sessionStorage.getItem('userToken'), 'content-type': 'multipart/form-data'},
            }
        );

        let store = response2.data.filter(store => store.ownerId === sessionStorage.userUID);
        sessionStorage.setItem('storeId', store[0].storeId);
    }

    mySubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        const config = {
            headers: {
                'authtoken': sessionStorage.getItem('userToken'), 'content-type': 'multipart/form-data'
            }
        };
        await axios.post('http://localhost:8080/product/addImage', formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });

        let response = await axios.post(
            'http://localhost:8080/product/addProduct',
            {
                headers: {'authtoken': sessionStorage.getItem('userToken'), 'content-type': 'multipart/form-data'},
                params: {
                    name: this.state.name,
                    category: sessionStorage.getItem('category'),
                    ingredients: this.state.ingredients,
                    picture: this.state.picture,
                    description: this.state.description
                }
            }
        );
        sessionStorage.setItem('productID', response.data);

        let response3 = await axios.post(
            'http://localhost:8080/productsInStore/',
            {
                headers: { 'authtoken': sessionStorage.getItem('userToken'), 'content-type': 'multipart/form-data'},
                params: {
                    storeId: sessionStorage.getItem('storeId'),
                    price: this.state.money,
                    productID: sessionStorage.getItem('productID')
                }
            }
        );

        window.location.href = '/#/Product';
    };

    onChange(e) {
        this.setState({
            file: e.target.files[0],
            picture: e.target.value
        });
    }

    render() {
        return (
            <div className="signup-outer-register-page hide-element" id="kid-section">
                <form onSubmit={this.mySubmitHandler} id='form' data-name="form" encType="multipart/form-data"
                      name="form" className="register-form" action="http://localhost:8080/product/addProduct"
                      method="post">
                    <input onChange={this.handleNameChange} id="name" name="name" data-name="name"
                           className="register-input" placeholder="שם המוצר" type="text"/>
                    <input onChange={this.handleMoneyChange} id="money" name="money" className="register-input"
                           placeholder="מחיר" type="text"/>
                    <input onChange={this.handleBarcodeChange} id="barcode" name="barcode" className="register-input"
                           placeholder="ברקוד מוצר" type="text"/>
                    <input onChange={this.handleIngredientsChange} id="ingredients" name="ingredients"
                           className="more-details" placeholder="רכיבים" type="text"/>
                    <input onChange={this.handleDescriptionChange} id="description" name="description"
                           className="more-details" placeholder="פירוט נוסף" type="text"/>
                    <label htmlFor="img" className="product-pic">תמונת מוצר</label>
                    <input onChange={this.onChange} id="myImage" className="img" type="file" name="myImage"/>
                    <button className="btn btn-light register-submit-button" type="submit">שלח</button>
                </form>
            </div>

        );

    }
}

NewProduct.contextType = userContext;
export default NewProduct;

