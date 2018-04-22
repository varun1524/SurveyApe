import React, {Component} from 'react';
import HeaderComponent from './Header';

import '../stylesheets/DemoSignUp.css';
import * as API from "../api/API";

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            isLoggedIn: false,
            message: ""
        };
    }

    handleSignUp() {
        console.log("[Signup Component] handleSignUp() userdetail: " + this.state);

        API.doSignUp(this.state)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        ...this.state,
                        isLoggedIn: true,
                        message: "You have successfully signed up. Please login here"
                    });
                    this.props.history.push("/");

                } else if (response.status === 401) {
                    console.log("State");
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "Error while adding userdata"
                    });
                    // this.props.history.push("/signup")
                }
                else if (response.status === 301) {
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "Email Id already exists. Try to sign up with another Email Id"
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

    render() {
        return (
            <div className="DemoSignUp">
                <HeaderComponent/>
                <div className="sign-up-form">
                    <form>
                        <div className="sign-up-container">
                            <input type="text" placeholder="Enter Username" name="email"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           email: event.target.value
                                       })
                                   }}/>
                            <input type="password" placeholder="Enter Password" name="password"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           password: event.target.value
                                       })
                                   }}/>
                            <input type="text" placeholder="Enter First Name" name="firstname"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           firstname: event.target.value
                                       })
                                   }}/>
                            <input type="text" placeholder="Enter Second Name" name="lastname"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           lastname: event.target.value
                                       })
                                   }}/>

                            {/*<button onClick={() => this.handleSignUp()}>Sign Up</button>*/}

                            <input type="button" id="button" className="btn btn-primary col-sm-8 col-md-8 col-lg-8"
                                   onClick={()=>this.handleSignUp()} value="Sign Up"/>

                            <span className="sign-up-password">Have an account ? <a href="/">Login</a></span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;
