import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Services(props) {
    const user_id = props.match.params.id
    const [ward_info,setWard_info] = useState([])
    const [med_info,setMed_info] = useState([])
    return (
        <div>
            <br/><br/><br/><br/><br/>
            <Row>
                <Col xs={12} md={6}>
                    <Link className="medlinks" to={`/staff/${user_id}/services/ward`}>
                    <Card bg="warning" style={{height:"20vh"}} text="dark">
                        <Card.Body>
                        <Card.Title>Ward Request</Card.Title>
                        <Card.Text>
                            {/* Current Wards Avaliable are {ward_info.length} */}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6}>
                    <Link className="medlinks" to={`/staff/${user_id}/services/medicine`}>
                    <Card bg="info" style={{height:"20vh"}} text="light">
                        <Card.Body>
                        <Card.Title>Order Medicine</Card.Title>
                        <Card.Text>
                            {/* Current Wards Avaliable are {ward_info.length} */}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
                </Row>
                <br/>
                <Row>
                <Col xs={12} md={6}>
                    <Link className="medlinks" to={`/staff/${user_id}/services/appointment`}>
                    <Card bg="secondary" style={{height:"20vh"}} text="light">
                        <Card.Body>
                        <Card.Title>Appointment Request</Card.Title>
                        <Card.Text>
                            {/* Current Wards Avaliable are {ward_info.length} */}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6}>
                    <Link className="medlinks" to={`/staff/${user_id}/services/test`}>
                    <Card style={{backgroundColor:"#a06fc5",height:"20vh"}} text="light">
                        <Card.Body>
                        <Card.Title>Test Request</Card.Title>
                        <Card.Text>
                            {/* Current Wards Avaliable are {ward_info.length} */}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default Services
