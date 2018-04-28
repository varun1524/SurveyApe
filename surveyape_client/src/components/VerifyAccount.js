import React, {Component} from 'react';
import HeaderComponent from './header';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as API from '../api/API';
import '../stylesheets/signin.css';
import {Alert} from 'reactstrap';

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
                response.json().then((data)=>{
                   console.log(data);
                   alert(data.message);
                });
                this.props.handlePageChange("/login");
            }
            else if(response.status === 300) {
                console.log("All ready verified");
                response.json().then((data)=>{
                    console.log(data);
                    alert(data.message);
                });
                this.props.handlePageChange("/login");
            }
            else {
                console.log("Error");
                response.json().then((data)=>{
                    console.log(data);
                    alert(data.message);
                });
                this.props.handlePageChange("/login");
            }
        });
    });

    render() {
        return (
            <div className="DemoSignIn">
                <HeaderComponent />
                <div className="sign-in-form">
                    {this.verifyAccount(this.props.match.params.token)}
                </div>
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
