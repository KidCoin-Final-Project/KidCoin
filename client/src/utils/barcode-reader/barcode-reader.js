import React, { Component } from 'react'
import * as ScanditSDK from "scandit-sdk";
import "../barcode-reader/barcode-scanner.css";
import { Dropdown, Button } from 'semantic-ui-react';
import axios from "axios";

ScanditSDK.configure("AWleRQAWH3R+PC4AGRZW9gwAfJjxMrHBlWZ6YER28JMLZTd2dgtTtFd8AHFdIqBTKm2f5jllSlrXTMb/cXXY2uEUAgPfSMi9j2x9I/VaNOzBIlhxhyMHnyEfUbqtcb9HAbrO2aAbtCNKJ6U6QehjaJ18MaEBOTiSQShpLt5y4xzrPoPMm8NjooAt8Cysv+0LaTWDK0e+cJAHXT4KdkHm3YtzSC7W20IEEpB95jfROW+p9NHMUCBjRj9BHD4AIBkmBDlp2Wa6Ll8qqeT0+F6fZF/KLiv+uh3Mg9LE6wWd1NFfcCSV+l7qlHziCq3GADQCtlPOsf6nU3FsqRl4ip53HCLfNIAv3yCTNr0NDf+PN2lPCevNm+t1pEFHgRLM3HxV6Z01tqV7k1pMVi3DKaEqiGN+OCg3+Zim6R72h9WZsU6KOWaFkTuj6JbfYc7kRO563+k/8jyG3FgnFZdEhwPTsjAxMSCqy5e8ubXPJ9uEv2PDuVLINoab84ld+mvCwYHaCi7XCB8w4YeQKaDJxroL44EXrYNd87QGYDiQp9ll28ZU/RjGNoNpMLGqF5mDZfIrawNUmIDY5iiO926NjK10yX825VRcogReK+UrqI1V/TQHpHJs9zisWP3nxPE5ziFhukTbHgpVpv+0bh/EnHerpayLDB67/zkjjovgSIus4aSPvQEOEkICc/QEasYaLfAcnj8IedJQTVe62XSnaOyJqT4U3jYTO+Dh7mLTm7ZjTF+cnR5/6Y8TvXrS/6Gf9mPGl7EuzwxmbJt+4VVqyDyNjsXNyFDL/QcWSjDNM1M=", {
  engineLocation: "https://unpkg.com/scandit-sdk/build"
});

class BarcodeScanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: 'No result',
      barcode: '',
      allKiosks: [],
      kioskSelected: '',
      isKioskSelected: false,
      isBarcodeSelected : false
    }

    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    var that = this;
    const token = sessionStorage.getItem('userToken');
    this.setState({ allKiosks: this.mapKiosksToDropdown( await this.getAllKiosks(token)) });
    ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
      playSoundOnScan: true,
      vibrateOnScan: true
    }).then((barcodePicker) => {
      const scanSettings = new ScanditSDK.ScanSettings({
        enabledSymbologies: [
          ScanditSDK.Barcode.Symbology.EAN8,
          ScanditSDK.Barcode.Symbology.EAN13,
          ScanditSDK.Barcode.Symbology.UPCA,
          ScanditSDK.Barcode.Symbology.UPCE,
          ScanditSDK.Barcode.Symbology.CODE128,
          ScanditSDK.Barcode.Symbology.CODE39,
          ScanditSDK.Barcode.Symbology.CODE93,
          ScanditSDK.Barcode.Symbology.INTERLEAVED_2_OF_5,
        ],
        codeDuplicateFilter: 1000,
      });
      barcodePicker.applyScanSettings(scanSettings);

      barcodePicker.on("scan", (scanResult) => {
          scanResult.barcodes.reduce((string, barcode) => {
            this.setState({ barcode : barcode.data });
            this.setState({ isBarcodeSelected : true });
          }, "")
        // send to server to know what product is it
        // if it doesnt exist put an option to add it
      });
    });
  }

  async getAllKiosks(token) {
    return await axios.get(
        'http://localhost:8080/store/allStores',
        {
            headers: { 'authtoken': token }
        }
    );
  }

  mapKiosksToDropdown(kiosks){
    return kiosks.data.map((kiosk) => ({
      key: kiosk.storeId,
      text: kiosk.storeName,
      value: kiosk.storeId
     }));
  }

  handleChange(evt,e){

    this.setState({ kioskSelected: e.value });
    this.setState({ isKioskSelected : true });
  }

  render() {
    return (

      <div className="container column barcode-form">
        <div className="item">
        <Dropdown placeholder='בחר קיוסק'
         search
         selection
         options={this.state.allKiosks}
         value={this.state.kioskSelected}
         onChange={this.handleChange} />
         </div>
         
        <div id="scandit-barcode-picker" className="item"></div>

      { this.state.isBarcodeSelected && this.state.isKioskSelected &&
        <div className="item"><Button>בצע רכישה</Button></div>
      }
      </div>
    )
  }
}

export default BarcodeScanner;