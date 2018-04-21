import React, {Component} from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import * as API from '../api/API';
import Login from './Login';
import User from './User';
import {login_success, logout_success} from "../actions/login";
import {connect} from 'react-redux';

class MainPage extends Component {

    state={
        isLoggedIn:false,
        email:"",
        message:""
    };

    handleSignUp=((userdata)=>{
        console.log(userdata);

        API.doSignUp(userdata)
            .then((response) => {

                if (response.status === 200) {
                    this.setState({
                        ...this.state,
                        isLoggedIn: true,
                        message: "You have successfully signed up. Please login here",
                        email: userdata.email
                    });
                    this.handlePageChange("/home/login")
                } else if (response.status === 400) {
                    console.log("State");
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "Error while adding userdata"
                    });
                    // this.props.history.push("/signup")
                }
                else if(response.status === 301){
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "Email Id already exists. Try to sign up with another Email Id"
                    });
                    // this.props.history.push("/signup")
                }
                else
                {
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "Error while signing up."
                    });
                }
            });
    });

    handleLogin=((loginData)=>{
        console.log(loginData);

        API.doLogin(loginData)
            .then((res) => {
                console.log(res.status);
                if(res.status === 200){
                    this.setState({
                        ...this.state,
                        isLoggedIn: true,
                        message: ("Welcome to my App " + loginData.email),
                        email: loginData.email
                    });
                    // sessionStorage.setItem('username',loginData.username);
                    res.json().then((data)=>{
                        console.log(data);
                        this.props.login_success(data);
                    });

                    this.handlePageChange("/user/home")
                }
                else if(res.status===400){
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "username or password is invalid"
                    });
                    // this.props.history.push("/login")
                }
                else if(res.status===404){
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "Error on server side while fetching data"
                    });
                    // this.props.history.push("/login")
                }
            });
    });

    handleLogout=(()=>{
        API.doLogout()
            .then((res) => {
                if(res.status===200){
                    // sessionStorage.removeItem('username');
                    this.setState({
                        ...this.state,
                        isLoggedIn: false,
                        message: "User Logged out"
                    });
                    this.props.LOGIN_SUCCESS([]);
                    this.props.setResolvedIssues([]);
                    this.handlePageChange("/");
                }
                else if(res.status===400){
                    this.setState({
                        ...this.state,
                        isLoggedIn: true,
                        message: "Error on server side while fetching data"
                    });
                }
            });
    });

    handlePageChange=((page)=>{
        this.props.history.push(page);
    });

    doesSessionExist = (()=>{
        API.validateSession().then((response) => {
            console.log(response.status);
            if(response.status === 200){
                response.json().then((data) => {
                    this.props.login_success(data);
                });
                this.handlePageChange("/user/home");
            }
            else if(response.status === 404) {
                this.setState({
                    ...this.state,
                    isLoggedIn : false,
                    email : ""
                });
                this.handlePageChange("/home/signup");
            }
        });
    });

    componentDidMount(){

    }

    render(){
        return(
            <div>
                {/*<AlertContainer ref={a => this.msg = a} {...alertOptions}/>*/}
                <Switch>
                    <Route exact path="/" render={() =>(
                        <div>
                            {this.doesSessionExist()}
                        </div>
                    )}/>
                    <Route path="/home" render={() => (
                        <div>
                            <div className="container-fluid">
                                <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12">
                                    <div className="row">
                                        <div className= "col-lg-1 col-md-1 col-xs-1 col-sm-1" id="logo">

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-7 col-xs-7 col-md-7 col-sm-7">
                                        </div>
                                        <div className="col-lg-5 col-xs-5 col-md-5 col-sm-5">
                                            <Switch>
                                                <Route path= "/home/signup" render={() => (
                                                    <div>
                                                        <SignUp
                                                            handleSignUp={this.handleSignUp}
                                                            handlePageChange={this.handlePageChange}
                                                        />
                                                    </div>
                                                )}/>
                                                <Route path="/home/login" render={() => (
                                                    <div>
                                                        <Login
                                                            handleLogin={this.handleLogin}
                                                            handlePageChange={this.handlePageChange}
                                                        />
                                                    </div>
                                                )}/>
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}/>
                    <Route path="/user" render={() => (
                        <div>
                            <User
                                email={this.state.email}
                                handleLogout={this.handleLogout}
                                handlePageChange={this.handlePageChange}
                                doesSessionExist={this.doesSessionExist}
                            />
                        </div>
                    )}/>
                </Switch>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login_success : (data) => dispatch(login_success(data)),
        logout_success: (data) => dispatch(logout_success(data)),
    };
}

function mapStateToProps(state) {
    console.log(state);
    return {state : state};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));