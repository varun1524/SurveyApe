import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Header from '../header';
import * as API from "../../api/API";
import {bindActionCreators} from "redux";
import {login_success} from "../../actions/login";
import {createSurveyResponse, generateSurveyForm} from "../../actions/surveyresponse";
import '../../stylesheets/statistics/StatisticsDashboard.css';

import {connect} from "react-redux";
import BarChart from "../graph/bargraph";

class StatisticsDashboard extends Component {

    constructor(){
        super();
        this.state = {
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
                if(response.status===200){
                    response.json().then((data)=>{
                        console.log("StatisticHome] componentDidMount() after api call data: ",data);
                        if(data){
                            this.setData(data);
                        }


                    })
                }

            }).catch((error)=>{
                console.log("[StatisticDashboard] componentDidMount error: ",error);
        })


    }

    setData(data){
        if(data.question && ((data.question.question_type === "CheckBox")||(data.question.question_type === "DropDown")||data.question.question_type === "RadioGroup")){
            this.setCheckRadioDropDownData(data);
        }else if(data.question && (data.question.question_type === "YesNo")){
            this.setYesNoData(data);
        }else if(data.question && (data.question.question_type === "StarRating")){
            this.setstarData(data);
        }else{
            this.setState({
                ...this.state,
                answers:data.answers
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
        }else{
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
        let option_labels = ["Yes","No"]
        let datasets = [0,0]

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
        let option_labels = ["1","2","3","4","5"]
        let datasets = [0,0,0,0,0]
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
            }else{
                return(
                    <BarChart data={this.state.data}/>
                )
            }

        }else{
            return(

                    this.state.answers.map((each_answer)=>{
                       return <p style={{marginLeft:"10%",marginTop:"5%"}}>{each_answer}</p>
                    })

            )

        }
    }

    render() {
        console.log("[StatisticsDashboard] render", this.state);

        return (
            <div className="StatisticsHome">
                <Header
                    handlePageChange = {this.props.handlePageChange}
                    loggedIn = {true}
                />
                <div className="statistics-dashboard-question-label">
                    <h4><strong>{this.state.question?this.state.question.question_text:""}</strong></h4>
                </div>

                <div className="statistics-dashboard-graph-div">
                    {this.getDasboardView()}

                </div>
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
