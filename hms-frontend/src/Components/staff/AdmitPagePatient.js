import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function AdmitPagePatient() {
    const [userdata,setUserdata] =useState({firstname:"",lastname:"",username:"",passkeys:"",email:"",address:"",phone_no:"",gender:"",date_of_birth:"",w_id:"",illness:"",d_id:"",date_of_admittance:(new Date().toISOString().substr(0,10)),pat_condition:"",date_of_discharge:null}) 
    const [submit,setSubmit] = useState(false)
    const [ward_info,setWard_info] = useState([])
    const [doc_info,setDoc_info] = useState([])
    useEffect(()=>{
        axios.get(`/ward/avaliable`)
        .then(resp=>{console.log(resp);setWard_info(resp.data)})
        .catch(error=>{console.log(error);})

        axios.get("/doctor")
            .then(resp=>{console.log(resp);setDoc_info(resp.data)})
            .catch(err=>{console.log(err);})
    },[])
    useEffect(()=>{
        if(submit){
            axios.post("/patient/admit",userdata)
                .then(resp=>{console.log(resp)})
                .catch(err=>{console.log(err);})
            setSubmit(false)
        }
    },[submit])
    return (
        <div>
       <Container >
           <br/><br/><br/><br/>
        {/* style={{marginBottom:"20px",borderBottomColor:"black",borderTop:"Transparent",borderLeft:"Transparent",borderRight:"Transparent",outline:"none"}} */}
           <div className="rowbox">
           <Row >
            <Col xs={12}><h2 align="center">Registration for Patients</h2></Col>
            <Col md={6}>
                <br/><h4>Name</h4>
                <input type="text" className="Reginput" value={userdata.firstname} onChange={e=>{setUserdata({...userdata,firstname:e.target.value})}} />
            </Col>
            <Col md={6}>
                <br/><h4>Surname</h4>
                <input type="text" className="Reginput" value={userdata.lastname} onChange={e=>{setUserdata({...userdata,lastname:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Username</h4>
                <input type="text" className="Reginput" value={userdata.username} onChange={e=>{setUserdata({...userdata,username:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Email Id</h4>
                <input type="email" className="Reginput" value={userdata.email} onChange={e=>{setUserdata({...userdata,email:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Address</h4>
                <input type="text" className="Reginput" value={userdata.address} onChange={e=>{setUserdata({...userdata,address:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Password</h4>
                <input type="password"className="Reginput" value={userdata.passkeys} onChange={e=>{setUserdata({...userdata,passkeys:e.target.value})}}/>
            </Col>
            <Col md={3}>
                <br/><h4>Date of Birth</h4>
                <input type="date" className="Reginput" value={userdata.date_of_birth} onChange={e=>{setUserdata({...userdata,date_of_birth:e.target.value})}}/>
            </Col>
            <Col md={3}>
                <br/><h4>Gender</h4>
                <select name="gender" id="gender" className="Reginput" onChange={e=>{setUserdata({...userdata,gender:e.target.value})}}>
                    <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="O">O</option>
                </select>
            </Col>
            <Col md={6}>
                <br/><h4>Phone no</h4>
                <input type="number" className="Reginput" value={userdata.phone_no} onChange={e=>{setUserdata({...userdata,phone_no:e.target.value})}} />
            </Col>
            <Col md={3}>
                <br/><h4>Ward No</h4>
                <select name="ward_select" id="ward_select" className="Reginput" onChange={e=>{setUserdata({...userdata,w_id:e.target.value})}}>
                <option key={0} value={0}>------ Select Ward------</option>
                    {ward_info.map((obj,index)=>{
                        return(
                            <option value={obj.w_id} key={obj.w_id}>{obj.w_id}-{obj.ward_type}-{obj.price} </option>
                        )
                    })}
                </select>
            </Col>
            <Col md={3}>
                <br/><h4>Select Doctor</h4>
                <select name="doc_select" id="doc_select" className="Reginput" onChange={e=>{setUserdata({...userdata,d_id:e.target.value})}} >
                <option key={0} value={0}>------ Select Doctor------</option>
                    {doc_info.map((obj)=>{
                        return(
                            <option value={obj.d_id} key={obj.w_id}>{obj.d_id}) {obj.name} {obj.surname} -- {obj.specilization}</option>
                        )
                    })}
                </select>
            </Col>
            <Col md={3}>
                <br/><h4>Illness</h4>
                <input type="text" className="Reginput" value={userdata.illness} onChange={e=>{setUserdata({...userdata,illness:e.target.value})}} />
            </Col>
            <Col md={3}>
                <br/><h4>Condition</h4>
                <input type="text" className="Reginput" value={userdata.pat_condition} onChange={e=>{setUserdata({...userdata,pat_condition:e.target.value})}} />
            </Col>
           </Row>
           <br/>
           <Row>
               <Col xs={7} lg={9}>
               </Col>
               <Col xs={5} lg={3} style={{textAlign:"right"}}>
            <Button variant="primary" style={{borderRadius:"35px",alignContent:"flex-end"}} onClick={()=>{console.log(userdata);setSubmit(true)}}>Create Account</Button>
               </Col>
           </Row>
           </div>
       </Container>
       </div>
    )
}

export default AdmitPagePatient
