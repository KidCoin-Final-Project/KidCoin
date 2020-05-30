import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../near-kiosk/near-kiosk.css';



class NearKiosk extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    return (
    <div className="body-near">
        <div id="search-kiosk-outer">
        <span id="near-kiosk-span">קיוסקים קרובים</span>
    
        <div id="search-outer-near-kiosk">
            <input id="search-input-near-kiosk" placeholder="חפש/י קיוסק" type="text"/>
            <a className="fa fa-search"></a>
        </div>
    
    </div>
    
    <div id="signup-outer-near-kiosk">
            <span id="near-kiosk-span">
              הצעות
            </span>
        <div className="activity">
            <div className="product">
                <span className="cost">נווט/י לשם</span>
                <span className="product-name">הקיוסק המקורי</span>
            </div>
            <div className="more-details">
                <span>800 מטר</span>
                <span>עולי ציון 8, הוד השרון</span>
            </div>
        </div>
        <div className="activity">
            <div className="product">
                <span className="cost">נווט/י לשם</span>
                <span className="product-name">הקיוסק המקורי</span>
            </div>
            <div className="more-details">
                <span>800 מטר</span>
                <span>עולי ציון 8, הוד השרון</span>
            </div>
        </div>
        <div className="activity">
            <div className="product">
                <span className="cost">נווט/י לשם</span>
                <span className="product-name">הקיוסק המקורי</span>
            </div>
            <div className="more-details">
                <span>800 מטר</span>
                <span>עולי ציון 8, הוד השרון</span>
            </div>
        </div>
    </div>
    </div>
    );
  }
}

export default NearKiosk;