import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import axios from 'axios'


function Current_patients(props) {
    const user_id = props.match.params.id
    const [admitted,setAdmitted] = useState([])
    useEffect(()=>{
        axios.get(`/doctor/${user_id}/admitted`)
        .then(resp=>{console.log(resp);setAdmitted(resp.data)})
        .catch(error=>{console.log(error);})
    },[])
    return (
        <div>
            <br/><br/><br/>
            <br/><br/><h2>Patients Under Your Supervision</h2><br/>
            <Row>
                <Col>
                <Table striped bordered hover responsive>
                    <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Admitted on</th>
                        <th>Illness</th>
                        <th>Medication</th>
                        <th>Condition</th>
                        <th>Ward No</th>
                        <th>Ward Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admitted.map((obj,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{obj.firstname} {obj.lastname}</td>
                                    <td>{new Date(obj.date_of_admittance).toLocaleString("en-IN")}</td>
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

export default Current_patients
