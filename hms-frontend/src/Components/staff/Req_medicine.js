import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Req_medicine(props) {
    const user_id = props.match.params.id
    const [completed,setCompleted] = useState([])
    // const user_id = props.match.params.id
    // const [completed,setCompleted] = useState([])
    const [reload,setReload] = useState(false)
    useEffect(()=>{
        axios.get(`/staff/request_medicine`)
        .then(resp=>{console.log(resp);setCompleted(resp.data)})
        .catch(error=>{console.log(error);})
},[])

useEffect(()=>{
    if (reload) {
    axios.get(`/staff/request_medicine`)
    .then(resp=>{console.log(resp);setCompleted(resp.data)})
    .catch(error=>{console.log(error);})
    setReload(false)
    }
},[reload])

const grant_request = (id) =>{
    let body = {req_id:id}
    axios.post(`/staff/request_medicine`,body)
        .then(resp=>{console.log(resp);setReload(true)})
        .catch(err=>{console.log(err);})
}
    return (
        <div>
            <br/><br/><br/>
            <br/><br/><h2>Pending orders for Medicines</h2><br/>
            <Row style={{minHeight:"60vh"}}>
                <Col>
                <Table striped bordered hover responsive>
                <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>Request ID</th>
                        <th>Medicine</th>
                        <th>Patient Name</th>
                        <th>Units Ordered</th>
                        <th>Status</th>
                        <th>Grant Medicine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completed.map((obj,index)=>{
                            return(
                                <tr key={obj.req_id}>
                                    <td>{obj.req_id}</td>
                                    <td>{obj.m_id}</td>
                                    <td>{obj.p_id}</td>
                                    <td>{obj.units}</td>
                                    <td>{obj.status}</td>
                                    <td onClick={()=>{grant_request(obj.req_id)}}>Click Here</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                </Col>
            </Row>
            <br/>
            <br/>
        </div>
    )
}

export default Req_medicine
