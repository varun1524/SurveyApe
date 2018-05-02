import React, {Component} from 'react';
import QuestionSidebar from "./questionsidebar";
import QuestionDashboard from "./questiondashboard";
import {withRouter} from "react-router-dom";
import '../../stylesheets/createsurvey/createsurvey.css';

class createsurvey extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        if(this.props.match.params.hasOwnProperty("survey_id")){
            console.log("craete survey -> survey_id: ", this.props.match.params.survey_id);
        }
        else {
            console.log("props", this.props);
        }
    }

    render() {
        console.log("render createsurvey");
        return (
            <div className="createsurvey">
                <div className="user_body">
                    <div className="user_body_navbar">
                        <QuestionSidebar handlePageChange={this.props.handlePageChange}/>
                    </div>

                    <div className="user_body_dashboard">
                        <QuestionDashboard
                            param = {this.props.match.params}
                        />
                    </div>

                </div>

            </div>
        )
    }
}

export default withRouter(createsurvey);