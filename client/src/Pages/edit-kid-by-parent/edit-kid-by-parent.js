import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../edit-kid-by-parent/edit-kid-by-parent.css"
import TopNavBar from "../../Components/Top-Navbar/top-navbar";

class EditKidByParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    getLastActivitiesDataFromServer(childId, token) {
    }

    render() {
        return(
            <div className="body-kidAlergic">
            <div className="remain-cash-and-options-kidAlergic">
                <div className="remain-cash-kidAlergic">
                    <div className="cash-kidAlergic">
                        <img className="g-kidAlergic" src="images/the-beautiful-girl-2.jpg"/>
                    </div>
                    <div>
                        <span className="child-name-text-kidAlergic">שקד מיוחדת </span>
                    </div>
                    <div>
                        <span className="product-name-kidAlergic">יתרה:</span>
                        <span className="product-name-kidAlergic">1.5</span>
                        <span className="product-name-kidAlergic">ביטקוין</span>
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
                <button className="btn btn-light add-button-kidAlergic"
                        onClick="openModal('modal', 'close-modal-button-separate')"><span>הוספה</span><span>+</span>
                </button>
            </div>

        </div>
        </div>
    );
    }
}


// KidHome.contextType = userContext;
export default EditKidByParent;

