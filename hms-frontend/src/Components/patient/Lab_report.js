import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Lab_report(props) {
    const user_id = props.match.params.id
    const [report_info,setReport_info] = useState([])
    useEffect(()=>{
        axios.get(`/patient/${user_id}/labs`)
        .then(resp=>{console.log(resp);setReport_info(resp.data)})
        .catch(error=>{console.log(error);})
},[])
    return (
        <div>
            <br/><br/><br/>
            <br/><br/><h2>Your Previous Reports</h2><br/>
            <Row>
                <Col>
                <Table striped bordered hover responsive>
                    <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Issued on</th>
                        <th>Test name</th>
                        <th>Result</th>
                        <th>Lab Name</th>
                        <th>Price of test</th>
                        <th>Report No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report_info.map((obj,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{obj.name} {obj.surname}</td>
                                    <td>{new Date(obj.date_of_issue).toLocaleString("en-IN")}</td>
                                    <td>{obj.test}</td>
                                    <td>{obj.result}</td>
                                    <td>{obj.lab_type}</td>
                                    <td>{obj.amount}</td>
                                    <td>{obj.report_id}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </div>
    )
}

export default Lab_report
