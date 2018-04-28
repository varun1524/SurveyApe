import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';


import '../stylesheets/home.css';
import QuestionComponent from "./createsurvey/questioncomponent";
import QuestionSidebar from "./createsurvey/questionsidebar";
import QuestionDashboard from './createsurvey/questiondashboard';
import SurveyorDashboard from './userdashboard/surveyordashboard';
import SurveyeeDashboard from './userdashboard/surveyeedashboard';
import Header from './header';

class Home extends Component {

    constructor(){
        super();
        this.state = {
        };
    }

    componentWillMount(){
    }

    componentDidMount(){
        this.props.validateSession();
    }

    render() {
        console.log(this.props.state.user);

        return (
            <div className="User">
                <Header />
                <div className="welcome-user">
                    <h3>Welcome, </h3> <h5>{this.props.state.user.firstname}</h5>
                </div>

                <SurveyorDashboard />
                <SurveyeeDashboard />
            </div>

        );
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return {state : state};
}

export default withRouter(connect(mapStateToProps, null)(Home));
