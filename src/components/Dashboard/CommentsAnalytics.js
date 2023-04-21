import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from "recharts";
import axios from 'axios';
import { backendHost } from '../../api-config';
class CommentsAnalytics extends React.Component {
  
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			lineChartData: [],
			DataisLoaded: false,
            
		};
	}
    componentDidMount() {

        fetch(`${backendHost}/analytics/all`)
        .then((res)=> res.json())
        .then((json) => {
          this.setState({
            lineChartData: json
          })
        })
        .catch(err => 
          null
        )  
     }

   
   

   render(){
    const { DataisLoaded, lineChartData } = this.state;
    
    return (
    <React.Fragment>
      <h3 style={{color:"blue"}}>Line chart (Doctor Comments)</h3>
      <ResponsiveContainer width="100%" aspect={2} >
       <LineChart data= {lineChartData} margin={{left:50, right:50, top:100, bottom:100}}>
         <CartesianGrid strokeDasharray="2 2"/>
         <Tooltip contentStyle={{backgroundColor:"lightgray"}}/>
       
       
         <Line dataKey="Comments" stroke="grey" activeDot={{r:5}} type="monotone" name="Comments" />
         <Line dataKey="Comments_Doctor" stroke="brown" activeDot={{r:5}} type="monotone" name="Comments Doctor" />



         <XAxis dataKey ="Date"  interval="preserveStartEnd" tickFormatter={(value)=> value}/>
         <YAxis />
         <Legend />
       </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
   
    );
   }
}
   


export default CommentsAnalytics