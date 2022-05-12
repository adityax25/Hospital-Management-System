import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import axios from 'axios'

function Discharged_patients(props) {
    const user_id = props.match.params.id
    const [discharged,setDischarged] = useState([])
    useEffect(()=>{
        axios.get(`/doctor/${user_id}/discharged`)
        .then(resp=>{console.log(resp);setDischarged(resp.data)})
        .catch(error=>{console.log(error);})
},[])
    return (
        <div>
            <br/><br/><br/>
            <br/><br/><h2>Patients Discharged after treatment</h2><br/>
            <Row>
                <Col>
                <Table striped bordered hover responsive>
                    <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Admitted on</th>
                        <th>Discharged on</th>
                        <th>Illness</th>
                        <th>Medication</th>
                        <th>Condition</th>
                        <th>Ward No</th>
                        <th>Ward Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discharged.map((obj,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{obj.firstname} {obj.lastname}</td>
                                    <td>{new Date(obj.date_of_admittance).toLocaleString("en-IN")}</td>
                                    <td>{new Date(obj.date_of_discharge).toLocaleString("en-IN")}</td>
                                    <td>{obj.illness}</td>
                                    <td>{obj.name}</td>
                                    <td>{obj.pat_condition}</td>
                                    <td>{obj.w_id}</td>
                                    <td>{obj.ward_type}</td>
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

export default Discharged_patients
