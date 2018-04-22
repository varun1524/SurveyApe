import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';


import '../stylesheets/User.css';
import QuestionComponent from "./QuestionComponent";
import QuestionSidebar from "./QuestionSidebar";
import QuestionDashboard from './QuestionDashboard';
import Header from './Header';

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
                <div>
                    <Header />

                    Hello I am {this.props.state.user.firstname}
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

        );
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return {state : state};
}

export default withRouter(connect(mapStateToProps, null)(Home));
