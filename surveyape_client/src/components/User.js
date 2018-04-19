import React, {Component} from 'react';
import * as API from '../api/API';
import { Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

class User extends Component {

    constructor(){
        super();
        this.state = {
        };
    }

    componentWillMount(){
        console.log(this.state);
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
        console.log(this.props);

        return (
            <div className="container-fluid">
                Hello I am {this.props.state.user.firstname}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {state : state};
}

export default withRouter(connect(mapStateToProps, null)(User));