import { usedatasource, useEffect, dataSource } from 'react';
import { Alert, Table } from 'react-bootstrap';
// import "antd/dist/antd.css"
import{useState} from 'react'

function Pagination() {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response=>response.json())
    .then (data=>{
      setDataSource(data)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
      

  },

 [] )

const columns = [
{
key:"1",
title:'Id',
dataIndex:'id',
},
{
  key:"2",
  title:'User Id',
  dataIndex:'userid',
  },
  {
    key:"3",
    title:'Status',
    dataIndex:'completed',
    render:(completed)=>{
      return <p>{completed?'Complete':'In Progress'}</p>
    }
    },

]

return(
<div className="App">
<header className="App-header">
<Table
loading={loading}
columns={columns}
dataSource={dataSource}>

</Table>


</header>

</div>


);
}
export default Pagination;