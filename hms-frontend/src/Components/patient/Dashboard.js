import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from 'axios'


function Dashboard(props) {
    const user_id = props.match.params.id
    const [appointment,setAppointment] = useState([])
    const [discharged,setDischarged] = useState([])
    const [completed,setCompleted] = useState([])
    const [admitted,setAdmitted] = useState([])
    useEffect(()=>{
            // axios.get(`/patient/${user_id}/admitted`)
            // .then(resp=>{console.log(resp);setAdmitted(resp.data)})
            // .catch(error=>{console.log(error);})

            // axios.get(`/patient/${user_id}/discharged`)
            // .then(resp=>{console.log(resp);setDischarged(resp.data)})
            // .catch(error=>{console.log(error);})

            // axios.get(`/patient/${user_id}/completed`)
            // .then(resp=>{console.log(resp);setCompleted(resp.data)})
            // .catch(error=>{console.log(error);})

            axios.get(`/patient/${user_id}/pending`)
            .then(resp=>{console.log(resp);setAppointment(resp.data)})
            .catch(error=>{console.log(error);})
    },[])
    return (
        <div>
            <br/><br/><br/><br/><br/>
            <Row style={{textAlign:"center",justifyContent:"center"}}>
                {/* <Col xs={12} md={6} lg={4}>
                    <Link className="medlinks" to={`/patient/${user_id}/patient/current`}>
                    <Card style={{backgroundColor:"#ff0000", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Patients Under Supervision</Card.Title>
                        <Card.Text>
                        Currently You are Supervising {admitted.length} Patients
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col> */}
                <Col xs={12} md={6}>
                <Link className="medlinks" to={`/patient/${user_id}/discharged`}>
                <Card style={{backgroundColor:"#ff8020", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Patients Discharged</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                        Your History of being admitted in Hospital
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6}>
                <Link className="medlinks" to={`/patient/${user_id}/appointments/past`}>
                <Card style={{backgroundColor:"#0000ff", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Appointments Completed</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                            Your Past Appointments in Hospital
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
            </Row>
            <br/><br/>
            <h3>Upcoming Appointments</h3>
            <br/>
            <Row>
                <Col>
                <Table striped bordered hover responsive>
                    <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Ailments</th>
                        <th>Date of Consultant</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointment.map((obj,index)=>{
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

export default Dashboard
