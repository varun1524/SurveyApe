import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import CreateSurvey from './createsurvey/createsurvey';

import '../stylesheets/home.css';
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
        // this.props.validateSession();
    }

    render() {
        console.log(this.props.state);

        return (
            <div className="User">
                <Header
                    handlePageChange = {this.props.handlePageChange}
                />
                <div className="welcome-user">
                    <h3>Welcome, </h3> <h5>{this.props.state.user.firstname}</h5>
                </div>
                <Switch>
                    <Route exact path="/home" render = {()=> (
                        <div>
                            <SurveyorDashboard/>
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
