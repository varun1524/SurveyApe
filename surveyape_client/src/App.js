import React, { Component } from 'react';
import * as API from './api/API';
import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';
import DemoSignIn from './components/DemoSignIn';
import DemoSignUp from './components/DemoSignUp';
import Home from './components/Home';

class App extends Component {

    handlePageChange=((page)=>{
        this.props.history.push(page);
    });

    validateSession = (()=>{
        API.validateSession().then((response) => {
            console.log(response.status);
            if(response.status === 200){
                response.json().then((data) => {
                    this.props.login_success(data);
                });
                this.handlePageChange("/home");
            }
            else if(response.status === 404) {
                this.setState({
                    ...this.state,
                    isLoggedIn : false,
                    email : ""
                });
                this.handlePageChange("/login");
            }
            else {
                this.handlePageChange("/login");
            }
        });
    });

    componentDidMount(){
        this.validateSession();
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path= "/" render={() =>(
                        <div>
                            {this.validateSession()}
                        </div>
                    )}/>

                    <Route path= "/signup" render = {() => (
                        <DemoSignUp
                            handlePageChange = {this.handlePageChange}
                        />)}
                    />
                    <Route path= "/login" render = {() => (
                        <DemoSignIn
                            handlePageChange = {this.handlePageChange}
                        />)}
                    />
                    <Route path= "/home" render = {() => (
                        <Home
                            handlePageChange = {this.handlePageChange}
                        />)}
                    />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
