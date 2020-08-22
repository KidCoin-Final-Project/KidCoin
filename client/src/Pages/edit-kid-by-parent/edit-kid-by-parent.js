import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../edit-kid-by-parent/edit-kid-by-parent.css"
import TopNavBar from "../../Components/Top-Navbar/top-navbar";
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown} from "semantic-ui-react";
import * as ScanditSDK from "scandit-sdk";
import axios from 'axios';


class EditKidByParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 'No result',
            barcode: '',
            allKiosks: [],
            kioskSelected: [],
            isKioskSelected: false,
            isBarcodeSelected : false,
            show: false,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({kids: this.props.location.state.kid});
        const token = sessionStorage.getItem('userToken');
        this.getAllProduct(token).then(value=>{
            console.log(value);
            this.setState({ allKiosks: EditKidByParent.mapProductToDropdown(value) });
            console.log("work???" + this.state.allKiosks);
        });
        // this.setState({ allKiosks: EditKidByParent.mapProductToDropdown(this.getAllProduct(token)) });
    }

    static mapProductToDropdown(products){
         let map = products.map((product) => ({
            key: product.name,
            value: 1,
            text: product.name
        }));
         console.log("shakin:" + map);
         return map;

    }

    async getAllProduct(token) {
        const response = await axios.get(
            'http://localhost:8080/product/',
            {
                headers: { 'authtoken': token }
            }
        ).catch(error => {
            alert(error);
        });
        return response.data;
    }

    handleChange(evt,e){
        this.setState({ kioskSelected: e.value });
        this.setState({ isKioskSelected : true });
    }

    render() {
        return(
            <div className="body-kidAlergic">
            <div className="remain-cash-and-options-kidAlergic">
                <div className="remain-cash-kidAlergic">
                    <div className="cash-kidAlergic">
                        {/*<img src={"http://localhost:8080/images/" + {this:props.location.state.kid.child.picture}} style={{ "borderRadius": "100%", "height": "7vh", "width": "7vh" }} />*/}
                        {/*<img className="g-kidAlergic" src={"http://localhost:8080/images/" + this.props.location.state.kid.child.picture}  />*/}
                        <img className="g-kidAlergic" src="images/the-beautiful-girl-2.jpg"/>
                    </div>
                    <div>
                        <span className="child-name-text-kidAlergic">{this.props.location.state.kid.child.firstName}</span>
                    </div>
                    <div>
                        <span className="product-name-kidAlergic">יתרה:</span>
                        <span className="product-name-kidAlergic">{this.props.location.state.kid.child.balance} ש"ח </span>
                    </div>
                </div>
            </div>

        <div className="signup-outer-kidAlergic">
            <div className="modal-wrapper-kidAlergic" className="modal">
                <div className="modal-inner-kidAlergic">
                    <div className="zubi-kidAlergic">
                        <h2 className="hara-kidAlergic">הוספת תזונה</h2>
                        <div className="modal-detail-kidAlergic">
                            <div>
                                <span className="category-in-my-ass-kidAlergic">קטגוריה:</span>
                                <select className="category-kidAlergic" name="category">
                                    <option value="volvo-kidAlergic">אלרגיות</option>
                                    <option value="saab-kidAlergic">תפריט</option>
                                    <option value="saab-kidAlergic">הגבלות שבועיות</option>
                                </select>
                            </div>

                            <div>
                                <span className="tamut-kidAlergic">שם הפריט:</span>
                                <input className="register-input-kidAlergic" placeholder="בוטנים / טבעוני" type="text"/>
                            </div>

                            <br/>
                        </div>

                    </div>
                    <div className="cus-emek-kidAlergic">
                        <div>
                            <button className="btn btn-light option-button leshanot-kidAlergic">הוסיפי
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="switch-button-kidAlergic">
                <button className="btn btn-light upper-btn-kidAlergic delete-chile-butto-kidAlergicn">מחק ילד/ה</button>
                <button className="btn btn-light upper-btn-kidAlergic"><span>תזונה</span></button>
            </div>

            <span className="diet-span-kidAlergic">הגבלת מוצרים על הילד/ה</span>
            <div className="activity-kidAlergic">
                <div className="fuck-kidAlergic">
                    <button className="btn btn-light option-button-kidAlergic"><span>קולה</span><span>x</span></button>
                    <button className="btn btn-light option-button-kidAlergic"><span>ספרייט</span><span>x</span></button>
                    <button className="btn btn-light option-button-kidAlergic"><span>שוקולד</span><span>x</span></button>
                </div>
                {/*<button className="btn btn-light add-button-kidAlergic"*/}
                {/*        variant="primary" onClick={this.handleShow}><span>הוספה</span><span>+</span>*/}
                {/*</button>*/}

                <Dropdown placeholder='הוסף מוצרים'
                          fluid
                          multiple
                          selection
                          options={this.state.allKiosks}
                          value={this.state.kioskSelected}
                          onChange={this.handleChange} />
            </div>

            { this.state.isKioskSelected &&
            <div className="item"><Button>בצע רכישה</Button></div>
            }
        </div>
        </div>


    );
    }
}

export default EditKidByParent;

