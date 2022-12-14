import React from "react";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip, BarChart, Bar} from "recharts";
import { backendHost } from '../../api-config';   


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

        fetch(`${backendHost}/analytics/top`)
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
      <h3 style={{color:"blue"}}>Top 10 Articles viewed since inception</h3>
      <ResponsiveContainer width="100%" aspect={2}>
       <BarChart data= {barChartData} margin={{left:50, right:50, top:100, bottom:100}}>
         <CartesianGrid strokeDasharray="2 2"/>
         <Tooltip />
         <Bar dataKey="No. of hits" fill="brown" />
         {/* <Bar dataKey="article_id" fill="green" /> */}
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