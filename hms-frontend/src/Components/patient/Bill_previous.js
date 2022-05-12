import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Bill_previous(props) {
    const user_id = props.match.params.id
    const [bills,setBills] = useState([])
    useEffect(()=>{
        axios.get(`/bill/${user_id}/issued`)
            .then(resp=>{console.log(resp);setBills(resp.data)})
            .catch(err=>{console.log(err);})
    },[])

    // {
    //     "bill_no": 20013,
    //     "p_id": 3001,
    //     "lab_charge": 150,
    //     "doctor_charge": 750,
    //     "medicine_charge": 15000,
    //     "ward_charge": 0,
    //     "no_of_days_admitted": 0,
    //     "surgery_charge": 0,
    //     "is_issued": 1
    //   }

    return (
        <div>
            <br/><br/><br/>
            <br/><br/><h2>Previous Bills</h2><br/>
            <Row>
                <Col>
                <Table striped bordered hover responsive>
                    <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>#</th>
                        <th>Bill ID</th>
                        <th>Patient ID</th>
                        <th>Doctor Charges</th>
                        <th>Test Charges</th>
                        <th>Medicine Charges</th>
                        <th>Ward Charges</th>
                        <th>No of days admitted</th>
                        <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((obj,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{obj.bill_no}</td>
                                    <td>{obj.p_id}</td>
                                    <td>{obj.doctor_charge}</td>
                                    <td>{obj.lab_charge}</td>
                                    <td>{obj.medicine_charge}</td>
                                    <td>{obj.ward_charge}</td>
                                    <td>{obj.no_of_days_admitted}</td>
                                    <td>{obj.doctor_charge+obj.lab_charge+obj.medicine_charge+obj.ward_charge}</td>
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

export default Bill_previous