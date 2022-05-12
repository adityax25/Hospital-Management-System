import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function MedStatus(props) {
    const user_id = props.match.params.id
    // const [ward_info,setWard_info] = useState([])
    const [med_info,setMed_info] = useState([])
    useEffect(()=>{
        axios.get(`/medicine`)
        .then(resp=>{console.log(resp);setMed_info(resp.data)})
        .catch(error=>{console.log(error);})
    },[])
    return (
        <div>
            <br/><br/><br/>
            <br/><br/><h2>Medicine Stock in Hospital Inventory</h2><br/>
            <Row>
                <Col>
                <Table striped bordered hover responsive>
                    <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Date of Delivery</th>
                        <th>Date of Expiry</th>
                        <th>Cure for</th>
                        <th>Price</th>
                        <th>Units in Stock</th>
                        <th>Provider</th>
                        </tr>
                    </thead>
                    <tbody>
                        {med_info.map((obj,index)=>{
                            return(
                                <tr>
                                    <td>{obj.m_id}</td>
                                    <td>{obj.name}</td>
                                    <td>{new Date(obj.date_of_delivery).toDateString("en-IN")}</td>
                                    <td>{new Date(obj.date_of_expiry).toDateString("en-IN")}</td>
                                    <td>{obj.used_for}</td>
                                    <td>{obj.price}</td>
                                    <td>{obj.units_in_stock}</td>
                                    <td>{obj.provider}</td>
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

export default MedStatus
