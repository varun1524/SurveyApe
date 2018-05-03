import React,{Component} from 'react';
import '../../stylesheets/verify-modal.css';
import * as API from "../../api/API";
import { Alert } from 'reactstrap';

class VerificationModal extends Component {
  constructor(){
    super();
    this.state = {
      code:[]
    }
  }
  handleVerification = (() => {

    console.log("[VerificationModal] handleVerification()");
    console.log(this.props);
    console.log("[VerificationModal] code:"+this.state.code);

    let code ="";
    this.state.code.map((codechar)=>{
      code +=codechar;
    })
    if(code.length <6){
      alert("Code length is less than 6 character !!!")
    }
    let requestPayload = {"verificationcode":code}
    API.verifyAccount(code)
          .then((response) => {
              console.log(response.status);
              if (response.status === 200) {

                  this.props.verifyAccount();
              }else{

              }});

  });
  render() {
    if(!this.props.showVerification) {
      return null;
    }

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 200,
      margin: '0 auto',
      padding: 20
    };



    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          <label className="verify-modal-text">Enter the code to verify your account:</label>
          <div className="verify-code-box">
            <input type ="text" className="verify-input-text" maxLength="1"
            onChange={(event) => {this.state.code[0]=event.target.value}}/>
            <input type ="text" className="verify-input-text" maxLength="1"
            onChange={(event) => {this.state.code[1]=event.target.value}}/>
            <input type ="text" className="verify-input-text" maxLength="1"
            onChange={(event) => {this.state.code[2]=event.target.value}}/>
            <input type ="text" className="verify-input-text" maxLength="1"
            onChange={(event) => {this.state.code[3]=event.target.value}}/>
            <input type ="text" className="verify-input-text" maxLength="1"
            onChange={(event) => {this.state.code[4]=event.target.value}}/>
            <input type ="text" className="verify-input-text" maxLength="1"
            onChange={(event) => {this.state.code[5]=event.target.value}}/>
          </div>

          <div className="verify-modal-footer">
            <button className ="verify-modal-button" onClick={this.props.onClose}>
              Close
            </button>
            <button className ="verify-modal-button" onClick={()=>{this.handleVerification()}}>
                Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default VerificationModal;
