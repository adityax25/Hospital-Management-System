import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Request_medicine(props) {
    const user_id = props.match.params.id
    const [userdata,setUserdata] =useState({id:user_id,m_id:"",units:0}) 
    const [submit,setSubmit] = useState(false)
    const [ward_info,setWard_info] = useState([])
    const [doc_info,setDoc_info] = useState([])
    useEffect(()=>{
        axios.get(`/medicine`)
        .then(resp=>{console.log(resp);setWard_info(resp.data)})
        .catch(error=>{console.log(error);})
    },[])
    useEffect(()=>{
        if(submit){
            axios.post(`/patient/${user_id}/request_medicine`,userdata)
                .then(resp=>{console.log(resp)})
                .catch(err=>{console.log(err);})
            setSubmit(false)
        }
    },[submit])
    return (
        <div>
            <Container>
            <br/><br/><br/><br/>
            <h2>Order Units</h2>
            <br/>
            <Row>
            <Col md={12}>
                <br/><h4>Select Medicine</h4>
                <select name="ward_select" id="ward_select" value={userdata.m_id} className="Reginput" onChange={e=>{setUserdata({...userdata,m_id:e.target.value})}}>
                    {ward_info.map((obj,index)=>{
                        return(
                            <option key={obj.m_id} value={obj.m_id}>{obj.m_id}-{obj.name}-{obj.used_for}--{obj.price} </option>
                        )
                    })}
                </select>
            </Col>
            <Col md={12}>
                <br/><h4>Units to be Ordered</h4>
                <input type="number" className="Reginput" value={userdata.units} onChange={e=>{setUserdata({...userdata,units:e.target.value})}} />
            </Col>
           </Row>
           <br/>
           <Row>
               <Col xs={7} lg={9}>
               </Col>
               <Col xs={5} lg={3} style={{textAlign:"right"}}>
            <Button variant="primary" style={{borderRadius:"35px",alignContent:"flex-end"}} onClick={()=>{console.log(userdata);setSubmit(true)}}>Place Order</Button>
               </Col>
           </Row>
        </Container>
        </div>
    )
}

export default Request_medicine
