import React,{Component} from 'react';
import '../../stylesheets/verify-modal.css';
import {Glyphicon} from "react-bootstrap";
class VerificationSuccessModal extends Component {


  render() {
    if(!this.props.showVerificationSuccessModal) {
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
          <label className="verify-success-modal-text">Account Verified</label>
          <span><Glyphicon glyph="align-left" /></span>

          <div className="verify-modal-footer">
          <button className ="verify-success-modal-button" onClick={this.props.onClose}>
            Close
          </button>
          </div>
        </div>
      </div>
    );
  }
}

export default VerificationSuccessModal;
