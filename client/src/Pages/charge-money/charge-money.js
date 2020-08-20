import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "./charge-money.css"
import { userContext } from "../../utils/fire-base/userContext";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";


class Request extends Component {
    state = {
    };

    componentDidMount() {
    }

    async payForKid(uid, transId){
        alert(uid);
        let userToken = localStorage.getItem('userToken')
        alert(userToken);
        const response = await axios.put(
            'http://localhost:8080/moneyRequest/accept/'+ uid,
            { headers: { 'authtoken': userToken},
                params: {
                    reqId: uid,
                    transId: transId
                }}
        );
        alert(JSON.stringify(response))
        return response;
    }

    render() {
        if (this.props.accepted) {
            return <div style={{'display': 'flex'}}><div className="asked-you">
                <span className="right"><b>ביקשו ממך {this.props.amount} שקלים</b></span>
                <span className="right font-size-2vh">{this.props.date}</span>
                </div>
                <div className="you-payed">
                <span className="right"><b>שילמת {this.props.amount} שקלים</b></span>
                <span className="right font-size-2vh">{this.props.date}</span>
            </div>
            </div>
        }
        return <div className="asked-you-with-pay-option">
            <div className="asked-you-inner">
                <span className="right"><b>ביקשו ממך {this.props.amount} שקלים</b></span>
                <span className="right font-size-2vh">{this.props.date}</span>
            </div>
            <span className="tap-to-pay" onClick={this.payForKid.bind(this, this.props.uid, 'aaaa')}>לחץ לתשלום</span>
        </div>;
    }
}

class ChargeMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            requestsForParent: []
        };
    }

    async getRequestsForParentFromServer(chatChildId){
        const response = await axios.get(
            'http://localhost:8080/moneyRequest/getAllForParent',
            { headers: { 'authtoken': localStorage.getItem('userToken')},
            params: {
                childID: chatChildId
            }}
        );
        return response;
    }

    async componentDidMount() {
        const parentId = localStorage.getItem('userUID');
        const chatChildId = localStorage.getItem('chatChildId');
        let requestsForParent = await this.getRequestsForParentFromServer(chatChildId);
        this.setState({ requestsForParent : requestsForParent.data });

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
                                {this.state.requestsForParent.map((request,index) =>
                                    <Request key={index}
                                            accepted={request.accepted} amount={request.amount} date={request.requestDate} uid={request.uid} />
                                )}

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
                            </div>
                        </div>

        );

    }
}

ChargeMoney.contextType = userContext;
export default ChargeMoney;

