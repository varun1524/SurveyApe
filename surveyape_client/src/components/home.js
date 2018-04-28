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
        // console.log(this.state);
        // API.validateSession().then((response)=>{
        //     if(response.status===201){
        //         console.log("session active");
        //     }
        //     else if(response.status===203){
        //         this.props.handlePageChange("/");
        //     }
        //     else{
        //         console.log("Error");
        //     }
        // });
    }

    componentDidMount(){
        this.props.validateSession();
    }

    componentDidUpdate(){
    }

    componentWillUpdate(){
        // this.fetchDirectoryData(this.state.dirpath);
    }


    render() {
        console.log(this.props.state);

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
