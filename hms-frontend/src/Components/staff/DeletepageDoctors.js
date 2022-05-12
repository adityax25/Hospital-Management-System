import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function DeletepageDoctors() {
    // const inp_style = {width:"98%",marginBottom:"20px",borderBottomColor:"black",backgroundColor:"Transparent",borderTop:"Transparent",borderLeft:"Transparent",borderRight:"Transparent",outline:"none"}
    const [userdata,setUserdata] =useState([{}]) 
    const [submit,setSubmit] = useState(false)
    const [delDoc,setDelDoc]=useState(false)
    useEffect(()=>{
        axios.get("/doctor")
            .then(resp=>{console.log(resp);setUserdata(resp.data)})
            .catch(err=>{console.log(err);})
    },[])
    useEffect(()=>{
        if(submit){
            axios.delete(`/doctor/${delDoc}`)
                .then(resp=>{console.log(resp)})
                .catch(err=>{console.log(err);})
            setSubmit(false)
        }
    },[submit])
    return (
        <div style={{minHeight:"100vh"}}>
       <Container >
           <br/><br/><br/><br/>
        {/* style={{marginBottom:"20px",borderBottomColor:"black",borderTop:"Transparent",borderLeft:"Transparent",borderRight:"Transparent",outline:"none"}} */}
           <div className="rowbox">
           <Row >
            <Col xs={12}><h2 align="center">Delete Doctor</h2></Col>
            <Col md={12}>
                <br/><h4>Select Doctor</h4>
                <select name="gender" id="gender" className="Reginput" onChange={e=>{setDelDoc(e.target.value)}}>
                <option value={0} >-------Select Doctor-------</option>
                    {userdata.map((obj)=>{
                        return(
                            <option value={obj.d_id} >{obj.d_id}) {obj.name} {obj.surname} -- {obj.specilization}</option>
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
            <Button variant="primary" style={{borderRadius:"35px",alignContent:"flex-end"}} onClick={()=>{console.log(delDoc);setSubmit(true)}}>Delete Doctor</Button>
               </Col>
           </Row>
           </div>
       </Container>
       </div>
    )
}

export default DeletepageDoctors
