import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from 'react-router-dom';
import {Container,Row,Col} from 'react-bootstrap'
import Dashboard from './Dashboard'
import { BiCalendar } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUserInjured } from "react-icons/fa";
import { FcBarChart,FcCalendar,FcPortraitMode,FcSalesPerformance } from "react-icons/fc";
import Appointment from "./Appointment";
import Current_patients from "./Current_patients";
import Discharged_patients from "./Discharged_patients";
import Current_appointment from "./Current_appointment";
import Past_appointments from "./Past_appointments";
import axios from 'axios'
import Profile from './Profile';
import Updateprofile from './Updateprofile';
import images from "../defaultimage.json"
import Lab_report from './Lab_report';
import Wards from './Wards';
import MedStatus from './MedStatus';
import Edit_patient from './Edit_patient';
import Publish_report from './Publish_report';
import Complete_appointment from './Complete_appointment';

function Doctorpage(props) {
    const history = useHistory();
    console.log(props.match)
    const [userdata,setUserdata] = useState({})
    const user_id = props.match.params.id
    let storedid = localStorage.getItem("id")
    useEffect(()=>{
        axios.get(`/doctor/${storedid}`)
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
    if(userdata.documents)
    {
        // console.log(userdata.documents)
        // let new_url = URL.createObjectURL(userdata.documents)
        // console.log(new_url);
        // let base64String = btoa(String.fromCharCode(...new Uint8Array(userdata.documents)));
        // console.log(base64String);
        // let reader = new FileReader();
        // var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(userdata.documents)));
        // let base64String = btoa(String.fromCharCode(...new Uint8Array(userdata.documents)));
        // console.log(base64String);
        // reader.readAsDataURL(userdata.documents); // converts the blob to base64 and calls onload
        // console.log(reader.result);
        // reader.onload = function() {
        // let link = document.createElement('a');
        // link.download = 'hello.txt';
        // link.href = reader.result; // data url
        // console.log(link);
        // link.click();
        // console.log(arrayBufferToBase64(userdata.documents))

        // var u8 = new Uint8Array(userdata.documents);
        // var decoder = new TextDecoder('utf8');
        // var b64encoded = btoa(decoder.decode(u8));
        // console.log(b64encoded);
        let bufferOriginal = Buffer.from(userdata.documents);
        // let data = 'stackabuse.com';
        // let buff = new Buffer(data);
        // let base64data = buff.toString('base64');
        // console.log(buff)
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
                                            <h2>{userdata.name} {userdata.surname}</h2>
                                            <h5>{userdata.specilization}</h5>
                                            <h6>Doctor Account</h6>
                                            <br/><br/>
                                        </div>
                                        <div style={{backgroundColor:"#52BB96",color:"white"}}>
                                            <Container>
                                                <br/>
                                                {/* <Link to="/doctor"></Link> */}
                                                {/* onClick={()=>{history.goBack()}}  */}
                                                <Link to={`/doctor/${user_id}`} style={{color:"#fff"}}><h6 ><FcSalesPerformance/> Dashboard</h6></Link>
                                                <Link to={`/doctor/${user_id}/profile`} style={{color:"#fff"}}><h6><FcPortraitMode/> Profile</h6></Link>
                                                <Link to={`/doctor/${user_id}/appointments`} style={{color:"#fff"}}><h6><FcCalendar/> Others</h6></Link>
                                                <br/>
                                            </Container>
                                        </div>
                                </div>
                            </Col>
                            <Col sm={8} lg={9}>
                                <Switch>
                                        <Route path="/doctor/:id" exact component={Dashboard} />
                                        <Route path="/doctor/:id/profile" exact component={Profile} />
                                        <Route path="/doctor/:id/wards" exact component={Wards} />
                                        <Route path="/doctor/:id/medicine" exact component={MedStatus} />
                                        <Route path="/doctor/:id/profile/update" exact component={Updateprofile} />
                                        <Route path="/doctor/:id/appointments" exact component={Appointment} />
                                        <Route path="/doctor/:id/patient/current" exact component={Current_patients} />
                                        <Route path="/doctor/:id/patient/discharged" exact component={Discharged_patients} />
                                        <Route path="/doctor/:id/patient/report" exact component={Lab_report} />
                                        <Route path="/doctor/:id/appointments/past" exact component={Past_appointments} />
                                        <Route path="/doctor/:id/appointments/current" exact component={Current_appointment} />
                                        <Route path="/doctor/:id/patient/update" exact component={Edit_patient} />
                                        <Route path="/doctor/:id/patient/labs/update" exact component={Publish_report} />
                                        <Route path="/doctor/:id/appointments/current/update" exact component={Complete_appointment} />
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

export default Doctorpage
