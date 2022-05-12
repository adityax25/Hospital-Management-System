import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from 'axios'
import images from "../defaultimage.json"

function Profile(props) {
    const user_id = props.match.params.id
    const [userdata,setUserdata] = useState({})
    useEffect(()=>{
        axios.get(`/doctor/${user_id}`)
            .then(resp =>{
              console.log(resp.data[0]);
              setUserdata(resp.data[0]);  
            })
            .catch(err=>{
                console.log(err);
            })
    },[])

    let imageing = images.default
    if(userdata.documents)
    {
        console.log(userdata.documents)
        
        let bufferOriginal = Buffer.from(userdata.documents);
        
        imageing = bufferOriginal.toString('base64')
    }
    return (
        <div style={{textAlign:"center"}}>
            <br/><br/><br/>
            <h2>Your Profile</h2>
            <img src={`data:image/jpeg;base64,${imageing}`} style={{height:"350px",width:"350px",borderRadius:"50%",borderWidth:"2px",borderColor:"black",borderStyle:"solid"}}/>

            <h3>Name: {userdata.name} {userdata.surname}</h3>
            <br/><br/>
            <Row>
                <Col lg={6}>
                <h4><br/>Username: {userdata.username}</h4>
                </Col>
                <Col lg={6}>
                <h4><br/>ID Number: {userdata.d_id}</h4>
                </Col>
                <Col lg={6}>
                <h4><br/>Cabin No: {userdata.cabin_no}</h4>
                </Col>
                <Col lg={6}>
                {/* <br/><h4>Email ID: {userdata.email}</h4> */}
                <h4><br/>Date of Joining : {new Date(userdata.date_of_joining).toLocaleDateString("en-IN")}</h4>
                </Col>
                <Col lg={6}>
                <h4><br/>Phone No: {userdata.phone_no}</h4>
                </Col>
                <Col lg={6}>
                <h4><br/>Desigination: {userdata.specilization}</h4>
                </Col>
                <Col lg={6}>
                {/* <br/><h4>Address: {userdata.address}</h4> */}
                <h4><br/>Date of Birth: {new Date(userdata.date_of_birth).toLocaleDateString("en-IN")}</h4>
                </Col>
                <Col lg={6}>
                <h4><br/>Gender : {userdata.gender}</h4>
                </Col>
                <Col lg={6}>
                <h4><br/>Salary: {userdata.salary}</h4>
                </Col>
                
                <Col lg={6}>
                {/* <h4>Date of Joining : {new Date(userdata.date_of_joining).toLocaleDateString("en-IN")}</h4> */}
                <h4><br/>Email ID: {userdata.email}</h4>
                </Col>
                <Col lg={12}>
                {/* <h4>Date of Birth: {new Date(userdata.date_of_birth).toLocaleDateString("en-IN")}</h4> */}
                <h3><br/>Address: {userdata.address}</h3>
                </Col>
            </Row>
            <br/>
            <div style={{textAlign:"end"}}> 
            <Link to={`/doctor/${user_id}/profile/update`}>
            <Button style={{backgroundColor:"#300a35",borderRadius:"35px"}} size="lg">
                Change Info &gt;
            </Button>
            </Link>
            </div>
            <br/>
        </div>
    )
}

export default Profile
