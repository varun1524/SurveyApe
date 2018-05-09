import React, { Component } from 'react';
import * as API from './api/API';
import { Route, withRouter, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './App.css';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import VerifyAccount from './components/verifyaccount'
import CreateSurvey from './components/createsurvey/createsurvey';
import SurveyResponse from './components/surveyresponse/surveyresponse';
import {login_success} from './actions/login';
import StatisticsHome from "./components/statistics/StatisticsHome";
import StatisticsDashboard from "./components/statistics/StatisticsDashboard";

class App extends Component {

    handlePageChange = ((page)=>{
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
        API.validateSession().then((response) => {
            console.log(response.status);
            if(response.status === 200){
                response.json().then((data) => {
                    this.props.login_success(data);
                });
            }
            else {
                console.log("[App] : User not logged in")
            }
        });
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
                        <SignUp
                            handlePageChange = {this.handlePageChange}
                        />)}
                    />
                    <Route path= "/login" render = {() => (
                        <Login
                            handlePageChange = {this.handlePageChange}
                        />)}
                    />
                    <Route path= "/home" render = {() => (
                        <Home
                            handlePageChange = {this.handlePageChange}
                            validateSession = {this.validateSession}
                        />)}
                    />
                    <Route path= "/verifyaccount/:token" render = {(match) => (
                        <VerifyAccount
                            handlePageChange = {this.handlePageChange}
                            {...match}
                        />)}
                    />
                    <Route path= "/survey/:survey_id" render = {(match) => (
                        <SurveyResponse
                            handlePageChange = {this.handlePageChange}
                            validateSession = {this.validateSession}
                            {...match}
                        />)}
                    />
                    <Route exact path= "/surveyresponse/:response_id" render = {(match) => (
                        <SurveyResponse
                            handlePageChange = {this.handlePageChange}
                            validateSession = {this.validateSession}
                            {...match}
                        />)}
                    />
                    <Route exact path= "/surveyresponse/c/:cresponse_id" render = {(match) => (
                        <SurveyResponse
                            handlePageChange = {this.handlePageChange}
                            validateSession = {this.validateSession}
                            {...match}
                        />)}
                    />
                    <Route exact path= "/surveyresponse/o/:oresponse_id" render = {(match) => (
                        <SurveyResponse
                            handlePageChange = {this.handlePageChange}
                            validateSession = {this.validateSession}
                            {...match}
                        />)}
                    />

                    <Route exact path= "/stats/response/:question_id" render = {() => (
                        <StatisticsDashboard
                            handlePageChange = {this.handlePageChange}
                            validateSession = {this.validateSession}
                        />)}
                    />

                    <Route exact path= "/stats/basic/:survey_id" render = {() => (
                        <StatisticsHome
                            handlePageChange = {this.handlePageChange}
                            validateSession = {this.validateSession}
                        />)}
                    />


                </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
