import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from 'react-router-dom';
import {Container,Row,Col} from 'react-bootstrap'
import { BiCalendar } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUserInjured } from "react-icons/fa";
import {FcCalendar,FcPortraitMode,FcSalesPerformance } from "react-icons/fc";
import axios from 'axios'
import images from "../defaultimage.json"
import Profile from "./Profile"
import Updateprofile from "./Updateprofile"
import Dashboard from './Dashboard';
import Past_appointments from './Past_appointments';
import Discharged_patients from './Discharged_patients';
import Appointment from './Appointment';
import MedStatus from './MedStatus';
import Wards from './Wards';
import Lab_report from './Lab_report';
import Services from './Services';
import Req_wards from './Req_wards';
import Req_test from './Req_test';
import Req_appointment from './Req_appointment';
import Req_medicine from './Req_medicine';
import Request_ward from './Request_ward';
import Request_test from './Request_test';
import Request_medicine from './Request_medicine';
import Request_appointment from './Request_appointment';
import Bill_previous from './Bill_previous';
import Bill_current from './Bill_current';


function Patientpage(props) {
    const history = useHistory();
    console.log(props.match)
    const [userdata,setUserdata] = useState({})
    const user_id = props.match.params.id
    let storedid = localStorage.getItem("id")
    let user_type
    useEffect(()=>{
        axios.get(`/patient/${storedid}`)
            .then(resp =>{
              console.log(resp.data[0]);
              setUserdata(resp.data[0]);  
            })
            .catch(err=>{
                console.log(err);
            })
    },[])
    console.log(storedid)
    // console.log(images)
    let imageing = images.default;
    if(userdata.images)
    {
        let bufferOriginal = Buffer.from(userdata.images);
        imageing = bufferOriginal.toString('base64')
        // console.log(imageing)
    }
    if (user_id === storedid) {
        return (
            <Router >
                <div style={{margin:"0px",padding:"0px"}}>
                    <Container fluid style={{margin:"0px",padding:"0px"}}>
                        <Row style={{margin:"0px",padding:"0px",minHeight:"100vh"}}>
                            <Col sm={4} lg={3} style={{margin:"0px",padding:"0px"}}>
                                <div style={{margin:"0px",padding:"0px",backgroundColor:"#52BB96",color:"white", height:"100%"}}>
                                        <div style={{margin:"0px",padding:"0px",backgroundColor:"#4DA786",color:"white", textAlign:"center"}}>
                                            <br/><br/><br/>
                                            <img src={`data:image/jpeg;base64,${imageing}`} height="175px" width="175px" style={{borderRadius:"50%",borderWidth:"1px",borderColor:"black",borderStyle:"solid"}} />
                                            {/* <img src={base64String} /> */}
                                            <h2>{userdata.firstname} {userdata.lastname}</h2>
                                            <h5>{userdata.username}</h5>
                                            <h6>Patient Account</h6>
                                            <br/><br/>
                                        </div>
                                        <div style={{backgroundColor:"#52BB96",color:"white"}}>
                                            <Container>
                                                <br/>
                                                {/* <Link to="/doctor"></Link> */}
                                                {/* onClick={()=>{history.goBack()}}  */}
                                                <Link to={`/patient/${user_id}`} style={{color:"#fff"}}><h6 ><FcSalesPerformance/> Dashboard</h6></Link>
                                                <Link to={`/patient/${user_id}/profile`} style={{color:"#fff"}}><h6><FcPortraitMode/> Profile</h6></Link>
                                                <Link to={`/patient/${user_id}/appointments`} style={{color:"#fff"}}><h6><FcCalendar/> Appointments</h6></Link>
                                                <Link to={`/patient/${user_id}/services`} style={{color:"#fff"}}><h6><FcCalendar/> Services</h6></Link>
                                                <br/>
                                            </Container>
                                        </div>
                                </div>
                            </Col>
                            <Col sm={8} lg={9}>
                                <Switch>
                                        <Route path="/patient/:id" exact component={Dashboard} />
                                        <Route path="/patient/:id/profile" exact component={Profile} />
                                        <Route path="/patient/:id/profile/update" exact component={Updateprofile} />
                                        <Route path="/patient/:id/appointments" exact component={Appointment} />
                                        <Route path="/patient/:id/services" exact component={Services} />
                                        <Route path="/patient/:id/wards" exact component={Wards} />
                                        <Route path="/patient/:id/medicine" exact component={MedStatus} />
                                        <Route path="/patient/:id/report" exact component={Lab_report} />
                                        <Route path="/patient/:id/discharged" exact component={Discharged_patients} />
                                        <Route path="/patient/:id/bills/previous" exact component={Bill_previous} />
                                        <Route path="/patient/:id/bills/current" exact component={Bill_current} />
                                        <Route path="/patient/:id/appointments/past" exact component={Past_appointments} />
                                        <Route path="/patient/:id/services/ward" exact component={Req_wards} />
                                        <Route path="/patient/:id/services/test" exact component={Req_test} />
                                        <Route path="/patient/:id/services/appointment" exact component={Req_appointment} />
                                        <Route path="/patient/:id/services/medicine" exact component={Req_medicine} />
                                        <Route path="/patient/:id/services/ward/request" exact component={Request_ward} />
                                        <Route path="/patient/:id/services/test/request" exact component={Request_test} />
                                        <Route path="/patient/:id/services/appointment/request" exact component={Request_appointment} />
                                        <Route path="/patient/:id/services/medicine/request" exact component={Request_medicine} />
                                </Switch>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Router>
        )
    } else {
        return(
            <div>
            <br/><br/><br/>
            <h2>Sorry User not Loggedin as {user_id}</h2>
            <h4>Kindly Login to view this page</h4>
            </div>
        )
    }
}

export default Patientpage