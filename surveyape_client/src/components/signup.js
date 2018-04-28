import React, {Component} from 'react';
import HeaderComponent from './header';
import Login from './login';
import '../stylesheets/signup.css';
import * as API from "../api/API";
import {Link, withRouter} from 'react-router-dom';
import VerificationModal from './modals/verification-modal';
import VerificationSuccessModal from './modals/verification-success-modal';

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
            showVerificationModal:false,
            showVerificationSuccessModal:false
        };
    }

    handleSignUp = (() => {
        console.log("[Signup Component] handleSignUp() userdetail: " );
        console.log(this.state);

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
    });

    changeVerificationModalVisibility = ()=>{
      console.log("changeVerificationModalVisibility: "+this.state.showVerificationModal);
      this.setState({
        ...this.state,
        showVerificationModal:!this.state.showVerificationModal,
      });
    }

    changeSuccessVerificationModalVisibility = ()=>{
      console.log("changeSuccessVerificationModalVisibility: "+this.state.showVerificationSuccessModal);
      this.setState({
        ...this.state,
        showVerificationSuccessModal:!this.state.showVerificationSuccessModal,
      });
    }

    verifyAccount =()=>{
      this.setState({
        ...this.state,
        showVerificationModal:false,
        showVerificationSuccessModal:true,
      });
    }

    render() {
      console.log("this.state.showVerificationModal",this.state.showVerificationModal);
        return (
            <div className="DemoSignUp">
                <HeaderComponent/>

                <VerificationModal showVerification={this.state.showVerificationModal}
                      onClose={this.changeVerificationModalVisibility}
                      verifyAccount={this.verifyAccount}>
                </VerificationModal>
                <VerificationSuccessModal showVerificationSuccessModal= {this.state.showVerificationSuccessModal}
                      onClose={this.changeSuccessVerificationModalVisibility}/>

                <div className="sign-up-form">
                    <form>
                        <div className="sign-up-container">
                            <input className = "signup-input-text" type="text" placeholder="Enter Username" name="email"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           email: event.target.value
                                       })
                                   }}/>
                            <input className = "signup-input-text" type="password" placeholder="Enter Password" name="password"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           password: event.target.value
                                       })
                                   }}/>
                            <input className = "signup-input-text" type="text" placeholder="Enter First Name" name="firstname"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           firstname: event.target.value
                                       })
                                   }}/>
                            <input className = "signup-input-text" type="text" placeholder="Enter Second Name" name="lastname"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           lastname: event.target.value
                                       })
                                   }}/>
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
