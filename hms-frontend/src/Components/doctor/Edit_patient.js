import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Edit_patient(props) {
    const user_id = props.match.params.id
    // const [ward_info,setWard_info] = useState([])
    const [med_info,setMed_info] = useState([])
    const [admitted,setAdmitted] = useState([])
    const [select,setSelect] = useState(false)
    const [selPal,setSelPal] = useState(false)
    const [submit,setSubmit] = useState(false)

    // const [patList,setPatList] = useState([])
    const [pat_data,setPat_data] = useState({pat_condition:"",m_id:"",p_id:""})
    useEffect(()=>{
        axios.get(`/medicine`)
        .then(resp=>{console.log(resp);setMed_info(resp.data)})
        .catch(error=>{console.log(error);})

        axios.get(`/doctor/${user_id}/admitted`)
        .then(resp=>{console.log(resp);setAdmitted(resp.data)})
        .catch(error=>{console.log(error);})
},[])
        useEffect(()=>{
            if(select){
                setPat_data({...admitted[selPal]})
            setSelect(false)  
            }

        },[select])

        useEffect(()=>{
            if (submit) {
                    axios.patch(`/doctor/${user_id}/admitted`,pat_data)
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
            <Col xs={12}><h2 align="center">Update Patient Condition</h2></Col>
            <Col md={12}>
                <br/><h4>Select Doctor</h4>
                <select name="gender" id="gender" className="Reginput" onChange={e=>{setSelPal(e.target.value)}}>
                <option value={-1} >-------Select Patient-------</option>
                    {admitted.map((obj,index)=>{
                        return(
                            <option value={index} >{obj.id}) {obj.firstname} {obj.lastname} -- {obj.illness}</option>
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
                <h5>{pat_data.illness}</h5>
                </Col>
                <Col md={6}>
                <br/><br/><h4>Ward No</h4>
                <h5>{pat_data.w_id}</h5>
                </Col>
                <Col md={6}>
                <br/><br/><h4>Ward Type</h4>
                <h5>{pat_data.ward_type}</h5>                
                </Col>
                <Col md={6}>
                <br/><br/><h4>Patient Condition</h4>
                <input type="text" className="Reginput" value={pat_data.pat_condition} onChange={e=>{setPat_data({...pat_data,pat_condition:e.target.value})}}/>
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

export default Edit_patient
