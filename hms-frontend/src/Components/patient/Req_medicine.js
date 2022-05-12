import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Req_medicine(props) {
    const user_id = props.match.params.id
    const [completed,setCompleted] = useState([])
    // const user_id = props.match.params.id
    // const [completed,setCompleted] = useState([])
    useEffect(()=>{
        axios.get(`/patient/${user_id}/request_medicine`)
        .then(resp=>{console.log(resp);setCompleted(resp.data)})
        .catch(error=>{console.log(error);})
},[])
    return (
        <div>
            <br/><br/><br/>
            <br/><br/><h2>Your Previous Orders</h2><br/>
            <Row style={{minHeight:"60vh"}}>
                <Col>
                <Table striped bordered hover responsive>
                <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>Request ID</th>
                        <th>Medicine</th>
                        <th>Units Ordered</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completed.map((obj,index)=>{
                            return(
                                <tr>
                                    <td>{obj.req_id}</td>
                                    <td>{obj.m_id}</td>
                                    <td>{obj.units}</td>
                                    <td>{obj.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                </Col>
            </Row>
            <br/>
            <div style={{textAlign:"end"}}> 
            <Link to={`/patient/${user_id}/services/medicine/request`}>
            <Button style={{backgroundColor:"#300a35",borderRadius:"35px"}} size="lg">
                Order Medicines &gt;
            </Button>
            </Link>
            </div>
            <br/>
        </div>
    )
}

export default Req_medicine
