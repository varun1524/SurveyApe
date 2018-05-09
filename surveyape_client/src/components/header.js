import React, {Component} from 'react';
import * as API from "../api/API";
import { Route, withRouter, Switch} from 'react-router-dom';
import {createSurvey} from './../actions/survey';
import CreateSurveyModal from 'react-modal';
import '../stylesheets/header.css';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {update_surveyor_dashboard} from "../actions/login";

import {alert_types} from './../config/alert_types';
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../config/alertConfig";

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
        alignContent          : 'center',
        width                 : '50%',
        height                : '50%'
    }


};

class Header extends Component {

    constructor() {
        super();
        this.state = {
            createSurveyModalOpen : false,
            survey_name:"",
            survey_type:"",
            end_date:""
        };

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
            showAlert("Logout successful", alert_types.SUCCESS, this);
            setTimeout((()=>{
                this.props.history.push("/login");
            }),500);
        });
    });

    handleHomeButtonClick(){
        console.log("[Header] - handleHomeButtonClick() server request");
        this.props.handlePageChange("/home");
            API.getSurveyList().then((response) => {
                console.log(response.status);
                if(response.status === 200){
                    response.json().then((data) => {
                        console.log("[Header] - handleHomeButtonClick created_surveys", data.created_surveys);

                        this.props.update_surveyor_dashboard(data.created_surveys,data.requested_surveys);
                    });

                }
                else if(response.status === 404) {


                }
                else {

                }
            });


    }
    validaterCreateSurveyForm(){
        if(!this.state.survey_name || this.state.survey_name.length <=0){
            showAlert("Survey Name can not be left blank !!!", alert_types.INFO, this);
            // alert("Survey Name can not be left blank !!!");
            return false;
        }else if(!this.state.survey_type || this.state.survey_type.length <=0){
            showAlert("You must choose a survey type !!!", alert_types.INFO, this);
            // alert("You must choose a survey type !!!");
            return false;
        }
        return true
    }

    createSurvey(){
        console.log("[Header] Before API call creater survey data:",this.state);

        if(this.validaterCreateSurveyForm()){
            API.createSurvey({
                    survey_name:this.state.survey_name,
                    survey_type:this.state.survey_type,
                    end_date: this.state.end_date
                }
            ).then((response)=>{
                if(response.status === 200){
                    console.log("[Header] Survey created successfully status 200: survey - ");
                    response.json().then((data)=>{
                        console.log(data);
                        this.props.createSurvey(data);
                        this.closeCreateSurveyModal();

                        showAlert("Survey created successfully", alert_types.SUCCESS, this);
                        setTimeout(() => {
                            this.props.handlePageChange("/home/createsurvey");
                        }, 500);
                    })
                }
                else {
                    showAlert("Failed to create a survey. Please try again", alert_types.ERROR, this);
                    this.closeCreateSurveyModal();
                }
            });
        }

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
        console.log("[Header] render")
        return(
            <div className="Header">
                <div className="header-child">
                    <a className="logo" onClick={() => {

                        this.handleHomeButtonClick()
                    }}>SURVEYape</a>
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
                        <input type="text"
                               className="survey-name-input-box"
                               onChange={(event)=>{this.state.survey_name = event.target.value;}}
                               placeholder="Enter the survey name"
                        />

                        <label>Survey Type</label>
                        <select name="survey-dropdown"
                                className="survey-type-dropdown"
                                onChange={(event)=>{this.state.survey_type = event.target.value;}}
                        >
                            <option value="">Select the survey type</option>
                            <option value="general">General</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                        {/*<input type="text" onChange={(event)=>{*/}
                            {/*this.state.survey_type = event.target.value;*/}
                        {/*}}/>*/}

                        <label>End Date</label>
                        <input type="date" className="survey-name-input-box" onChange={(event) => {this.state.end_date = event.target.value}}/>

                        <input type="button" className="submit-create-survey" value="Submit" onClick={()=>{
                            this.createSurvey()
                        }}/>

                        <input type="button" className="cancel-create-survey" value="Cancel" onClick={()=>{
                            this.closeCreateSurveyModal()
                        }}/>
                    </div>
                </CreateSurveyModal>
                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("[Header] mapStateToProps")
    return {state : state};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createSurvey: createSurvey,
        update_surveyor_dashboard:update_surveyor_dashboard
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));