import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "./charge-money.css"
import {userContext} from "../../utils/fire-base/userContext";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";


class Request extends Component {
    constructor() {
        super();
        this.state = {
            showCreditCardModal: false,
            name: '',
            id: '',
            cardNumber: '',
            expiration: '',
            backNumbers: ''
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
        this.handleExpirationChange = this.handleExpirationChange.bind(this);
        this.handleBackNumbersChange = this.handleBackNumbersChange.bind(this);

    }


    componentDidMount() {
    }


    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleIDChange(event) {
        this.setState({id: event.target.value});
    }
    handleCardNumberChange(event) {
        this.setState({cardNumber: event.target.value});
    }
    handleExpirationChange(event) {
        this.setState({expiration: event.target.value});
    }
    handleBackNumbersChange(event) {
        this.setState({backNumbers: event.target.value});
    }



    async payForKid(uid, amount, cardNumber, expirationDate, cardSecurityCode, cardHolderId, cardHolderName){
        let userToken = sessionStorage.getItem('userToken')
        const chargeResponse = await axios.post(
            'http://localhost:5050/chargeCard/',
            { headers: { 'authtoken': userToken},
                params: {
                    amount: amount,
                    cardNumber: cardNumber,
                    expirationDate: expirationDate,
                    cardSecurityCode: cardSecurityCode,
                    cardHolderId: cardHolderId,
                    cardHolderName: cardHolderName,
                    // toAccount: sessionStorage.getItem('chatChildId')
                    toAccount: '354952584'
                }}
        );

        const response = await axios.put(
            'http://localhost:8080/moneyRequest/accept/'+ uid,
            { headers: { 'authtoken': userToken},
                params: {
                    reqId: uid,
                    transId: chargeResponse.data.transactionId
                }}
        );
        alert('ההעברה בוצעה בהצלחה!');
        this.setState({showCreditCardModal: !this.state.showCreditCardModal});
        return response;
    }

    render() {
        const toggleCreditCardModal = () => this.setState({showCreditCardModal: !this.state.showCreditCardModal});
        const CreditCardModal = () => (
            <div className="modal-wrapper" style={{'display': 'block'}}>
                <div className="close-modal-button-separate"
                     id="close-modal-button-separate"
                     onClick={toggleCreditCardModal} style={{'display': 'block'}}></div>
                <div className="modal-inner">
                    <div className="ask-outer">
                        <h2 className="ask-h2">תשלום באמצעות אשראי</h2>
                        <div className="modal-detail">
                            <div style={{
                                'height': '45vh',
                                'display': 'flex',
                                'flexDirection': 'column',
                                'justifyContent': 'space-around',
                                'alignItems': 'flex-start'
                            }}>
                                <div style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
                                    <input style={{'marginRight': '2vh'}} type="text" onChange={this.handleNameChange} value={this.state.name}/>
                                    <span>שם בעל האשראי</span>
                                </div>

                                <div style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
                                    <input style={{'marginRight': '2vh'}} type="text" onChange={this.handleIDChange}  value={this.state.id}/>
                                    <span>מספר ת.ז </span>
                                </div>
                                <div style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
                                    <input style={{'marginRight': '2vh'}} placeholder=""
                                           type="text" onChange={this.handleCardNumberChange}  value={this.state.cardNumber}/>
                                    <span>מספר אשראי</span>
                                </div>


                                <div style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
                                    <input style={{'marginRight': '2vh'}} type="text" onChange={this.handleExpirationChange} value={this.state.expiration}/>
                                    <span>תאריך תפוגה</span>
                                </div>

                                <div style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
                                    <input style={{'marginRight': '2vh'}} type="text" onChange={this.handleBackNumbersChange} value={this.state.backNumbers}/>
                                    <span>ספרות בגב הכרטיס</span>
                                </div>
                            </div>


                        </div>

                    </div>
                    <div className="send-button-outer">
                        <div>
                            <button className="btn btn-light option-button send-button"
                                    onClick={this.payForKid.bind(this, this.props.uid, this.props.amount, this.state.cardNumber,
                                        this.state.expiration, this.state.backNumbers, this.state.id, this.state.name)}>
                                שלח
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

        if (this.props.accepted) {
            return <div style={{'display': 'flex'}}>
                <div className="asked-you">
                    <span className="right"><b>ביקשו ממך {this.props.amount} שקלים</b></span>
                    <span className="right font-size-2vh">{this.props.date}</span>
                </div>
                <div className="you-payed">
                    <span className="right"><b>שילמת {this.props.amount} שקלים</b></span>
                    <span className="right font-size-2vh">{this.props.date}</span>
                </div>
                {this.state.showCreditCardModal ? <CreditCardModal/> : null}

            </div>
        }
        return <div className="asked-you-with-pay-option">
            <div className="asked-you-inner">
                <span className="right"><b>ביקשו ממך {this.props.amount} שקלים</b></span>
                <span className="right font-size-2vh">{this.props.date}</span>
            </div>
            {/*<span className="tap-to-pay" onClick={this.payForKid.bind(this, this.props.uid, this.props.amount)}>לחץ לתשלום</span>*/}
            <span className="tap-to-pay" onClick={toggleCreditCardModal}>לחץ לתשלום</span>
            {this.state.showCreditCardModal ? <CreditCardModal/> : null}

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

    async getRequestsForParentFromServer(chatChildId) {
        const response = await axios.get(
            'http://localhost:8080/moneyRequest/getAllForParent',
            {
                headers: {'authtoken': sessionStorage.getItem('userToken')},
                params: {
                    childID: chatChildId
                }
            }
        );
        return response;
    }

    async componentDidMount() {
        const parentId = sessionStorage.getItem('userUID');
        const chatChildId = sessionStorage.getItem('chatChildId');
        let requestsForParent = await this.getRequestsForParentFromServer(chatChildId);
        this.setState({requestsForParent: requestsForParent.data});

    }


    render() {
        const toggleResults = () => this.setState({showModal: !this.state.showModal});
        const Modal = () => (
            <div className="modal-wrapper" id="modal" style={{'display': 'block'}}>
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
        );

        return (
            <div id="body-charge-money-page">
                {this.state.showModal ? <Modal/> : null}
                <div className="chat-panel">
                    {this.state.requestsForParent.map((request, index) =>
                        <Request key={index}
                                 accepted={request.accepted} amount={request.amount} date={request.requestDate}
                                 uid={request.uid}/>
                    )}

                </div>
            </div>

        );

    }
}

ChargeMoney.contextType = userContext;
export default ChargeMoney;

