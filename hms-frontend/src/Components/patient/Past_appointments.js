import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import axios from 'axios'

function Past_appointments(props) {
    const user_id = props.match.params.id
    const [completed,setCompleted] = useState([])
    useEffect(()=>{
        axios.get(`/patient/${user_id}/completed`)
        .then(resp=>{console.log(resp);setCompleted(resp.data)})
        .catch(error=>{console.log(error);})
},[])
    return (
        <div>
            <br/><br/><br/>
            <br/><br/><h2>All Your Past Appointments</h2><br/>
            <Row>
                <Col>
                <Table striped bordered hover responsive>
                <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>#</th>
                        <th>Doctor's Name</th>
                        <th>Ailments</th>
                        <th>Date of Consultant</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completed.map((obj,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{obj.firstname} {obj.surname}</td>
                                    <td>{obj.ailments}</td>
                                    <td>{new Date(obj.date_of_consultant).toLocaleString("en-IN")}</td>
                                    <td>{obj.appointment_status}</td>
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

export default Past_appointments
