import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Appointment(props) {
    const user_id = props.match.params.id
    const [ward_info,setWard_info] = useState([])
    const [med_info,setMed_info] = useState([])
    useEffect(()=>{
        axios.get(`/medicine`)
        .then(resp=>{console.log(resp);setMed_info(resp.data)})
        .catch(error=>{console.log(error);})

        axios.get(`/ward/available`)
        .then(resp=>{console.log(resp);setWard_info(resp.data)})
        .catch(error=>{console.log(error);})
},[])
    return (
        <div>
            <br/><br/><br/><br/><br/>
            <Row>
                <Col xs={12} md={6} lg={4}>
                    <Link className="medlinks" to={`/patient/${user_id}/wards`}>
                    <Card bg="warning" text="light">
                        <Card.Body>
                        <Card.Title>Wards Status</Card.Title>
                        <Card.Text>
                            Current Wards Avaliable are {ward_info.length}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6} lg={4}>
                <Link className="medlinks" to={`/patient/${user_id}/patient/report`}>
                    <Card bg="info" text="light">
                        <Card.Body>
                        <Card.Title>Patient Reports</Card.Title>
                        <Card.Text>
                            Check the reports of your patients
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                </Col>

                <Col xs={12} lg={4}>
                <Link className="medlinks" to={`/patient/${user_id}/medicine`}>
                    <Card bg="success" text="light">
                        <Card.Body>
                        <Card.Title>Hospital Inventory</Card.Title>
                        <Card.Text>
                            Types of medicine are {med_info.length}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                </Col>
            </Row>
        </div>
    )
}

export default Appointment
