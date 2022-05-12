import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap'
import "./newstyles.css"
import axios from "axios"

function Registrationpage() {
    const inp_style = {width:"98%",marginBottom:"20px",borderBottomColor:"black",backgroundColor:"Transparent",borderTop:"Transparent",borderLeft:"Transparent",borderRight:"Transparent",outline:"none"}
    const [userdata,setUserdata] =useState({firstname:"",lastname:"",username:"",passkeys:"",email:"",address:"",phone_no:"",gender:"",date_of_birth:""}) 
    const [submit,setSubmit] = useState(false)
    useEffect(()=>{
        if(submit){
            axios.post("/patient",userdata)
                .then(resp=>{console.log(resp)})
                .catch(err=>{console.log(err);})
            setSubmit(false)
        }
    },[submit])
    return (
        <div className={"Contained"}>
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

export default Registrationpage
