import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";
import images from "../defaultimage.json"


function UpdatepageDoctors() {
    const [userdata,setUserdata] =useState([{}]) 
    const [select,setSelect] = useState(false)
    const [delDoc,setDelDoc]=useState(false)
    const [submit,setSubmit] = useState(false)

    const [displayuserdata,setDisplayUserdata] =useState({name: "",surname: "",username: "",gender: "",dept_id:"",passkeys:"",date_of_birth:"",date_of_joining:new Date().toISOString().substr(0, 10),address: "",specilization: "",salary:"",charges:"",documents: null,cabin_no: "",email: "",phone_no: ""}) 
    useEffect(()=>{
        axios.get("/doctor")
            .then(resp=>{console.log(resp);setUserdata(resp.data)})
            .catch(err=>{console.log(err);})
    },[])
    useEffect(()=>{
        if(select){
            setDisplayUserdata({...userdata[delDoc]})
          setSelect(false)  
        }

    },[select])

    useEffect(()=>{
        if (submit) {
            let senddata = {...displayuserdata,documents:null}
                axios.patch(`/doctor/${displayuserdata.d_id}`,senddata)
              .then(resp =>{
                console.log(resp.data);
              })
              .catch(err=>{
                  console.log(err);
              })
              setSubmit(false)
        }
        

    },[submit])

    let imageing = images.default
      if(displayuserdata.documents)
      {
          // console.log(userdata.documents)
          
          let bufferOriginal = Buffer.from(displayuserdata.documents);
          
          imageing = bufferOriginal.toString('base64')
      }

    return (
        <div>
            <div style={{minHeight:"100vh"}}>
       <Container >
           <br/><br/><br/><br/>
        {/* style={{marginBottom:"20px",borderBottomColor:"black",borderTop:"Transparent",borderLeft:"Transparent",borderRight:"Transparent",outline:"none"}} */}
           <div className="rowbox">
           <Row >
            <Col xs={12}><h2 align="center">Update Doctor Details</h2></Col>
            <Col md={12}>
                <br/><h4>Select Doctor</h4>
                <select name="gender" id="gender" className="Reginput" onChange={e=>{setDelDoc(e.target.value)}}>
                    {userdata.map((obj,index)=>{
                        return(
                            <option value={index} >{obj.d_id}) {obj.name} {obj.surname} -- {obj.specilization}</option>
                        )
                    })}
                    {/* <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="O">O</option> */}
                </select>
            </Col>
           </Row>
           <br/>
           <Row>
               <Col xs={7} lg={9}>
               </Col>
               <Col xs={5} lg={3} style={{textAlign:"right"}}>
            <Button variant="primary" style={{borderRadius:"35px",alignContent:"flex-end"}} onClick={()=>{console.log(delDoc);setSelect(true)}}>Select Doctor</Button>
               </Col>
           </Row>
           </div>
           {delDoc&&
           <div>
           <Row >
            <Col xs={12}>
            <div style={{textAlign:"center"}}>
            <h2>Your Image</h2>
            <img src={`data:image/jpeg;base64,${imageing}`} style={{height:"350px",width:"350px",borderRadius:"50%",borderWidth:"2px",borderColor:"black",borderStyle:"solid"}}/>
            <br/><br/><input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"></input>
            </div>
            </Col>
            <Col md={6}>
                <br/><h4>Name</h4>
                <input type="text" className="Reginput" value={displayuserdata.name} onChange={e=>{setDisplayUserdata({...displayuserdata,name:e.target.value})}} />
            </Col>
            <Col md={6}>
                <br/><h4>Surname</h4>
                <input type="text" className="Reginput" value={displayuserdata.surname} onChange={e=>{setDisplayUserdata({...displayuserdata,surname:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Username</h4>
                <input type="text" className="Reginput" value={displayuserdata.username} onChange={e=>{setDisplayUserdata({...displayuserdata,username:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Email Id</h4>
                <input type="email" className="Reginput" value={displayuserdata.email} onChange={e=>{setDisplayUserdata({...displayuserdata,email:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Address</h4>
                <input type="text" className="Reginput" value={displayuserdata.address} onChange={e=>{setDisplayUserdata({...displayuserdata,address:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Password</h4>
                <input type="text"className="Reginput" value={displayuserdata.passkeys} onChange={e=>{setDisplayUserdata({...displayuserdata,passkeys:e.target.value})}}/>
            </Col>
            <Col md={3}>
                <br/><h4>Date of Birth</h4>
                <input type="date" className="Reginput" value={displayuserdata.date_of_birth&&(new Date(displayuserdata.date_of_birth).toISOString().substr(0,10))} onChange={e=>{setDisplayUserdata({...displayuserdata,date_of_birth:e.target.value})}}/>
            </Col>
            <Col md={3}>
                <br/><h4>Gender</h4>
                <select name="gender" id="gender" value={displayuserdata.gender} className="Reginput" onChange={e=>{setDisplayUserdata({...displayuserdata,gender:e.target.value})}}>
                    <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="O">O</option>
                </select>
            </Col>
            <Col md={6}>
                <br/><h4>Phone no</h4>
                <input type="number" className="Reginput" value={displayuserdata.phone_no} onChange={e=>{setDisplayUserdata({...displayuserdata,phone_no:e.target.value})}} />
            </Col>
            <Col md={6}>
                <br/><h4>Specilization</h4>
                <input type="text" className="Reginput" value={displayuserdata.specilization} onChange={e=>{setDisplayUserdata({...displayuserdata,specilization:e.target.value})}}/>
            </Col>
            <Col md={3}>
                <br/><h4>Salary</h4>
                <input type="number" className="Reginput" value={displayuserdata.salary} onChange={e=>{setDisplayUserdata({...displayuserdata,salary:e.target.value})}}/>
            </Col>
            <Col md={3}>
                <br/><h4>Charges</h4>
                <input type="number" className="Reginput" value={displayuserdata.charges} onChange={e=>{setDisplayUserdata({...displayuserdata,charges:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Dept No</h4>
                <input type="number" className="Reginput" value={displayuserdata.dept_id} onChange={e=>{setDisplayUserdata({...displayuserdata,dept_id:e.target.value})}}/>
            </Col>
            <Col md={6}>
                <br/><h4>Cabin No</h4>
                <input type="number"className="Reginput" value={displayuserdata.cabin_no} onChange={e=>{setDisplayUserdata({...displayuserdata,cabin_no:e.target.value})}}/>
            </Col>
           </Row>
           <br/>
           <Row>
               <Col xs={7} lg={9}>
               </Col>
               <Col xs={5} lg={3} style={{textAlign:"right"}}>
            <Button variant="primary" style={{borderRadius:"35px",alignContent:"flex-end"}} onClick={()=>{console.log(displayuserdata);setSubmit(true)}}>Update Details</Button>
               </Col>
           </Row></div>
           }
        <br/>
       </Container>
       </div>
        </div>
    )
}

export default UpdatepageDoctors
