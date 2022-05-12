import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";
import images from "../defaultimage.json"

function UpdatepagePatient() {
    const user_id = props.match.params.id
    const [userdata,setUserdata] = useState({})
    const [select,setSelect] = useState(false)
    const [backup,setBackup] = useState([])
    const [delDoc,setDelDoc]=useState(false)
    const [toupdate,setToUpdate] = useState({username:"",address:"",email:"",phone_no:"",passkeys:""})
    useEffect(()=>{
        axios.get("/patient")
            .then(resp=>{console.log(resp);setUserdata(resp.data)})
            .catch(err=>{console.log(err);})
    },[])
    useEffect(()=>{
        if(select){
            setToUpdate({...userdata[delDoc]})
          setSelect(false)  
        }

    },[select])
    const updatedata = () =>{
          console.log(senddata);
            axios.patch(`/patient/${user_id}`,toupdate)
            .then(resp =>{
                  console.log(resp.data);
            })
            .catch(err=>{
                    console.log(err);
            }) 
      }
      let imageing = images.default
      if(userdata.documents)
      {
          // console.log(userdata.documents)
          
          let bufferOriginal = Buffer.from(userdata.documents);
          
          imageing = bufferOriginal.toString('base64')
      }
    return (
        <div>
            <Container >
           <br/><br/><br/><br/>
        {/* style={{marginBottom:"20px",borderBottomColor:"black",borderTop:"Transparent",borderLeft:"Transparent",borderRight:"Transparent",outline:"none"}} */}
           <div className="rowbox">
           <Row >
            <Col xs={12}><h2 align="center">Update Patient Details</h2></Col>
            <Col md={12}>
                <br/><h4>Select Patient</h4>
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
               <h2>Update Profile page</h2>
            <br/><br/>
            <div style={{textAlign:"center"}}>
            <h2>Your Image</h2>
            <img src={`data:image/jpeg;base64,${imageing}`} style={{height:"350px",width:"350px",borderRadius:"50%",borderWidth:"2px",borderColor:"black",borderStyle:"solid"}}/>
            <br/><br/><input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"></input>
            </div>
            <h4>Name:</h4>
            <input type='text' value={toupdate.firstname} style={{width:"98%", height:"35px"}} onChange={e=>setToUpdate({...toupdate,firstname:e.target.value})} /><br/><br/>
            <h4>Surname:</h4>
            <input type='text' value={toupdate.lastname} style={{width:"98%", height:"35px"}} onChange={e=>setToUpdate({...toupdate,lastname:e.target.value})} /><br/><br/>
            <h4>Username:</h4>
            <input type='text' value={toupdate.username} style={{width:"98%", height:"35px"}} onChange={e=>setToUpdate({...toupdate,username:e.target.value})} /><br/><br/>
            <h4>Phone No:</h4>
            <input type='number' value={toupdate.phone_no} style={{width:"98%", height:"35px"}} onChange={e=>setToUpdate({...toupdate,phone_no: e.target.value})} /><br/><br/>
            <h4>Email ID:</h4>
            <input type='text' value={toupdate.email} style={{width:"98%", height:"35px"}} onChange={e=>setToUpdate({...toupdate,email: e.target.value})} /><br/><br/>
            <h4>Address:</h4>
            <input type='text' value={toupdate.address} style={{width:"98%", height:"35px"}} onChange={e=>setToUpdate({...toupdate,address: e.target.value})} /><br/><br/>
            <h4>Date of Birth:</h4>
            <input type='date' value={toupdate.date_of_birth&&(new Date(toupdate.date_of_birth).toISOString().substr(0, 10))} style={{width:"98%", height:"35px"}} onChange={e=>setToUpdate({...toupdate,date_of_birth: e.target.value})} /><br/><br/>
            <h4>Gender</h4>
            <select name="gender" id="gender" value={toupdate.gender} style={inp_style} onChange={e=>{setToUpdate({...toupdate,gender:e.target.value})}}>
                    <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="O">O</option>
            </select>
            <h4>Password</h4>
            <input type='text' value={toupdate.passkeys} style={{width:"98%", height:"35px"}} onChange={e=>{setToUpdate({...toupdate,passkeys:e.target.value})}} /><br/><br/>
           <br/><br/><br/>
           <Button style={{backgroundColor:"#00f000",borderRadius:"35px"}} size="lg" onClick={()=>{updatedata()}}>
            Update
            </Button>
           </div>
           }
           </Container>
        </div>
    )
}

export default UpdatepagePatient
