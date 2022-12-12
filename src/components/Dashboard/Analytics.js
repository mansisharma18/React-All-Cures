import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from "recharts";

const lineChartData = [
  {
    count: 23,
    date: "2-22-11-2",
    fees: 120
  },
  {
    subject: "CSS",
    topics: 75,
    fees: 20
  },
  {
    subject: "javaScript",
    topics: 65,
    fees: 140
  },
  {
    subject: "HTML",
    topics: 90,
    fees: 40
  
  },
  {
    subject: "Node.js",
    topics: 70,
    fees : 150
  },
  {
    subject: "Python",
    topics: 250,
    fees: 180
  }

];
function Analytics(){
    return (
    <React.Fragment>
      <h3 style={{color:"blue"}}>Course Line chart</h3>
      <ResponsiveContainer width="100%" aspect={2} >
       <LineChart data= {lineChartData} margin={{left:50, right:50, top:100, bottom:100}}>
         <CartesianGrid strokeDasharray="2 2"/>
         <Tooltip contentStyle={{backgroundColor:"lightgray"}}/>
         <Line dataKey="fees" stroke="red" activeDot={{r:10}} type="monotone" />
         <Line dataKey="topics" stroke="green" activeDot={{r:10}} type="monotone" />
         <XAxis dataKey ="subject"  interval="preserveStartEnd" tickFormatter={(value)=> value+" Language"}/>
         <YAxis />
         <Legend />
       </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
   
    );
};

export default Analytics