import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "./charge-money.css"
import { userContext } from "../../utils/fire-base/userContext";

class ChargeMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
            // lastActivities: [],
            // lastActivitiesDOM: []
        };
    }

    componentDidMount() {
        // this.context.isLoggedInFunc();
        // let childId = this.context.uid;
        // let userToken = this.context.userToken;
        // const lastActivitiesDataFromServer = this.getLastActivitiesDataFromServer(childId, userToken);
        // const remainCachDataFromServer = this.getRemainCashFromServer();
        // this.setState({ remainCash: remainCachDataFromServer.remainCash });
        // this.setState({ lastActivities: [lastActivitiesDataFromServer] });
        // this.setState({ lastActivitiesDOM: this.mapLastActivities(lastActivitiesDataFromServer) })
    }

    render() {
        const toggleResults = () =>  this.setState({ showModal: !this.state.showModal });
        const Modal = () => (
            <div className="modal-wrapper" id="modal" style={{'display':'block'}}>
                <div className="close-modal-button-separate"
                     id="close-modal-button-separate"
                     onClick={toggleResults} style={{'display': 'block'}}></div>
                <div className="modal-inner">
                    <div className="ask-outer">
                        <h2 className="ask-h2">בקשה חדשה</h2>
                        <div className="modal-detail">
                            <div>
                                <span className="for-span">לכבוד:</span>
                                <input className="register-input" placeholder="אמא / אבא / שניהם"
                                       type="text"/>
                            </div>

                            <div>
                                <span className="what-is-amount-span">מה הסכום המבוקש?</span>
                                <input className="amount-input" type="text"/>
                            </div>

                            <div className="rateYo"></div>
                            <br/>
                            <span className="details-span">פירוט:</span>
                            <input className="details-input" type="text"/>
                        </div>

                    </div>
                    <div className="send-button-outer">
                        <div>
                            <button className="btn btn-light option-button send-button">שלחי
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

        return (
                        <div id="body-charge-money-page">
                            {this.state.showModal ? <Modal/>: null}
                            <div className="chat-panel">
                                <div className="you-payed">
                                    <span className="right"><b>שילמת 58 שקלים</b></span>
                                    <span className="right font-size-2vh">התשלום עבר ב19.5</span>
                                    <span className="right font-size-2vh">12:00</span>
                                </div>
                                <span className="date-separator">24 במאי</span>

                                <div className="asked-you">
                                    <span className="right"><b>ביקשו ממך 60 שקלים</b></span>
                                    <span className="right font-size-2vh">12:00</span>
                                </div>

                                <div className="you-payed">
                                    <span className="right"><b>שילמת 60 שקלים</b></span>
                                    <span className="right font-size-2vh">התשלום עבר ב25.5</span>
                                    <span className="right font-size-2vh">12:21</span>
                                </div>

                                <span className="date-separator">9 ביוני</span>

                                <div className="asked-you-with-pay-option">
                                    <div className="asked-you-inner">
                                        <span className="right"><b>ביקשו ממך 66 שקלים</b></span>
                                        <span className="right font-size-2vh">11:59</span>
                                    </div>
                                    <span className="tap-to-pay">לחץ לתשלום</span>
                                </div>

                                <div className="asked-you">
                                    <span className="right"><b>ביקשו ממך 60 שקלים</b></span>
                                    <span className="right font-size-2vh">12:00</span>
                                </div>

                                <div className="asked-you">
                                    <span className="right rtl">תאשר רק את השני!</span>
                                    <span className="right font-size-2vh">12:00</span>
                                </div>

                                <div className="you-payed">
                                    <span className="right"><b>שילמת 60 שקלים</b></span>
                                    <span className="right font-size-2vh">התשלום עבר ב10.6</span>
                                    <span className="right font-size-2vh">12:19</span>
                                </div>

                            </div>
                            <div className="bottom-interface">
                                <div className="pay-or-ask">
                                    <button className="pay-or-ask-button" onClick={toggleResults}>
                                        בקש
                                    </button>
                                    <button className="pay-or-ask-button">
                                        שלם
                                    </button>
                                </div>

                                <div>
                                    <input className="chat-input" defaultValue="רציתי להגיד ש..." type="text"/>
                                        <a className="fa fa-send send-icon"></a>
                                </div>
                            </div>
                        </div>

        );

    }
}

ChargeMoney.contextType = userContext;
export default ChargeMoney;

