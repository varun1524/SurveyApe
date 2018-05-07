import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
/*
expected data while creting this component
var data={
    labels: [],
    datasets:[],
    labelName:"Revenue",
    header_text:"Question statistics"
}

*/
class BarChart extends Component{
  constructor(){
    super();
    this.chartColor = ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"];

    this.state={
      data:{
        labels:[],
        datasets: [{
          label:"",
          data:[],
          backgroundColor:this.chartColor
        }]
      }
    }
  }

  createBarchartData(data){
    let bar_graph_data = this.state.data;
    if(data && data.datasets && data.datasets.length>0 && data.labels && data.labels.length>0){
      bar_graph_data.labels = data.labels;
      bar_graph_data.datasets[0].data = data.datasets;
    }
    return bar_graph_data;

}





render(){
  console.log("[Bargraph] render ",this.props.data);
  console.log("[Bargraph] render graph data",this.state.data)
  //this.createBarchartData(this.props.data);
  return (
    <div className="chart">
      <Bar
        data={this.createBarchartData(this.props.data)}
        options={{
          title:{
            display:true,
            text:"Monthly task status",
            fontSize:25
          },
          legend:{
            display:true,
            position:"right"
          },
          scales:{
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                steps:10,
                stepValue:5,
              }
            }],
          }
        }}
      />
      </div>
  )
}
}

export default BarChart;
