import React, {Component} from 'react';
import HeaderComponent from './header';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as API from '../api/API';
import '../stylesheets/signin.css';
import {alert_types} from '../config/alert_types';
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "./../config/alertConfig";


class VerifyAccount extends Component {

    constructor() {
        super();
        this.state = {
            message : ""
        }
    }


    componentDidMount(){


    }

    verifyAccount = ((tokenData)=>{
        console.log(tokenData);

        API.verifyAccount(tokenData).then((response) => {
            console.log(response.status);
            if(response.status===200){
                console.log("User Verified Successfully");
                // response.json().then((data)=>{
                //     console.log(data);
                //     alert(data.message);
                // });
                showAlert("User Verified Successfully",alert_types.SUCCESS, this);
                setTimeout((()=>{
                    this.props.handlePageChange("/login");
                }), 750)
            }
            else if(response.status === 300) {
                console.log("All ready verified");
                // response.json().then((data)=>{
                //     console.log(data);
                //     alert(data.message);
                // });
                showAlert("User already verified",alert_types.SUCCESS, this);
                setTimeout((()=>{
                    this.props.handlePageChange("/login");
                }), 750)
            }
            else {
                console.log("Error");
                // response.json().then((data)=>{
                //     console.log(data);
                //     alert(data.message);
                // });
                showAlert("Error in User verification. Please try again",alert_types.SUCCESS, this);
                setTimeout((()=>{
                    this.props.handlePageChange("/login");
                }), 750);
                this.props.handlePageChange("/login");
            }
        });
    });

    render() {
        return (
            <div className="DemoSignIn">
                <HeaderComponent
                    handlePageChange={this.props.handlePageChange}
                />
                <div className="sign-in-form">
                    {this.verifyAccount(this.props.match.params.token)}
                </div>
                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        state: state
    };
}


export default withRouter(connect(mapStateToProps, null)(VerifyAccount));
