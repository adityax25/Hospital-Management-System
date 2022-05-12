import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Bill_current(props) {
    const user_id = props.match.params.id
    const [bills,setBills] = useState([])
    const [userdata,setUserdata] = useState({})
    useEffect(()=>{
        axios.get(`/bill/${user_id}`)
            .then(resp=>{console.log(resp);setBills(resp.data[0])})
            .catch(err=>{console.log(err);})

        axios.get(`/patient/${user_id}/admitted/all`)
            .then(resp =>{
              console.log(resp.data);
              setUserdata(resp.data[0]);  
            })
            .catch(err=>{
                console.log(err);
            })
    },[])

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function getDaysAdmitted(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        console.log(dateString);
        var diff = today - birthDate;
        var datediff = (diff/86400000)
        var decidiff = datediff%1;
        datediff = datediff - decidiff
        console.log(datediff);
        return datediff;
    }

    return (
        <div>
            <br/><br/><br/><br/>
            <h2 align="center">Health is Happiness Hospital</h2>
            <br/><br/>
            <div style={{textAlign:"end"}}>
                <div style={{display:"inline-block",textAlign:"start",borderColor:"black",borderWidth:"4px",borderStyle:"solid",padding:"10px"}}>
                    <h4 align="center">Invoice Details</h4>
                    Date of Issue :{new Date().toLocaleString()}
                    <br/>
                    Bill No:{bills&&bills.bill_no}
                </div>
            </div>
            <br/><br/>
            <Row>
                <Col xs={6}>
                    <strong>
                    Patient id: {userdata&&userdata.id}<br/>
                    Name: {userdata&&userdata.firstname} {userdata&&userdata.lastname}<br/>
                    Age: {getAge(userdata&&userdata.date_of_birth)}<br/>
                    Phone No: {userdata&&userdata.phone_no}<br/>
                    Email Id: {userdata&&userdata.email}<br/>
                    Ward No:{userdata&&userdata.w_id}<br/>
                    Ward Type:{userdata&&userdata.ward_type}
                    </strong>
                </Col>
                <Col xs={6}>
                    <strong>
                    Gender: {userdata&&userdata.gender}<br/>
                    Address: {userdata&&userdata.address}<br/>
                    Doctor ID: {userdata&&userdata.d_id}<br/>
                    Illness: {userdata&&userdata.illness}<br/>
                    Date of admitance: {userdata&&(new Date(userdata.date_of_admittance).toLocaleString())}<br/>
                    Date of discharge: {userdata&&(new Date().toLocaleString())}<br/>
                    Condition:{userdata&&userdata.pat_condition}
                    </strong>
                </Col>
            </Row>
            <br/><br/>
            <h3 align="center">Bill Description</h3>
            <Row>
                <Col>
                <Table striped bordered hover responsive>
                    <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>#</th>
                        <th>Service</th>
                        <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Doctor Charges</td>
                            <td>{bills&&bills.doctor_charge}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Test Charges</td>
                            <td>{bills&&bills.lab_charge}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Medicine Charges</td>
                            <td>{bills&&bills.medicine_charge}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Ward Charge</td>
                            <td>{bills&&userdata&&bills.ward_charge*getDaysAdmitted(userdata.date_of_admittance)}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Surgery Charge</td>
                            <td>{bills&&bills.surgery_charge}</td>
                        </tr>
                        {/* {bills.map((obj,index)=>{
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
                        })} */}
                    </tbody>
                </Table>
                </Col>
            </Row>
            <br/><br/><br/>
            <div style={{textAlign:"end"}}>
                    <div style={{textAlign:"end",display:"inline-block",marginRight:"150px"}}>
                        <strong>Discount: 0</strong><br/>
                        <strong>Mediclaim: 0</strong><br/>
                        <strong>Tax Charges: 0</strong><br/>
                        <strong>Amount: 
                        {userdata&&bills&&(bills.doctor_charge+bills.lab_charge+bills.medicine_charge+bills.ward_charge*getDaysAdmitted(userdata.date_of_admittance)+bills.surgery_charge)}
                        </strong>
                        <hr style={{width:"110%",height:"2px",color:"black",backgroundColor:"black",borderRadius:"15%"}} />
                        <strong>Final Amount: 
                        {userdata&&bills&&(bills.doctor_charge+bills.lab_charge+bills.medicine_charge+bills.ward_charge*getDaysAdmitted(userdata.date_of_admittance)+bills.surgery_charge)}
                        </strong>
                    </div>
                    <br/><br/><br/><br/>
                    <div style={{textAlign:"end",display:"inline-block"}}>
                        <h5>Signature Of Required Authority</h5><br/><br/>
                        <hr style={{width:"360px",height:"2px",color:"black",backgroundColor:"black",borderRadius:"15%"}} />
                    </div>
                    <br/><br/>
            </div>
        </div>
    )
}

export default Bill_current