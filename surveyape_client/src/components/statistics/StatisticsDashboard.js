import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Header from '../header';
import * as API from "../../api/API";
import {bindActionCreators} from "redux";
import {login_success} from "../../actions/login";
import {createSurveyResponse, generateSurveyForm} from "../../actions/surveyresponse";
import '../../stylesheets/statistics/StatisticsDashboard.css';
import {Glyphicon} from "react-bootstrap";

import {connect} from "react-redux";
import BarChart from "../graph/bargraph";
import {alert_types} from '../../config/alert_types';
import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "../../config/alertConfig";

class StatisticsDashboard extends Component {

    constructor(){
        super();
        this.state = {
            survey_id:"",
            survey_participants:0,
            question_participants:0,
            question:{},
            answers:[],
            imagedataset:[],
            data:{
                labels: [],
                datasets:[],
                labelName:"Response",
                header_text:"Question Response Statistics"
            }
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        console.log("[StatisticHome] param: ",this.props.match.params);
        console.log("[StatisticHome] param hasProperty question_id :", this.props.match.params.hasOwnProperty("question_id"));

        API.getQuestionResponseDitribution(this.props.match.params.question_id)
            .then((response)=>{
                console.log("[StatisticHome] componentDidMount() Response status: ",response.status);
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log("StatisticHome] componentDidMount() after api call data: ",data);
                        if(data){
                            this.setState({
                                ...this.state,
                                survey_id:data.survey_id,
                                survey_participants:data.survey_participants,
                                question_participants:data.question_participants
                            });
                            this.setQuestionData(data);
                        }
                    })
                }
                else if(response.status===401){
                    this.setState({
                        ...this.state,
                        loggedIn : false
                    });
                    showAlert("User not authorized to access this page. Please login", alert_types.ERROR, this);
                    setTimeout((()=>{
                        this.props.handlePageChange("/login");
                    }),750);
                }
            }).catch((error)=>{
            console.log("[StatisticDashboard] componentDidMount error: ",error);
        })
    }

    setQuestionData(data){
        if(data.question && ((data.question.question_type === "CheckBox")||(data.question.question_type === "DropDown")||data.question.question_type === "RadioGroup")){
            this.setCheckRadioDropDownData(data);
        }else if(data.question && (data.question.question_type === "YesNo")){
            this.setYesNoData(data);
        }else if(data.question && (data.question.question_type === "StarRating")){
            this.setstarData(data);
        }else{
            this.setState({
                ...this.state,
                answers:data.answers,
                question:data.question
            });
        }
        console.log("[setData]")
    }


    setCheckRadioDropDownData(data){
        console.log("[StatisticDashBoard] setCheckRadioDropDownData() data:",data);
        let server_dataset = data.response_count;
        let option_labels = [];
        let imagedataset = [];
        if(data.options_list && data.options_list.length>0 && data.options_list[0].option_type ==="image"){
            let imgCount = 1;
            data.options_list.map((each_opt)=>{
                imagedataset.push(each_opt);
                option_labels.push(imgCount++);
            });
        }
        else{
            data.options_list.map((each_opt)=>{
                let trimed_option_text = each_opt.option_text.length > 10?each_opt.option_text.slice(0,10):each_opt.option_text;
                option_labels.push(trimed_option_text);
            });
        }

        let new_data = this.state.data;
        new_data.labels = option_labels;
        new_data.datasets = server_dataset;
        this.setState({
            ...this.state,
            data:new_data,
            question:data.question,
            imagedataset:imagedataset
        });
    }

    setYesNoData(data){
        console.log("[StatisticDashBoard] setYesNoData() data:",data.answers);
        let server_dataset = data.answers;
        let option_labels = ["Yes","No"];
        let datasets = [0,0];

        if(server_dataset){
            server_dataset.map((answer)=>{
                if(answer.toString().toLowerCase() === "yes"){
                    datasets[0] +=1;
                }else{
                    datasets[1] +=1;
                }
            });
            let new_data = this.state.data;
            new_data.labels = option_labels;
            new_data.datasets = datasets;
            this.setState({
                ...this.state,
                data:new_data,
                question:data.question
            });
        }
    }


    setstarData(data){
        console.log("[StatisticDashBoard] setstarData() data:",data);
        let server_dataset = data.answers;
        let option_labels = ["1","2","3","4","5"];
        let datasets = [0,0,0,0,0];
        if(server_dataset){
            server_dataset.map((answer)=>{
                if(answer.toString().toLowerCase() === "1"){
                    datasets[0] +=1;
                }else if(answer.toString().toLowerCase() === "2"){
                    datasets[1] +=1;
                }else if(answer.toString().toLowerCase() === "3"){
                    datasets[2] +=1;
                }else if(answer.toString().toLowerCase() === "4"){
                    datasets[3] +=1;
                }else if(answer.toString().toLowerCase() === "5"){
                    datasets[4] +=1;
                }
            });
            let new_data = this.state.data;
            new_data.labels = option_labels;
            new_data.datasets = datasets;
            this.setState({
                ...this.state,
                data:new_data,
                question:data.question

            });
        }

    }

    getImageList(){
        console.log("[statisticdashboard] getImageList() this.state.imagedataset: ",this.state.imagedataset)
        return this.state.imagedataset.map((each_image,index)=>{
            console.log("[statisticdashboard] getImageList() each_image: ",each_image)
            return(
                <div className="statistics-dashboard-img-div">
                    <span className="statistics-dashboard-img-number">{index+1}</span>
                    <img src={each_image.option_text}
                         height="150"
                         width="150"
                         className="option-actual-image"
                         alt="Please select appropriate image"
                    />
                </div>
            )
        })
    }

    getCheckDropRadioImageView(){
        console.log("[statisticdashboard] getCheckDropRadioImageView() ")
        return (
            <div>
                <BarChart data={this.state.data}/>
                <div className="statisticboard-graph-image-list">
                    {this.getImageList()}
                </div>
            </div>
        )
    }

    getDasboardView(){
        console.log("[StatisticDashboard] getDasboardView() state: ",this.state);
        if(this.state.question && ((this.state.question.question_type === "CheckBox")||(this.state.question.question_type === "DropDown")||(this.state.question.question_type === "RadioGroup") || (this.state.question.question_type === "YesNo") ||  (this.state.question.question_type === "StarRating"))){
            if(this.state.imagedataset && this.state.imagedataset.length>0&&this.state.imagedataset[0].option_type==="image"){
                return this.getCheckDropRadioImageView();
            }
            else{
                return(
                    <BarChart data={this.state.data}/>
                )
            }
        }
        else{
            return(

                    this.state.answers.map((each_answer)=>{
                       return <p style={{
                           marginLeft:"10%",
                           marginTop:"2%",
                           width: "80%",
                           padding: "1%",
                           border: "1px solid #000000",
                           backgroundColor: "#f1f1f1",
                           fontFamily: "Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana, sans-serif",
                           fontWeight: "bold"
                       }}>{each_answer}</p>
                    })

            )
        }
    }

    showParticipationRate = (()=>{
        let rate = ((this.state.question_participants/this.state.survey_participants)*100);
        console.log("[StatisticHome] showParticipationRate: ", this.state.question_participants,
            this.state.survey_participants, rate.toFixed(2));
        return rate.toFixed(2);
    });

    render() {
        console.log("[StatisticsDashboard] render", this.state);
        return (
            <div className="StatisticsHome">
                <Header
                    handlePageChange = {this.props.handlePageChange}
                    loggedIn = {true}
                />

                <div className="statistics-dashboard">
                    <div className="statistics-dashboard-header-inner">
                        {/*<span className="statistics-survey_name">{this.state.survey_name}*/}
                            {/*<span className="statistics-survey-type"> [ {this.state.survey_type} ]</span>*/}
                        {/*</span>*/}

                        {/*<span className="statistics-date-label"><span style={{'font-size' : '14px'}}>Survey End Date: </span><strong>{this.state.end_date}</strong></span>*/}
                        {/*<span className="statistics-date-label"><span style={{'font-size' : '14px'}}>Survey Start Date: </span><strong>{this.state.start_time}</strong></span>*/}



                        {/*<div className="statistics-block-2">*/}
                            {/*<div className="no-of-participants">Participation Rate</div>*/}
                            {/*<span className="no-of-participants-count">{this.state.participation_rate} %</span>*/}
                        {/*</div>*/}

                        <div className="response-back-button-class">
                            <button className="response-back-button" onClick={(()=>{this.props.handlePageChange(this.props.handlePageChange("/stats/basic/"+this.state.survey_id))})}>Back</button>
                        </div>

                        <div className="statistics-block-1-inner">
                            <div className="no-of-participants-inner">Participation Rate:</div>
                            <span className="no-of-participants-count-inner">{this.showParticipationRate()}%</span>
                        </div>

                        <div className="statistics-dashboard-question-label">
                            <h3><span style={{color: "#2980B9"}}>Question : </span><strong>{this.state.question?this.state.question.question_text:""}</strong></h3>
                        </div>

                    </div>

                    <div className="statistics-dashboard-graph-div">
                        {this.getDasboardView()}
                    </div>
                </div>


                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
            </div>
        );
    }
}



function mapStateToProps(state) {
    console.log("[SurveyDashboard] state: ", state);
    return{
        survey: state.survey_surveyresponse.survey,
        survey_response : state.survey_surveyresponse.survey_response,
        user : state.user.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            createSurveyResponse: createSurveyResponse,
            generateSurveyForm : generateSurveyForm,
            login_success: login_success
        }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatisticsDashboard));
