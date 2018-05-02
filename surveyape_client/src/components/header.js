import React, {Component} from 'react';
import * as API from "../api/API";
import { Route, withRouter, Switch} from 'react-router-dom';
import {createSurvey} from './../actions/survey';
import CreateSurveyModal from 'react-modal';
import '../stylesheets/header.css';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.4)'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        color                 : 'black',
        padding               : '0px',
        alignContent          : 'center'
    }


};

class Header extends Component {

    constructor() {
        super();
        this.state = {
            createSurveyModalOpen : false,
            survey_name:"",
            survey_type:""
        }

        this.openCreateSurveyModal = this.openCreateSurveyModal.bind(this);
    }

    openCreateSurveyModal() {
        this.setState({
            ...this.state,
            createSurveyModalOpen : true
        })
    }

    closeCreateSurveyModal() {
        this.setState({
            ...this.state,
            createSurveyModalOpen : false
        })
    }

    handleLogout = (()=>{
        console.log("Logout called");
        API.doLogout().then((response)=>{
            console.log(response.status);
            this.props.history.push("/login");
        });
    });


    createSurvey(){
        API.createSurvey({
                survey_name:this.state.survey_name,
                survey_type:this.state.survey_type
            }
        ).then((response)=>{
            if(response.status === 200){
                console.log("Survey created successfully : survey - ");
                response.json().then((data)=>{
                    console.log(data);
                    this.props.createSurvey(data);
                    this.closeCreateSurveyModal();
                    this.props.handlePageChange("/home/createsurvey");
                })
            }
        });
    }

    showLoggedInHeader = (()=>{
        console.log("Header: ", this.props);
        console.log(this.props.loggedIn);
        if(this.props.hasOwnProperty("loggedIn")){
            if(this.props.loggedIn){
                return(<div>
                    <div className="header-child-right">
                        <input type="button" className="create-survey-button" onClick={() => {this.openCreateSurveyModal()}} value="Create Survey"/>
                        <input type="button" className="logout-button" onClick={()=>{this.handleLogout()}} value="Logout"/>
                    </div>
                </div>)
            }
        }
    });

    render() {
        return(
            <div className="Header">
                <div className="header-child">
                    <a href="#" className="logo">SURVEYape</a>
                    {this.showLoggedInHeader()}
                </div>

                <CreateSurveyModal
                    isOpen={this.state.createSurveyModalOpen}
                    onAfterOpen={this.openCreateSurveyModal}
                    onRequestClose={this.closeCreateSurveyModal}
                    style={customStyles}
                >
                    <div className="modal-header">
                        <span className="close" onClick={() => {this.closeCreateSurveyModal()}}>&times;</span>
                        <h3>CREATE SURVEY</h3>
                    </div>
                    <div className="modal-body">

                        <label>Survey Name</label>
                        <input type="text" onChange={(event)=>{
                            this.state.survey_name = event.target.value;
                        }}/>

                        <label>Survey Type</label>
                        <input type="text" onChange={(event)=>{
                            this.state.survey_type = event.target.value;
                        }}/>

                        <input type="button" className="submit-create-survey" value="Submit" onClick={()=>{
                            this.createSurvey()
                        }}/>
                    </div>
                </CreateSurveyModal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {state : state};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createSurvey: createSurvey
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));