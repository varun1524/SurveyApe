import React, {Component} from 'react';
import * as API from "../api/API";
import { Route, withRouter, Switch} from 'react-router-dom';

import '../stylesheets/header.css';
import {connect} from "react-redux";


class Header extends Component {

    handleLogout = (()=>{
        console.log("Logout called");
        API.doLogout().then((response)=>{
            console.log(response.status);
            this.props.history.push("/login");
        });
    });

    render() {
        return(
            <div className="Header">
                <div className="header-child">
                    <a href="#" className="logo">SURVEYape</a>
                    <div className="header-child-right">
                        <input type="button" onClick={(()=>{this.handleLogout()})} value="Logout"/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {state : state};
}

export default withRouter(connect(mapStateToProps, null)(Header));