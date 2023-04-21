import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from "recharts";
import axios from 'axios';
import { backendHost } from '../../api-config';
class RatingAnalytics extends React.Component {
  
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			ratingChartData: [],
			DataisLoaded: false,
            
		};
	}
    componentDidMount() {

        fetch(`${backendHost}/analytics/all`)
        .then((res)=> res.json())
        .then((json) => {
          this.setState({
            ratingChartData: json
          })
        })
        .catch(err => 
          null
        )  
     }

   
   

   render(){
    const { DataisLoaded, ratingChartData } = this.state;
    
    return (
    <React.Fragment>
      <h3 style={{color:"blue"}}>Line chart (Doctor Ratings)</h3>
      <ResponsiveContainer width="100%" aspect={2} >
       <LineChart data= {ratingChartData} margin={{left:50, right:50, top:100, bottom:100}}>
         <CartesianGrid strokeDasharray="2 2"/>
         <Tooltip contentStyle={{backgroundColor:"lightgray"}}/>
         <Line dataKey="Ratings" stroke="pink" activeDot={{r:5}} type="monotone" name="Rating" />
         <Line dataKey="Ratings_Doctor" stroke="yellow" activeDot={{r:5}} type="monotone" name="Ratings Doctor" />



         <XAxis dataKey ="Date"  interval="preserveStartEnd" tickFormatter={(value)=> value}/>
         <YAxis />
         <Legend />
       </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
   
    );
   }
}
   


export default RatingAnalytics