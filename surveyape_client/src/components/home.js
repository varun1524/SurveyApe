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
import {update_surveyor_dashboard} from '../actions/login';

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
        console.log("[Home] - componentDidMount");
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

            }
            else {

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
    return bindActionCreators({update_surveyor_dashboard: update_surveyor_dashboard}, dispatch)
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
