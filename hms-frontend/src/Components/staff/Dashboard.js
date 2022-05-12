import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from 'axios'

function Dashboard(props) {
    const user_id = props.match.params.id
    const [appointment,setAppointment] = useState([])
    const [ward_info,setWard_info] = useState([])
    const [completed,setCompleted] = useState([])
    const [med_info,setMed_info] = useState([])
    useEffect(()=>{
        axios.get(`/medicine`)
        .then(resp=>{console.log(resp);setMed_info(resp.data)})
        .catch(error=>{console.log(error);})

        axios.get(`/ward/avaliable`)
        .then(resp=>{console.log(resp);setWard_info(resp.data)})
        .catch(error=>{console.log(error);})

        // axios.get(`/doctor/${user_id}/completed`)
        // .then(resp=>{console.log(resp);setCompleted(resp.data)})
        // .catch(error=>{console.log(error);})

        // axios.get(`/doctor/${user_id}/pending`)
        // .then(resp=>{console.log(resp);setAppointment(resp.data)})
        // .catch(error=>{console.log(error);})
},[])
    return (
        <div>
            <br/><br/><br/><br/><br/>
            <Row style={{textAlign:"center",justifyContent:"center"}}>
                <Col xs={12} md={6} lg={4}>
                    <Link to={`/staff/${user_id}/medicine`}>
                    <Card style={{backgroundColor:"#ff0000", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Medicines Details</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                        Get Details of {med_info.length} medicines
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6} lg={4}>
                <Link to={`/staff/${user_id}/wards`}>
                <Card style={{backgroundColor:"#ff8020", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Ward Details</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                        Avaliable wards in Hospital is {ward_info.length}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
                <Col xs={12} lg={4}>
                <Link to={`/staff/${user_id}/appointments/past`}>
                <Card style={{backgroundColor:"#0000ff", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Appointments Completed</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                            You have {completed.length} appointments today
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
            </Row>
            <br/><br/>
            <Row style={{textAlign:"center",justifyContent:"center"}}>
                <Col xs={12} md={6} lg={4}>
                    <Link to={`/staff/${user_id}/doctor/new`}>
                    <Card style={{backgroundColor:"#ff0000", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Add a New Doctor</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                        Fill in details for new doctor
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6} lg={4}>
                <Link to={`/staff/${user_id}/doctor/update`}>
                <Card style={{backgroundColor:"#ff8020", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Update Doctor Details</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                        Update the details of the doctors
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
                <Col xs={12} lg={4}>
                <Link to={`/staff/${user_id}/doctor/delete`}>
                <Card style={{backgroundColor:"#0000ff", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Remove Doctor</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                            Delete the doctor from the database
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
            </Row>
            <br/><br/>
            <Row style={{textAlign:"center",justifyContent:"center"}}>
                <Col xs={12} md={6} lg={4}>
                    <Link to={`/staff/${user_id}/patient/new`}>
                    <Card style={{backgroundColor:"#ff0000", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Admit a new patient</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                            Adds Patient to database
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6} lg={4}>
                <Link to={`/staff/${user_id}/wards`}>
                <Card style={{backgroundColor:"#ff8020", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Update the patient details</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                        Modify the patient details
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
                <Col xs={12} lg={4}>
                <Link to={`/staff/${user_id}/patient/discharge`}>
                <Card style={{backgroundColor:"#0000ff", color:"#fff",margin:"5px"}}>
                    <Card.Body>
                        <Card.Title>Discharge Patient</Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                        <Card.Text>
                            Discharge a patient from Hospital
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
            </Row>
            <br/>
        </div>
    )
}

export default Dashboard
