import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Complete_appointment(props) {
    const user_id = props.match.params.id
    const [report_info,setReport_info] = useState([])
    const [admitted,setAdmitted] = useState([])

    const [med_info,setMed_info] = useState([])
    const [select,setSelect] = useState(false)
    const [submit,setSubmit] = useState(false)
    const [pat_data,setPat_data] = useState({pat_condition:"",m_id:"",p_id:""})
    const [selPal,setSelPal] = useState(false)
    useEffect(()=>{
        axios.get(`/doctor/${user_id}/pending`)
        .then(resp=>{console.log(resp);setReport_info(resp.data)})
        .catch(error=>{console.log(error);})

        axios.get(`/medicine`)
        .then(resp=>{console.log(resp);setMed_info(resp.data)})
        .catch(error=>{console.log(error);})
},[])
useEffect(()=>{
    if(select){
        setPat_data({...report_info[selPal]})
    setSelect(false)  
    }

},[select])

useEffect(()=>{
    if (submit) {
            axios.patch(`/doctor/${user_id}/pending`,pat_data)
          .then(resp =>{
            console.log(resp.data);
          })
          .catch(err=>{
              console.log(err);
          })
          setSubmit(false)
    }
},[submit])

    return (
        <div>
        <Container >
      <br/><br/><br/><br/>
       <Row >
       <Col xs={12}><h2 align="center">Complete Appointment</h2></Col>
       <Col md={12}>
           <br/><h4>Select Client</h4>
           <select name="gender" id="gender" className="Reginput" onChange={e=>{setSelPal(e.target.value)}}>
           <option value={-1} >-------Select Appointment-------</option>
               {report_info.map((obj,index)=>{
                   return(
                       <option value={index} >{obj.id}) {obj.firstname} {obj.lastname} -- {obj.ailments}</option>
                   )
               })}
           </select>
       </Col>
      </Row>
      <br/>
      <Row>
          <Col xs={7} lg={9}>
          </Col>
          <Col xs={5} lg={3} style={{textAlign:"right"}}>
       <Button variant="primary" style={{borderRadius:"35px",alignContent:"flex-end"}} onClick={()=>{console.log(selPal);setSelect(true)}}>Select Patient</Button>
          </Col>
      </Row>
      {selPal&&selPal>=0&&
      <div>
      <Row >
       <Col xs={12}>
       <div style={{textAlign:"center"}}>
       <Row>
           <Col md={6}>
           <br/><h4>Patient Name</h4>
           <h5>{pat_data.firstname} {pat_data.lastname}</h5>
           </Col>
           <Col md={6}>
           <br/><h4>Patient Illness</h4>
           <h5>{pat_data.ailments}</h5>
           </Col>
           <Col md={6}>
           <br/><br/><h4>Patient ID</h4>
           <h5>{pat_data.id}</h5>
           </Col>
           <Col md={6}>
           <br/><br/><h4>Date of Appointment</h4>
           <h5>{new Date(pat_data.date_of_consultant).toLocaleDateString("en-IN")}</h5>                
           </Col>
           <Col md={6}>
           <br/><br/><h4>Appointment Status</h4>
           <input type="text" className="Reginput" value={pat_data.appointment_status} onChange={e=>{setPat_data({...pat_data,appointment_status:e.target.value})}}/>
           </Col>
           <Col md={6}>
           <br/><br/><h4>Medicine Prescribed</h4>
           <select name="medicine_new" id="medicine_new" className="Reginput" value={pat_data.m_id} onChange={e=>{setPat_data({...pat_data,m_id:e.target.value})}}>
           <option value={0} >-------Select Medicine ----------</option>
           {med_info.map((obj,index)=>{
               return(
               <option value={obj.m_id} >{obj.m_id}) {obj.name} ----  {obj.used_for}</option>
               )
           })}
           </select>
           </Col>
       </Row>
      </div>
       </Col>
      </Row>
      <br/>
      <Row>
          <Col xs={7} lg={9}>
          </Col>
          <Col xs={5} lg={3} style={{textAlign:"right"}}>
       <Button variant="primary" style={{borderRadius:"35px",alignContent:"flex-end"}} onClick={()=>{console.log(pat_data);setSubmit(true)}}>Update Details</Button>
          </Col>
      </Row></div>
      }
   <br/>
      </Container>
   </div>
    )
}

export default Complete_appointment