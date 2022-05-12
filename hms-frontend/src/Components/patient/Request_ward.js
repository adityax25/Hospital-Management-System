import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function  Request_ward(props) {
    const user_id = props.match.params.id
    const [userdata,setUserdata] =useState({id:user_id,w_id:"",d_id:"",condition:"",illness:""}) 
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
            axios.post(`/patient/${user_id}/request_ward`,userdata)
                .then(resp=>{console.log(resp)})
                .catch(err=>{console.log(err);})
            setSubmit(false)
        }
    },[submit])
    return (
        <Container>
            <br/><br/><br/><br/>
            <h2>Request a ward</h2>
            <br/>
            <Row>
            <Col md={6}>
                <br/><h4>Ward No</h4>
                <select name="ward_select" id="ward_select" value={userdata.w_id} className="Reginput" onChange={e=>{setUserdata({...userdata,w_id:e.target.value})}}>
                    {ward_info.map((obj,index)=>{
                        return(
                            <option value={obj.w_id}>{obj.w_id}-{obj.ward_type}-{obj.price} </option>
                        )
                    })}
                </select>
            </Col>
            <Col md={6}>
                <br/><h4>Select Doctor</h4>
                <select name="doc_select" id="doc_select" value={userdata.d_id} className="Reginput" onChange={e=>{setUserdata({...userdata,d_id:e.target.value})}} >
                    {doc_info.map((obj)=>{
                        return(
                            <option value={obj.d_id} >{obj.d_id}) {obj.name} {obj.surname} -- {obj.specilization}</option>
                        )
                    })}
                </select>
            </Col>
            <Col md={12}>
                <br/><h4>Illness</h4>
                <input type="text" className="Reginput" value={userdata.illness} onChange={e=>{setUserdata({...userdata,illness:e.target.value})}} />
            </Col>
            <Col md={12}>
                <br/><h4>Condition</h4>
                <input type="text" className="Reginput" value={userdata.pat_condition} onChange={e=>{setUserdata({...userdata,pat_condition:e.target.value})}} />
            </Col>
           </Row>
           <br/>
           <Row>
               <Col xs={7} lg={9}>
               </Col>
               <Col xs={5} lg={3} style={{textAlign:"right"}}>
            <Button variant="primary" style={{borderRadius:"35px",alignContent:"flex-end"}} onClick={()=>{console.log(userdata);setSubmit(true)}}>Request Ward</Button>
               </Col>
           </Row>
        </Container>
    )
}

export default Request_ward
