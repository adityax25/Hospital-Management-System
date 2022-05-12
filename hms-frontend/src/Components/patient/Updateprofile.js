import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Card,Table,Button} from 'react-bootstrap'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from 'axios'
import images from "../defaultimage.json"

function Updateprofile(props) {
    const inp_style = {width:"98%",marginBottom:"20px",borderBottomColor:"black",backgroundColor:"Transparent",borderTop:"Transparent",borderLeft:"Transparent",borderRight:"Transparent",outline:"none"}
    const user_id = props.match.params.id
    const [userdata,setUserdata] = useState({})
    const [backup,setBackup] = useState([])
    const [toupdate,setToUpdate] = useState({username:"",address:"",email:"",phone_no:"",passkeys:""})
    const [showpass,setShowpass] = useState(false)
    useEffect(()=>{
        axios.get(`/patient/${user_id}`)
            .then(resp =>{
              console.log(resp.data[0]);
              setUserdata(resp.data[0]);
              setToUpdate({...resp.data[0],images:null});
            //   let new_backup =JSON.parse(JSON.stringify(response.data.data.about[0]));
              let new_backup =JSON.stringify({...resp.data[0],images:null});
              setBackup(new_backup)
            })
            .catch(err=>{
                console.log(err);
            })
    },[])
    const updatedata = () =>{
      
        if ((new_pass===re_new_pass)&&((curr_pass===""&&curr_pass===new_pass)||curr_pass===userdata.passkeys)) {
          console.log("works1");
          let senddata
          if (curr_pass===toupdate.passkeys) {
            setToUpdate({...toupdate,passkeys:new_pass,images:null})
            console.log("works2");
            senddata = {...toupdate,passkeys:new_pass,images:null}
            // console.log(toupdate);
            // console.log(new_pass);
          }
          else{
            senddata = {...toupdate,images:null}
          }
  
          if (toupdate.username!==""&&toupdate.address!==""&&toupdate.phone_no!==""&&toupdate.email!=="") {
            console.log(senddata);
            axios.patch(`/patient/${user_id}`,senddata)
                .then(resp =>{
                  console.log(resp.data);
                })
                .catch(err=>{
                    console.log(err);
                })
          } 
        }
      }
      let imageing = images.default
      if(userdata.images)
      {
          // console.log(userdata.documents)
          
          let bufferOriginal = Buffer.from(userdata.images);
          
          imageing = bufferOriginal.toString('base64')
      }
      const Reset = () =>{
          // setUserdata(JSON.parse(backup))
          // setToUpdate({username:userdata.username,address:userdata.address,email:userdata.email,phone_no:userdata.phone_no,passkeys:userdata.passkeys})
          setToUpdate(JSON.parse(backup))
      }
    
        const [curr_pass,setCurr_pass]=useState("")
        const [new_pass,setNew_pass]=useState("")
        const [re_new_pass,setRe_new_pass]=useState("")
    return (
        <div>
           <br/><br/><br/>
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
            <br/>
            {showpass&&<div>
              <h4>Current password</h4>
              <input type='password' value={curr_pass} style={{width:"98%", height:"35px"}} onChange={e=>{setCurr_pass(e.target.value)}} /><br/><br/>
              <h4>New password:</h4>
              <input type='password' value={new_pass} style={{width:"98%", height:"35px"}} onChange={e=>{setNew_pass(e.target.value)}} /><br/><br/>
              <h4>Retype new password:</h4>
              <input type='password' value={re_new_pass} style={{width:"98%", height:"35px"}} onChange={e=>{setRe_new_pass(e.target.value)} }/><br/><br/>
            </div>}
            <br/>
            <Row>
                <Col xs={2}>
                    <Button style={{backgroundColor:"#f00000",borderRadius:"35px"}} size="lg" onClick={()=>{Reset()}}>
                    Reset
                    </Button>
                </Col>
                <Col xs={7} lg={8} style={{textAlign:"center"}}>
                  {showpass?<Button style={{backgroundColor:"#0000f0",borderRadius:"35px"}} size="lg" onClick={()=>{setShowpass(false)}}>
                   Hide Change Password
                  </Button>:<Button style={{backgroundColor:"#0000f0",borderRadius:"35px"}} size="lg" onClick={()=>{setShowpass(true)}}>
                   Change Password
                  </Button>}
                </Col>
                <Col xs={2}>
                    <Button style={{backgroundColor:"#00f000",borderRadius:"35px"}} size="lg" onClick={()=>{updatedata()}}>
                    Update
                    </Button>
                </Col>
            </Row>
            <br/> 
        </div>
    )
}

export default Updateprofile
