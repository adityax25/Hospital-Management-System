import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap'
// import "./newstyles.css"
import axios from "axios"

function Registrationpage() {
    const inp_style = {width:"98%",marginBottom:"20px",borderBottomColor:"black",backgroundColor:"Transparent",borderTop:"Transparent",borderLeft:"Transparent",borderRight:"Transparent",outline:"none"}
    const [userdata,setUserdata] =useState({name: "",surname: "",username: "",gender: "",dept_id:"",passkeys:"",date_of_birth:"",date_of_joining:new Date().toISOString().substr(0, 10),address: "",specilization: "",salary:"",charges:"",documents: null,cabin_no: "",email: "",phone_no: ""}) 

    const [submit,setSubmit] = useState(false)
    useEffect(()=>{
        if(submit){
            axios.post("/doctor",userdata)
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
           <div>
           <Row >
            <Col xs={12}><h2 align="center">Registration for Doctors</h2></Col>
            <Col md={6}>
                <br/><h4>Name</h4>
                <input type="text" className="Reginput" value={userdata.firstname} onChange={e=>{setUserdata({...userdata,name:e.target.value})}} />
            </Col>
            <Col md={6}>
                <br/><h4>Surname</h4>
                <input type="text" className="Reginput" value={userdata.lastname} onChange={e=>{setUserdata({...userdata,surname:e.target.value})}}/>
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
                <input type="text"className="Reginput" value={userdata.passkeys} onChange={e=>{setUserdata({...userdata,passkeys:e.target.value})}}/>
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
            <Col md={6}>
                <br/><h4>Specilization</h4>
                <input type="text" className="Reginput" value={userdata.specilization} onChange={e=>{setUserdata({...userdata,specilization:e.target.value})}}/>
            </Col>
            <Col md={3}>
                <br/><h4>Salary</h4>
                <input type="number" className="Reginput" value={userdata.salary} onChange={e=>{setUserdata({...userdata,salary:e.target.value})}}/>
            </Col>
            <Col md={3}>
                <br/><h4>Charges</h4>
                <input type="number" className="Reginput" value={userdata.charges} onChange={e=>{setUserdata({...userdata,charges:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Dept No</h4>
                <input type="number" className="Reginput" value={userdata.dept_id} onChange={e=>{setUserdata({...userdata,dept_id:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Cabin No</h4>
                <input type="number"className="Reginput" value={userdata.cabin_no} onChange={e=>{setUserdata({...userdata,cabin_no:e.target.value})}}/>
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
       <br/>
       </div>
    )
}

export default Registrationpage
