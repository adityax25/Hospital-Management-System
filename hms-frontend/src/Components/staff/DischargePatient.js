import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function DischargePatient() {
    const [userdata,setUserdata] =useState([{}]) 
    const [submit,setSubmit] = useState(false)
    const [delDoc,setDelDoc]=useState(false)
    useEffect(()=>{
        axios.get("/patient")
            .then(resp=>{console.log(resp);setUserdata(resp.data)})
            .catch(err=>{console.log(err);})
    },[])
    useEffect(()=>{
        if(submit){
            axios.delete(`/patient/${delDoc}`)
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
            <Col xs={12}><h2 align="center">Discharge Patient</h2></Col>
            <Col md={12}>
                <br/><h4>Select Doctor</h4>
                <select name="gender" id="gender" className="Reginput" onChange={e=>{setDelDoc(e.target.value)}}>
                <option value={0} >-------Select Patient-------</option>
                    {userdata.map((obj)=>{
                        return(
                            <option value={obj.id} >{obj.id}) {obj.firstname} {obj.lastname} -- {obj.illness}</option>
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
            <Button variant="primary" style={{borderRadius:"35px",alignContent:"flex-end"}} onClick={()=>{console.log(delDoc);setSubmit(true)}}>Discharge Patient</Button>
               </Col>
           </Row>
           </div>
       </Container>
       </div>
    )
}

export default DischargePatient
