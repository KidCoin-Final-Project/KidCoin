import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "../parent-page/parent-page.css"
import { NavLink } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../utils/fire-base/userContext";

class ParentHome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        // this.context.isLoggedInFunc();
    //     var el = React.findDOMNode(this.refs.rateyo);
    // $(el).rateYo({ 
    //   rating: this.state.rating,
    //   onSet: function(rating) {
    //     this.setState({rating: rating});
    //   }.bind(this)
    // });
    }

    getLastActivitiesDataFromServer(childId, token) {

    }

    getRemainCashFromServer() {
    }

    mapLastActivities(lastActivities) {

    }


    render() {
        return (
            <div className="body-parent">

                <div id="parent-outer">
                    <div className="modal-wrapper" id="modal">
                        <div className="close-modal-button-separate"
                            id="close-modal-button-separate"
                             onClick={(function(){
                                 document.getElementById("modal").classList.add("close");

                                 document.getElementById("modal").classList.remove("open");
                                 document.getElementById('close-modal-button-separate').classList.remove("open");
                                 document.getElementById('close-modal-button-separate').classList.add("close");
                             })}></div>
                        <div className="modal-inner">
                            <div className="product-rate">
                                <h2 style={{"color": "#00be92"}}>דירוג מוצר</h2>
                                <div className="do-center">
                                    <span style={{color: "black", fontSize: "3vh"}}>במבה נוגט</span>
                                    <span style={{"color": "black", fontSize: "3vh"}}>קיוסק הראשון בשרון</span>
                                    <div ref="rateYo"></div>
                                    <br />
                                    <span style={{"color": "black", "direction": "rtl", fontSize: "3vh"}}>פירוט:</span>
                                    <input style={{"border": "5px solid #00be92", "height": "10vh", "width": "30vh"}} type="text" />
                                </div>

                            </div>
                            <div className="rate">
                                <div>
                                    <div className="btn btn-light option-button" style={{"display": "flex", "width": "fit-content",
                                        "height": "4vh", "align-items": "center"}}><span style={{"font-size":"2vh"}}>טען כסף </span></div>                                </div>
                            </div>
                        </div>
                    </div>

                    <span style={{fontSize: "4vh", "color": "white", "textAlign": "right"}}>הילדים שלי</span>

                    <div className="kid-box">
                        <div className="kid-info">
                            <a className="fa fa-edit"></a>

                            <div className="kid-specific">
                                <span style={{fontWeight: "bold", "font-size":"3vh"}}>הילה, בת 11</span>
                                <span style={{"font-size": "2vh"}}>הגבלות: בוטנים, חלב, סויה</span>
                            </div>
                            <div className="kid-image">
                                <img src="/images/alon-face.png" style={{"borderRadius": "100%","height": "7vh","width": "7vh"}}/>
                            </div>
                        </div>
                        <div className="kid-money">
                            <div className="btn btn-light option-button" style={{"display": "flex", "width": "fit-content",
                                "height": "4vh", "align-items": "center"}}><span style={{"font-size":"2vh"}}>טען כסף </span>
                </div>

                            <span style={{fontSize: "3vh"}}>יתרה: 8 שקלים</span>
                        </div>
                    </div>
                    <div className="kid-box">
                        <div className="kid-info">
                            <a className="fa fa-edit"></a>

                            <div className="kid-specific">
                                <span style={{fontWeight: "bold", "font-size":"3vh"}}>הילה, בת 11</span>
                                <span style={{fontSize: "2vh"}}>הגבלות: בוטנים, חלב, סויה</span>
                            </div>
                            <div className="kid-image">
                                <img src="/images/alon-face.png" style={{"borderRadius": "100%",
    "height": "7vh",
    "width": "7vh"}}/>
                            </div>
                        </div>
                        <div className="kid-money">
                            <div className="btn btn-light option-button" style={{"display": "flex", "width": "fit-content",
                                "height": "4vh", "align-items": "center"}}><span style={{"font-size":"2vh"}}>טען כסף </span>
                            </div>

                            <span style={{fontSize: "3vh"}}>יתרה: 8 שקלים</span>
                        </div>
                    </div>
                </div>

                <div id="signup-outer-parent" style={{fontSize: "4vh"}}>
                    <div className="kids-names">
                        <div className="kid-element"> חן</div>
                         <div style={{"width": "50%", "color": "#b0b0b0", "border-bottom": "5px solid #b0b0b0", "textAlign": "center"}}> הילה</div>
                    </div>

                    <div className="activity">
                        <div className="product">
                            <span className="cost">1$</span>
                            <span className="product-name">במבה נוגט</span>
                        </div>
                        <div className="more-details">
                            <span>3.3.20</span>
                            <span>רכישה בקיוסק הוד השרון</span>
                        </div>
                        <div style={{"display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between"}}>
                            <div className="btn btn-light selected-button"
                                onClick={(function(){
                                    document.getElementById("modal").classList.add("open");

                                    document.getElementById("modal").classList.remove("close");
                                    document.getElementById('close-modal-button-separate').classList.remove("close");
                                    document.getElementById('close-modal-button-separate').classList.add("open");
                                })}
                                style={{display: "flex", width: "fit-content", height: "3vh", "align-items":"center"}}><span style={{"font-size": "2vh"}}>דרג מוצר</span>
                </div>
                            <div className="rateYo"></div>
                        </div>
                    </div>

                    <div className="activity">
                        <div className="product">
                            <span className="cost">1$</span>
                            <span className="product-name">במבה נוגט</span>
                        </div>
                        <div className="more-details">
                            <span>3.3.20</span>
                            <span>רכישה בקיוסק הוד השרון</span>
                        </div>
                        <div className="rating-stars">
                            <div className="btn btn-light selected-button"
                                 onClick={(function(){
                                     document.getElementById("modal").classList.add("open");

                                     document.getElementById("modal").classList.remove("close");
                                     document.getElementById('close-modal-button-separate').classList.remove("close");
                                     document.getElementById('close-modal-button-separate').classList.add("open");
                                 })}
                                 style={{display: "flex", width: "fit-content", height: "3vh", "align-items":"center"}}><span style={{"font-size": "2vh"}}>דרג מוצר</span>
                            </div>
                            <div className="rateYo"></div>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}

ParentHome.contextType = userContext;
export default ParentHome;

