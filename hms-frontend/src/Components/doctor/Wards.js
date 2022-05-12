import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from "axios";

function Wards(props) {
    const user_id = props.match.params.id
    const [ward_info,setWard_info] = useState([])
    useEffect(()=>{
        axios.get(`/ward`)
        .then(resp=>{console.log(resp);setWard_info(resp.data)})
        .catch(error=>{console.log(error);})
},[])
    return (
        <div>
            <br/><br/><br/>
            <br/><br/><h2>Ward Status in Hospital</h2><br/>
            <Row>
                <Col>
                <Table striped bordered hover responsive>
                <thead style={{color:"#fff",backgroundColor:"#2029a4"}}>
                        <tr>
                        <th>Ward No.</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ward_info.map((obj,index)=>{
                            return(
                                <tr>
                                    <td>{obj.w_id}</td>
                                    <td>{obj.ward_type}</td>
                                    <td>{obj.price}</td>
                                    <td>{obj.is_avaliable===1?"available":"occupied"}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </div>
    )
}

export default Wards
