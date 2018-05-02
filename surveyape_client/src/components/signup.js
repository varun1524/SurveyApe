import React, {Component} from 'react';
import HeaderComponent from './header';
import Login from './login';
import '../stylesheets/signup.css';
import * as API from "../api/API";
import {Link, withRouter} from 'react-router-dom';

import VerificationModal from 'react-modal';

import InnerVerificationModal from './modals/verification-modal';
import InnerVerificationSuccessModal from './modals/verification-success-modal';

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
        height                : '50%'
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
            emailColor:"",
        };

        this.openVerificationModal = this.openVerificationModal.bind(this);
        // this.openSuccessVerificationModal= this.openSuccessVerificationModal.bind(this);

    }

    handleSignUp = (() => {
        console.log("[Signup Component] handleSignUp() userdetail: " );
        console.log(this.state);

        //remove after verification
        this.openVerificationModal();


        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        if(this.state.email.length == 0){
            document.getElementById('emailErr').innerHTML='Email is required';
        }
        else if(!re.test(this.state.email)){
            document.getElementById('emailErr').innerHTML='Email is invalid';
        }
        else if (this.state.password.length < 8){
            document.getElementById('passwordErr').innerHTML = "Min length 8 required";
        }
        else if(this.state.firstname.length == 0){
            document.getElementById('firstnameErr').innerText='Firstname is required';
        }
        else if(this.state.lastname.length == 0) {
            document.getElementById('lastnameErr').innerHTML = 'Lastname is required';
        }
        else {


            API.doSignUp(this.state)
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        this.setState({
                            ...this.state,
                            isLoggedIn: true,
                            message: "You have successfully signed up. Please login here"
                        });
                        //TODO: Modal for verification
                        //this.props.history.push("/login");
                        this.changeVerificationModalVisibility();
                    } else if (response.status === 400) {
                        console.log("State");
                        this.setState({
                            ...this.state,
                            isLoggedIn: false,
                            message: "Error while adding userdata"
                        });
                        // this.props.history.push("/signup")
                    }
                    else if (response.status === 302) {
                        this.setState({
                            ...this.state,
                            isLoggedIn: false,
                            message: "User already exists with emailId"
                        });
                        // this.props.history.push("/signup")
                    }
                    else {
                        this.setState({
                            ...this.state,
                            isLoggedIn: false,
                            message: "Error while signing up."
                        });
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


    verifyAccount =()=>{
        this.setState({
            ...this.state,
            showVerificationModal:false,
            showVerificationSuccessModal:true,
        });
    }

    render() {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        var checknum =/\d/ ;
        var checkspl = /[~`!#$%\^&*+=\-\[\]\\';,/(){}|\\":<>\?]/g;
        console.log("this.state.showVerificationModal",this.state.showVerificationModal);
        return (
            <div className="DemoSignUp">
                <HeaderComponent/>

                {/*<VerificationModal showVerification={this.state.showVerificationModal}*/}
                                   {/*onClose={this.changeVerificationModalVisibility}*/}
                                   {/*verifyAccount={this.verifyAccount}>*/}
                {/*</VerificationModal>*/}
                {/*<VerificationSuccessModal showVerificationSuccessModal= {this.state.showVerificationSuccessModal}*/}
                                          {/*onClose={this.changeSuccessVerificationModalVisibility}/>*/}

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

                        <InnerVerificationModal />

                    </div>
                </VerificationModal>

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
