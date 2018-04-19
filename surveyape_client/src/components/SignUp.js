import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Login from "./Login";

class SignUp extends Component{

    constructor(){
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            StudentID:"",
            DateOfBirth:"",
            Gender:"Male"
        };
    }

    componentWillMount(){
    }

    render(){
        return(
            <div class="move">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-offset-3 col-md-offset-3 col-lg-offset-3 col-sm-10 col-md-10 col-lg-10 col-xs-10">
                        <div className="panel panel-primary">
                            <div className="panel-body">
                                <div className="panel-heading col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                    {/*<input type="button" onClick={()=>this.props.handlePageChange("/login")}*/}
                                           {/*className="btn-link" value="Login"/>*/}
                                    {/*<Link to={'/prelogin/login'} component={Login}>Login</Link>*/}
                                    Student Signup
                                </div>
                            
                                <form className="form-horizontal" id="formb">
                                    <div className="form-group">
                                        <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="inputfirstname"
                                                id="inputfirstname"
                                                placeholder="First Name"
                                                required
                                                onChange={(event) => {
                                                    this.setState({
                                                            ...this.state,
                                                            firstname: event.target.value
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="inputlastname"
                                                id="inputlastname"
                                                placeholder="Last Name"
                                                required
                                                onChange={(event) => {
                                                    this.setState({
                                                            ...this.state,
                                                            lastname: event.target.value
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="inputUsername"
                                                id="inputUsername"
                                                placeholder="Email Id"
                                                required
                                                onChange={(event) => {
                                                    this.setState({
                                                            ...this.state,
                                                        email: event.target.value
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="inputPassword"
                                            id="inputPassword"
                                            placeholder="Password"
                                            required
                                            onChange={(event) => {
                                                this.setState({
                                                    ...this.state,
                                                    password: event.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                        <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="inputStudentID"
                                                id="inputStudentID"
                                                placeholder="StudentID"
                                                required
                                                onChange={(event) => {
                                                    this.setState({
                                                            ...this.state,
                                                            StudentID: event.target.value
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                       
                                       <div className="form-group">
                                        <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                            <input
                                                type="date"

                                                className="form-control"
                                                name="DateOfBirth"
                                                id="DateOfBirth"
                                                placeholder="DateOfBirth"
                                                required
                                                onChange={(event) => {
                                                    this.setState({
                                                            ...this.state,
                                                            DateOfBirth: event.target.value
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                   <div className="form-group">
                                        <div className="col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
                                            <select className="dropdown"
                                                    name="gender"
                                                    id="gender"
                                                    onChange={(event) => {
                                                        this.setState({
                                                            ...this.state,
                                                            gender: event.target.value
                                                        })
                                                    }} >
                                            <option>Select Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            </select>
                                            
                                            
                                        </div>
                                    </div>
                                   
                                    {/*<div className="form-group">
                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                            <input type="password" className="form-control"
                                                   name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"
                                                   onChange="verifyPassword()"/>
                                                <span className="label-info" id="spanpasswordmatch"></span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-8 col-md-8 col-lg-8">
									<textarea className="form-control"
                                              name="inputaddress" id="inputaddress" placeholder="Address"></textarea>
                                        </div>
                                    </div>*/}


                                    <div className="form-group">
                                        <div className="col-xs-offset-3 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                                            <input type="button" id="button" className="btn btn-primary col-sm-8 col-md-8 col-lg-8"
                                                   onClick={()=>this.props.handleSignUp(this.state)} value="Sign Up"/>


                                        </div>
                           <div className="login-font"> Already a member  <Link to={'/home/login'} id="link" component={Login}>Login</Link></div>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}


export default SignUp;