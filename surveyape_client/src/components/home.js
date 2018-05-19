import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import CreateSurvey from './createsurvey/createsurvey';
import {bindActionCreators} from "redux";
import '../stylesheets/home.css';
import SurveyorDashboard from './userdashboard/surveyordashboard';
import SurveyeeDashboard from './userdashboard/surveyeedashboard';
import Header from './header';
import * as API from "../api/API";

import {addQuestion} from "../actions/survey";
import {alert_types} from './../config/alert_types';
import {update_surveyor_dashboard} from './../actions/login';
import {login_success} from './../actions/login';
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "./../config/alertConfig";

class Home extends Component {

    constructor(){
        super();
        this.state = {
            created_surveys : [],
            requested_surveys : []
        };
    }

    componentWillMount(){
    }

    componentDidMount(){
        console.log("[Home] - componentDidMount");
        API.validateSession().then((response) => {
            console.log(response.status);
            if(response.status === 200){
                response.json().then((data) => {
                    this.props.login_success(data);
                });
                API.getSurveyList().then((response) => {
                    console.log(response.status);
                    if(response.status === 200){
                        response.json().then((data) => {
                            console.log("[Home] - componentDidMount created_surveys", data.created_surveys);
                            /*this.setState({
                                ...this.state,
                                created_surveys : data.created_surveys,
                                requested_surveys : data.requested_surveys
                            })*/
                            this.props.update_surveyor_dashboard(data.created_surveys,data.requested_surveys);
                        });

                    }
                    else if(response.status === 404) {
                        this.setState({
                            ...this.state,
                            isLoggedIn : false,
                            email : ""
                        });
                        showAlert("Error while getting Survey and Response List", )
                    }
                    else {
                        showAlert("Error while getting Survey and Response List", )
                    }
                });
            }
            else if(response.status === 401) {
                this.setState({
                    ...this.state,
                    isLoggedIn : false,
                    email : ""
                });
                this.props.handlePageChange("/login");
            }
            else {
                this.props.handlePageChange("/login");
            }
        });


    }

    render() {
        console.log("[Home] render",this.props.state);

        return (
            <div className="User">
                <Header
                    handlePageChange = {this.props.handlePageChange}
                    loggedIn = {true}
                />
                <div className="welcome-user">
                    <h3>Welcome back, <strong>{this.props.state.user.user.firstname}</strong> !</h3>
                </div>
                <Switch>
                    <Route exact path="/home" render = {()=> (
                        <div>
                            <SurveyorDashboard
                                // created_surveys = {this.props.userdashboardDetail.created_surveys}
                                handlePageChange = {this.props.handlePageChange}
                            />
                            <SurveyeeDashboard
                                handlePageChange = {this.props.handlePageChange}
                            />
                        </div>
                    )}/>
                    {/*<Route path="/home/dash" render = {()=> {*/}
                    {/*return(*/}
                    {/*<div>*/}
                    {/*<SurveyorDashboard/>*/}
                    {/*<SurveyeeDashboard/>*/}
                    {/*</div>*/}
                    {/*)*/}
                    {/*}}/>*/}
                    <Route path= "/home/createsurvey/:survey_id" render = {(match) => (
                        <CreateSurvey
                            handlePageChange = {this.props.handlePageChange}
                            validateSession = {this.props.validateSession}
                            {...match}
                        />)}
                    />
                    <Route path= "/home/createsurvey" render = {() => (
                        <CreateSurvey
                            handlePageChange = {this.props.handlePageChange}
                            validateSession = {this.props.validateSession}
                        />)}
                    />
                </Switch>
                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("[home] mapStateToProps state : ", state);
    return {
        state : state,
        userdashboardDetail:state.user
    };
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            update_surveyor_dashboard: update_surveyor_dashboard,
            login_success:login_success
        }
        , dispatch)
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
