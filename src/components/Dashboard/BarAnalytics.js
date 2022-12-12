import React from "react";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip, BarChart, Bar} from "recharts";

class BarAnalytics extends React.Component {
  
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			barChartData: [],
			DataisLoaded: false,
            
		};
	}
    componentDidMount() {

        fetch(`https://all-cures.com:444/cures/analytics/article`)
        .then((res)=> res.json())
        .then((json) => {
          this.setState({
            barChartData: json
          })
        })
        .catch(err => null
        )  
     }

   
   

   render(){
    const { DataisLoaded, barChartData } = this.state;
    
    return (
    <React.Fragment>
      <h3 style={{color:"blue"}}>Course Bar chart</h3>
      <ResponsiveContainer width="100%" aspect={2}>
       <BarChart data= {barChartData} margin={{left:50, right:50, top:100, bottom:100}}>
         <CartesianGrid strokeDasharray="2 2"/>
         <Tooltip />
         <Bar dataKey="Count" fill="red" />
         <Bar dataKey="article_id" fill="green" />
         <XAxis dataKey ="article_id"  interval="preserveStartEnd" tickFormatter={(value)=> value}/>
         <YAxis />
         <Legend />
       </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
   
    );
}
}
export default BarAnalytics