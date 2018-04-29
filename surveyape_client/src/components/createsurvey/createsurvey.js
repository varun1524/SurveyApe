import React, {Component} from 'react';
import QuestionSidebar from "./questionsidebar";
import QuestionDashboard from "./questiondashboard";
import Header from "../header";

import '../../stylesheets/createsurvey/createsurvey.css';

class createsurvey extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        console.log("match", this.props);
        console.log("context", this.props.context);
    }

    render() {
        console.log("render createsurvey");
        return (
            <div className="createsurvey">
                <div className="welcome-user">
                </div>
                <div className="user_body">
                    <div className="user_body_navbar">
                        <QuestionSidebar handlePageChange={this.props.handlePageChange}/>
                    </div>

                    <div className="user_body_dashboard">
                        <QuestionDashboard/>
                    </div>

                </div>

            </div>
        )
    }

}

export default createsurvey;