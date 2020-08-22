import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import "bootstrap/dist/css/bootstrap.css"
import "../parent-page/parent-page.css"
import { NavLink } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../utils/fire-base/userContext";
import StarRatingComponent from 'react-star-rating-component';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Alert from "react-bootstrap/Alert";
import { store } from 'react-notifications-component';


class ParentHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            childrenDOM:'',
            children: '',
            childrenID: '',
            allTabsDOM: '',
            explain: '',
            token: '',
            error: ''
        };

        this.enterReview = this.enterReview.bind(this);
        this.explainChanged = this.explainChanged.bind(this);
        this.submitReview = this.submitReview.bind(this);
        
    }

    async componentDidMount() {
        const parentId = sessionStorage.getItem('userUID');
        const parentToken = sessionStorage.getItem('userToken');
        let parentInfo = await this.getParentInfoFromServer(parentId, parentToken);
        this.setState({ childrenID : parentInfo.data.children });
        this.setState({ token : parentToken });

        let allChildrenInfo = await this.getChildrenInfoFromServer(parentInfo.data.children, parentToken, "child/");
        this.setState({ children : allChildrenInfo });
        this.setState({ childrenDOM : this.convertChildrenToDOM(allChildrenInfo) });

        let allChildrenLastActivities =  await this.getChildrenInfoFromServer(parentInfo.data.children, parentToken, "purchase/byChild/");

        this.setState({ allTabsDOM : this.createAllTabsDOM(this.createTabsDOM(allChildrenInfo), this.convertLastActivitiesToDOM(allChildrenLastActivities)) });

        this.handleNotifications(allChildrenInfo, parentToken);
    }

    async getParentInfoFromServer(uid,token){
        const response = axios.get(
            'http://localhost:8080/auth/userByToken',
            { headers: { 'authtoken': token} }
            );

        return response;
    }

    async getChildrenInfoFromServer(children,token,url){

        let childrenInfo = [];
        let child;

        for (var i = 0; i < children.length; i++) {
            child = await this.getChildInfoFromServer(children[i].id,token,url)
            let childObj = {
                child : child.data,
                childId: this.state.childrenID[i].id
            };
            childrenInfo.push(childObj);
        }

        return childrenInfo;
    }

    async redirectToChat(childId) {
        sessionStorage.setItem('chatChildId', childId)
        window.location.href = '/#/ChargeMoney'
    }

    async getChildInfoFromServer(id,token,url){
        const response = axios.get(
            'http://localhost:8080/'+ url + id,
            { headers: { 'authtoken': token} }
            );

            return response;
    }    

    convertChildrenToDOM(children) {
        return children.map((child) =>
        <div className="kid-box" key={child.childId}>
        <div className="kid-info">
            <a className="fa fa-envelope" onClick={this.redirectToChat.bind(this, child.childId)}></a>

            <div className="kid-specific">
                <span style={{ fontWeight: "bold", "fontSize": "3vh" }}>{child.child.firstName}</span>
                <span style={{ "fontSize": "2vh" }}>הגבלות: בוטנים, חלב, סויה</span>
            </div>
            <div className="kid-image">
                <img src={"/new-images/" + child.child.picture} style={{ "borderRadius": "100%", "height": "7vh", "width": "7vh" }} />
            </div>
        </div>
        <div className="kid-money">
            <div className="btn btn-light option-button" style={{
                "display": "flex", "width": "fit-content",
                "height": "4vh", "alignItems": "center"
            }}><span style={{ "fontSize": "2vh" }}>טען כסף </span>
            </div>

            <span style={{ fontSize: "3vh" }}>יתרה: {child.child.balance} שקלים</span>
        </div>
    </div>
        );
    }

    convertLastActivitiesToDOM(activities) {
        for (var i = 0; i < activities.length; i++) {
            activities[i].child = this.mapActivities(activities[i].child);
        }

        return activities.map((activityChild) => 
        <TabPanel key={activityChild.childId}>
            {activityChild.child}
        </TabPanel>
        )
    }

    mapActivities(activities){
        if((Object.keys(activities).length === 0 && activities.constructor === Object) || activities == ''){
            return '';
        }

        return activities? activities.map((activity) =>
        <div className="activity" key={activity.date}>
                        <div className="product">
    <span className="cost">{activity.price}$</span>
    <span className="product-name">{activity.name}</span>
                        </div>
                        <div className="more-details">
                            <span>3.3.20</span>
    <span>רכישה ב{activity.location}</span>
                        </div>
                        <div style={{
                            "display": "flex",
                            "flexDirection": "row",
                            "justifyContent": "space-between"
                        }}>
                            <div className="btn btn-light selected-button"
                                onClick={(function () {
                                    document.getElementById("modal").classList.add("open");

                                    document.getElementById("modal").classList.remove("close");
                                    document.getElementById('close-modal-button-separate').classList.remove("close");
                                    document.getElementById('close-modal-button-separate').classList.add("open");
                                })}
                                style={{ display: "flex", width: "fit-content", height: "3vh", "alignItems": "center" }}><span style={{ "fontSize": "2vh" }} onClick={() => this.enterReview(activity.productFromStore,activity.productData.name,activity.storeData.name)}>דרג מוצר</span>
                            </div>
                            <StarRatingComponent
                                name="bamba"
                                editing={false}
                                starCount={5}
                                value={1}  // TODO: decide if need to get average or what else?
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                    </div>
        ): <div></div>;
    }

    createTabsDOM(childrenInfo){

        const tabs = childrenInfo.map((child) =>
    <Tab key={child.childId}> {child.child.firstName} {child.child.lastName}</Tab>
        )


        return <TabList className="kids-names">
                        {tabs}
                        {/* className="kid-element" */}
                        {/* style={{ "width": "50%", "color": "#b0b0b0", "borderBottom": "5px solid #b0b0b0", "textAlign": "center" }} */}
                </TabList>

    }

    createAllTabsDOM(childrenTabs, activitiesTabs){
        return <Tabs id="signup-outer-parent" style={{ fontSize: "4vh" }}>
        {/* {this.state.childrenTabsDOM}

        {this.state.lastActivitiesDOM} */}

        {childrenTabs}

        {activitiesTabs}

    </Tabs>;
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    enterReview(productID, productName,kioskName){
        this.setState({itemToReviewID : productID});
        this.setState({itemToReviewName : productName});
        this.setState({kioskNameReview : kioskName});
    }

    explainChanged(evt){
        this.setState({
            explain: evt.target.value,
          });
    }

    submitReview(evt){
        if(this.state.explain === '' || this.state.rating === 0){
            this.setState({ error: 'יש למלא פירוט ודירוג בכדי לדרג את המוצר' });
            return;
        }
        axios.post('http://localhost:8080/productReview', { product: this.state.itemToReviewID, rating: this.state.rating,comment: this.state.explain },
        { headers: { 'authtoken': this.state.token} })
      .then(res => {
        window.location.reload(false);
      })
    }


    async handleNotifications(childrenInfo,token){
        var childrenMoneyRequests = [];
        var childObj;

        for (var i = 0; i < childrenInfo.length; i++) {
            const response = await axios.get(
                'http://localhost:8080/moneyRequest/getAll',
                { headers: { 'authtoken': token},
                  params: {
                      daysBack: 10,
                      childID: childrenInfo[i].childId
                  } }
                );

                childObj = {
                    numOfRequests :  childrenInfo[i].child.firstName + " ביקש כ - " + await response.data.length + " בקשות לכסף",
                    childId: childrenInfo[i].id
                };
                childrenMoneyRequests.push(childObj);
        }
        this.notificationsDOM(childrenMoneyRequests);
    }


    notificationsDOM(moneyRequests){

        for (var i = 0; i < moneyRequests.length; i++) {
            store.addNotification({
                title: "שלום רב",
                message: moneyRequests[i].numOfRequests,
                type: "info",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  pauseOnHover: true
                }
              });
        }
        store.addNotification({
            title: "שלום ז'אק",
            message: "שלום שקד",
            type: "info",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover: true
            }
          });
    }


    render() {
        const { rating } = this.state;
        return (
                <div id="parent-outer">
                    <div className="modal-wrapper" id="modal">
                        <form>
                        <div className="close-modal-button-separate"
                            id="close-modal-button-separate"
                            onClick={(function () {
                                document.getElementById("modal").classList.add("close");

                                document.getElementById("modal").classList.remove("open");
                                document.getElementById('close-modal-button-separate').classList.remove("open");
                                document.getElementById('close-modal-button-separate').classList.add("close");
                            })}></div>
                        <div className="modal-inner">
                            <div className="product-rate">
                                <h2 style={{ "color": "#00be92" }}>דירוג מוצר</h2>
                                <div className="do-center">
                        <span style={{ color: "black", fontSize: "3vh" }}>{this.state.itemToReviewName}</span>
                                    <span style={{ "color": "black", fontSize: "3vh" }}>{this.state.kioskNameReview}</span>
                                    <Alert variant="danger" show={this.state.error !== ''} onClose={() => this.setState({error:''})} dismissible>
            <Alert.Heading>שגיאה!</Alert.Heading>
            <p>
              {this.state.error}
        </p>
          </Alert>
                                    <StarRatingComponent
                                        name="bamba"
                                        starCount={5}
                                        value={rating}
                                        onStarClick={this.onStarClick.bind(this)}
                                        required
                                    />
                                    <br />
                                    <span style={{ "color": "black", "direction": "rtl", fontSize: "3vh" }}>פירוט:</span>
                                    <input style={{ "border": "5px solid #00be92", "height": "10vh", "width": "30vh" }} type="text" onChange={this.explainChanged} required/>
                                </div>

                            </div>
                            <div className="rate">
                                <div>
                                    <div className="btn btn-light option-button" style={{
                                        "display": "flex", "width": "fit-content",
                                        "height": "4vh", "alignItems": "center"
                                    }} onClick={this.submitReview}><span style={{ "fontSize": "2vh" }}>דרג </span></div>                                </div>
                            </div>
                        </div>
                        </form>
                    </div>

                    <span style={{ fontSize: "4vh", "color": "white", "textAlign": "right" }}>הילדים שלי</span>

                    {this.state.childrenDOM}

                    {this.state.allTabsDOM}
                </div>

                    

        );

    }
}

ParentHome.contextType = userContext;
export default ParentHome;

