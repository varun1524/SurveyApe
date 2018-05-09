import React, {Component} from 'react';
import HeaderComponent from './header';
import Login from './login';
import '../stylesheets/signup.css';
import * as API from "../api/API";
import {Link, withRouter} from 'react-router-dom';
import {Glyphicon} from "react-bootstrap";

import VerificationModal from 'react-modal';
import VerificationSuccessModal from 'react-modal';
import VerificationFailedModal from 'react-modal';

// import InnerVerificationModal from './modals/verification-modal';
// import InnerVerificationSuccessModal from './modals/verification-success-modal';

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.4)'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        color                 : 'black',
        padding               : '0px',
        alignContent          : 'center',
        width                 : '50%',
        height                : '60%'
    }


};

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            isLoggedIn: false,
            message: "",
            verificationModalOpen:false,
            verificationSuccessModalOpen:false,
            verificationFailedModalOpen:false,
            emailColor:"",
            code:[]
        };

        this.openVerificationModal = this.openVerificationModal.bind(this);
        this.openVerificationSuccessModal= this.openVerificationSuccessModal.bind(this);
        this.openVerificationFailedModal= this.openVerificationFailedModal.bind(this);

    }

    handleSignUp = (() => {
        console.log("[Signup Component] handleSignUp() userdetail: " );
        console.log(this.state);

        //remove after verification
        //this.openVerificationModal();


        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        if(this.state.email.length === 0){
            document.getElementById('emailErr').innerHTML='Email is required';
        }
        else if(!re.test(this.state.email)){
            document.getElementById('emailErr').innerHTML='Email is invalid';
        }
        else if (this.state.password.length < 8){
            document.getElementById('passwordErr').innerHTML = "Min length 8 required";
        }
        else if(this.state.firstname.length === 0){
            document.getElementById('firstnameErr').innerText='Firstname is required';
        }
        else if(this.state.lastname.length === 0) {
            document.getElementById('lastnameErr').innerHTML = 'Lastname is required';
        }
        else {
            // this.openVerificationModal();
            API.doSignUp(this.state)
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        this.setState({
                            ...this.state,
                            isLoggedIn: true,
                            message: "You have successfully signed up. Please login here"
                        });
                        //this.props.history.push("/login");
                        this.openVerificationModal()

                    } else if (response.status === 400) {
                        console.log("State");
                        this.setState({
                            ...this.state,
                            isLoggedIn: false,
                            message: "Error while adding userdata"
                        });
                        alert("Error while adding userdata");
                        // this.props.history.push("/signup")
                    }
                    else if (response.status === 302) {
                        this.setState({
                            ...this.state,
                            isLoggedIn: false,
                            message: "User already exists with emailId"
                        });
                        alert("User already exists with emailId");
                    }
                    else {
                        this.setState({
                            ...this.state,
                            isLoggedIn: false,
                            message: "Error while signing up."
                        });
                        alert("Error while signing up.");
                    }
                });
        }
    });

    openVerificationModal() {
        this.setState({
            ...this.state,
            verificationModalOpen : true
        })
    }

    closeVerificationModal() {
        this.setState({
            ...this.state,
            verificationModalOpen : false
        })
    }

    afterVerifiedSuccess() {
        this.setState({
            ...this.state,
            verificationModalOpen : false,
            verificationSuccessModalOpen:true
        })
    }

    afterVerifiedFailed() {
        this.setState({
            ...this.state,
            verificationModalOpen : false,
            verificationFailedModalOpen:true
        })
    }

    tryAgain() {
        this.setState({
            ...this.state,
            verificationFailedModalOpen:false,
            verificationModalOpen : true
        })
    }

    openVerificationSuccessModal() {
        this.setState({
            ...this.state,
            verificationSuccessModalOpen : true
        })
    }

    closeVerificationSuccessModal() {
        console.log("[Signup]  closeVerificationSuccessModal()")
        this.setState({
            ...this.state,
            verificationSuccessModalOpen : false
        })
    }

    openVerificationFailedModal() {
        this.setState({
            ...this.state,
            verificationFailedModalOpen : true
        })
    }

    closeVerificationFailedModal() {
        this.setState({
            ...this.state,
            verificationFailedModalOpen : false
        })
    }



    handleVerification = (() => {

        console.log("[VerificationModal] handleVerification() verification code - ",this.state.code);

        let code = "";

        this.state.code.map((codechar)=>{
            code += codechar;
        });

        if(code.length <6){
            alert("Code length is less than 6 character !!!");
            return;
        }

        console.log("[Signup] code"+code);

        // this.afterVerifiedSuccess();

        API.verifyAccount(code)
            .then((response)=>{
                if(response.status === 200){
                    console.log("[signup] handleVerification status : ", response.status);
                    this.afterVerifiedSuccess();
                }else{
                    response.json().then((data) => {

                        this.state.message = data.message;
                        this.afterVerifiedFailed();
                    });
                }

            }).catch((error)=>{
                console.log("[Signup] Error while verify",error);
        })
    });

    render() {
        console.log("[Signupo] render state: ",this.state);
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        var checknum =/\d/ ;
        var checkspl = /[~`!#$%\^&*+=\-\[\]\\';,/(){}|\\":<>\?]/g;
        return (
            <div className="DemoSignUp">
                <HeaderComponent/>

                <VerificationModal
                    isOpen={this.state.verificationModalOpen}
                    onAfterOpen={this.openVerificationModal}
                    onRequestClose={this.closeVerificationModal}
                    style={customStyles}
                >
                    <div className="modal-header">
                        <span className="close" onClick={() => {this.closeVerificationModal()}}>&times;</span>
                        <h3>VERIFICATION MODAL</h3>
                    </div>
                    <div className="modal-body">

                        <label className="verify-modal-text">Enter the code to verify your account</label>
                        <div className="verify-code-box">
                            <input type ="text" className="verify-input-text" maxLength="1"
                                   onChange={(event) => {this.state.code[0]=event.target.value}}/>-
                            <input type ="text" className="verify-input-text" maxLength="1"
                                   onChange={(event) => {this.state.code[1]=event.target.value}}/>-
                            <input type ="text" className="verify-input-text" maxLength="1"
                                   onChange={(event) => {this.state.code[2]=event.target.value}}/>-
                            <input type ="text" className="verify-input-text" maxLength="1"
                                   onChange={(event) => {this.state.code[3]=event.target.value}}/>-
                            <input type ="text" className="verify-input-text" maxLength="1"
                                   onChange={(event) => {this.state.code[4]=event.target.value}}/>-
                            <input type ="text" className="verify-input-text" maxLength="1"
                                   onChange={(event) => {this.state.code[5]=event.target.value}}/>
                        </div>

                        <div className="verify-modal-footer">
                            <button className ="verify-modal-button-close" onClick={() => {this.closeVerificationModal()}}>
                                Close
                            </button>
                            <button className ="verify-modal-button-submit" onClick={()=>{this.handleVerification()}}>
                                Submit
                            </button>
                        </div>

                    </div>
                </VerificationModal>

                <VerificationSuccessModal
                    isOpen={this.state.verificationSuccessModalOpen}
                    onAfterOpen={this.openVerificationSuccessModal}
                    onRequestClose={this.closeVerificationSuccessModal}
                    style={customStyles}
                >
                    <div className="modal-header">

                        <h3>VERIFICATION SUCCESS</h3>
                    </div>
                    <div className="modal-body">
                        <span className="account-verified-ok"><Glyphicon glyph="ok"/></span>
                        <div className="verify-modal-footer">
                            <button className ="verify-success-modal-button-close" onClick={() => {
                                this.closeVerificationSuccessModal();
                                this.props.handlePageChange('/login');
                            }}>
                                Close
                            </button>
                        </div>

                    </div>
                </VerificationSuccessModal>

                <VerificationFailedModal
                    isOpen={this.state.verificationFailedModalOpen}
                    onAfterOpen={this.openVerificationFailedModal}
                    onRequestClose={this.closeVerificationFailedModal}
                    style={customStyles}
                >
                    <div className="modal-header">
                        <span className="close" onClick={() => {this.closeVerificationFailedModal()}}>&times;</span>
                        <h3>VERIFICATION FAILED</h3>
                    </div>
                    <div className="modal-body">
                        <span className="account-verified-remove"><Glyphicon glyph="remove"/></span>
                        <div className="verify-modal-footer">
                            <button className ="verify-fail-modal-button-try-again" onClick={() => {this.tryAgain()}}>
                                Try Again
                            </button>
                            <button className ="verify-fail-modal-button-cancel" onClick={()=>{
                                this.closeVerificationFailedModal();
                                this.props.handlePageChange('/signup');
                            }}>
                                Cancel
                            </button>
                        </div>

                    </div>
                </VerificationFailedModal>

                <div className="sign-up-form">
                    <form>
                        <div className="sign-up-container">

                            <label className="sign-up-label">SIGN UP</label>
                            <hr/>

                            <input className = "signup-input-text" type="text" placeholder="Enter Username" name="email" style={{color:this.state.emailColor}}
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           email: event.target.value,
                                           emailColor : re.test(event.target.value) ? 'black' : 'Red'
                                       })
                                   }}/><span id="emailErr"/>

                            <input className = "signup-input-text" type="password" placeholder="Enter Password" name="password"
                                   onChange={(event) => {
                                       document.getElementById('passwordErr').innerText = event.target.value.length > 7 ?
                                           checknum.test(event.target.value)?
                                               checkspl.test(event.target.value)?
                                                   "Strong":"Average" : "Weak": "Min length 8 required";
                                       this.setState({
                                           ...this.state,
                                           password: event.target.value
                                       })


                                   }}/><span id='passwordErr'></span>


                            <input className = "signup-input-text" type="text" placeholder="Enter First Name" name="firstname"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           firstname: event.target.value
                                       })
                                   }}/><span id='firstnameErr'></span>


                            <input className = "signup-input-text" type="text" placeholder="Enter Second Name" name="lastname"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           lastname: event.target.value
                                       })
                                   }}/><span id='lastnameErr'></span>

                            {<button type ="button" onClick={() => this.handleSignUp()}>Sign Up</button>}
                            {/*<input type="button" id="button" className="btn btn-primary col-sm-8 col-md-8 col-lg-8"
                                   onClick={()=>this.handleSignUp()} value="Sign Up"/>*/}

                            <span className="sign-up-password">Have an account ?
                                <Link to={'/login'} component={Login}>
                                    Login
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);
