import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import CreateSurvey from './createsurvey/createsurvey';

import '../stylesheets/home.css';
import SurveyorDashboard from './userdashboard/surveyordashboard';
import SurveyeeDashboard from './userdashboard/surveyeedashboard';
import Header from './header';
import * as API from "../api/API";

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
        // this.props.validateSession();
        console.log("home.js - componentDidMount");
        API.getSurveyList().then((response) => {
            console.log(response.status);
            if(response.status === 200){
                response.json().then((data) => {
                    console.log("data", data.created_surveys);
                    this.setState({
                        ...this.state,
                        created_surveys : data.created_surveys,
                        requested_surveys : data.requested_surveys
                    })
                });

            }
            else if(response.status === 404) {
                this.setState({
                    ...this.state,
                    isLoggedIn : false,
                    email : ""
                });

            }
            else {

            }
        });

    }

    render() {
        console.log(this.props.state);

        return (
            <div className="User">
                <Header
                    handlePageChange = {this.props.handlePageChange}
                    loggedIn = {true}
                />
                <div className="welcome-user">
                    <h3>Welcome back, <strong>{this.props.state.user.firstname}</strong> !</h3>
                </div>
                <Switch>
                    <Route exact path="/home" render = {()=> (
                        <div>
                            <SurveyorDashboard
                                created_surveys = {this.state.created_surveys}
                                handlePageChange = {this.props.handlePageChange}
                            />
                            <SurveyeeDashboard/>
                        </div>
                    )}/>
                    <Route path="/home/dash" render = {()=> {
                        return(
                            <div>
                                <SurveyorDashboard/>
                                <SurveyeeDashboard/>
                            </div>
                        )
                    }}/>
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

            </div>

        );
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return {state : state};
}

export default withRouter(connect(mapStateToProps, null)(Home));
