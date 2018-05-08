import React, {Component} from 'react';
import HeaderComponent from './header';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SignUp from './signup';
import {login_success} from "../actions/login";
import * as API from '../api/API';
import '../stylesheets/signin.css';

// import { withAlert } from 'react-alert';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email : "",
            password : "",
            message : "",
            emailColor:""
        }
    }

    handleLogin = (() => {
        document.getElementById('emailErr').innerHTML = '';
        console.log('1',this.state.email);
        console.log('1',this.state.password);
        //Validation
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        if(this.state.email.length == 0){
            document.getElementById('emailErr').innerHTML = 'Username is required';
        }
        else if (this.state.password.length == 0){
            document.getElementById('passwordErr').innerText = 'Password is required';
        }
        else if(!re.test(this.state.email)){
            document.getElementById('emailErr').innerHTML='Email is invalid';
        }
        else if (this.state.password.length > 0){
            document.getElementById('passwordErr').innerText = '';

            console.log('inside');
            API.doLogin(this.state).then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    response.json().then((data) => {
                        console.log(data);
                        this.props.login_success(data);
                    });
                    this.props.history.push("/home");
                    // this.props.alert.success('Logged in successfully !!!');
                }
                else if (response.status === 203) {
                    this.setState({
                        ...this.state,
                        message: "User not Verified. Please verify your account."
                    });
                    console.log("User not Verified. Please verify your account.")
                    alert("User not verified, kindly check your mail to verify your account !!!")
                }
                else if (response.status === 404) {
                    this.setState({
                        ...this.state,
                        message: "User not registered. Please sign up"
                    });
                    alert("User not registered. Please sign up");
                }
                else if (response.status === 401) {
                    this.setState({
                        ...this.state,
                        message: "Incorrect Password. Please try again"
                    });
                    alert("Incorrect Password. Try Again");
                }
                else {
                    alert("Error while Signing In");
                }
            });
         }
    });

    render() {
        console.log("[signin] render method");
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return (
            <div className="DemoSignIn">
                <HeaderComponent />
                <div className="sign-in-form">

                    <form>
                        <div className="sign-in-container">
                            <label className="sign-in-label">SIGN IN</label>
                            <hr/>
                            <input className = "login-input-text" type="text" placeholder="Enter Username" name="email" style={{color:this.state.emailColor}}
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           emailColor : re.test(this.state.email) ? 'black' : 'Red',
                                           email: event.target.value
                                       })
                                   }}/><span id="emailErr"/>

                            <input className = "login-input-text" type="password" placeholder="Enter Password" name="password"
                                   onChange={(event) => {
                                       this.setState({
                                           ...this.state,
                                           password: event.target.value
                                       })
                                   }}/><span id="passwordErr"/>


                            <button type="button" onClick={()=>{this.handleLogin()}}>Login</button>
                            <span className="sign-in-password">Don't have an account ?
                                <Link to={'/signup'} component={SignUp}>
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login_success: login_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
