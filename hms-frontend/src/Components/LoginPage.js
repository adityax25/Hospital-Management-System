import React, { useState } from 'react'
// import data from './credentials.json'
import {Modal, Button, Alert,Form} from 'react-bootstrap'
import classes from './stylesheet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from 'react-router-dom';
// function validate(cred){
//     if (cred.username===data.username&&cred.password===data.password) {
//       console.log("true man")
//     }
// }
function LoginPage(props) {
  const [cred,setCred]=useState({username:"",password:""})
  const [attempt,setAttempt]=useState(false)
  const [active,setActive]=useState(false)
  const [select,setSelect] = useState("doctor")
  const [message,setMessage] = useState(false)
  const newhistory = useHistory();
  function validate(cred){
    axios.get(`/${select}?username=${cred.username}`)
          .then(res =>{
            // console.log(res);
            if (cred.password===res.data[0].passkeys) {
              // console.log("true man")
              // console.log(props)
              // props.validate(true)
              console.log("logged in");
              let id = 0
              props.setloggedin("true")
              localStorage.setItem("usertype",select);
              if (select === "doctor") {
                localStorage.setItem("id",res.data[0].d_id)
                id = res.data[0].d_id;
              } else if (select === "patient") {
                localStorage.setItem("id",res.data[0].id)
                id = res.data[0].id;
              }else if (select === "staff") {
                localStorage.setItem("id",res.data[0].s_id)
                id = res.data[0].s_id;
              }
              setCred({...cred,username:"",password:""})
              setAttempt(false)
              setActive(true)
              setMessage(false)
              setSelect("doctor")
              props.onHide()
              newhistory.push(`/${select}/${id}`);
              // let usertype = localStorage.getItem("usertype");
              // let userid = localStorage.getItem("id");
              // console.log(usertype)
              // console.log(userid)
              // window.location.href = "/update"
              setMessage(false)
            }
            else{
            setAttempt(true)
            setActive(false)
            // props.validate(false)
            setMessage(<Alert key={0} variant="danger">Wrong Id or password.</Alert>)
            }
          })
          .catch(error=>{
            console.log(error);
            setMessage(<Alert key={0} variant="danger">Error in retriving data. Try Again later</Alert>)

          })
    // if (cred.username===data.username&&cred.password===data.password) {
    //   // console.log("true man")
    //   // console.log(props)
    //   props.validate(true)
    //   setCred({...cred,username:"",password:""})
    //   setAttempt(false)
    //   setActive(true)
    //   props.onHide()
    //   // window.location.href = "/update"
    // }
    // else{
    // setAttempt(true)
    // setActive(false)
    // props.validate(false)
    // }
}

  // message=<Alert key={1} variant="success">login Successful.</Alert>


    
    return (
        <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Login page
        </Modal.Title>
      </Modal.Header>
      <Modal.Body align="center">
        <FontAwesomeIcon style={{color:"#AAAAAA"}} icon={faUser} size="10x" />
        <br/>
        <br/>
        <p>
            User-Id
        </p>
        <input type="text" value={cred.username} className={classes.Login} onChange={e=>setCred({...cred,username: e.target.value})}></input>
        <p>
            Password
        </p>
        {/* style={{marginBottom:"20px",borderBottomColor:"black",borderTop:"Transparent",borderLeft:"Transparent",borderRight:"Transparent",outline:"none"}} */}
        <input type="password" value={cred.password} className={classes.Login} onChange={e=>setCred({...cred,password: e.target.value})}></input>
          <br/>
          <br/>
          <p>
            Login As
          </p>
          <Form>
          <Form.Group controlId="exampleForm.ControlSelect1" value={select} onChange={e=>{setSelect(e.target.value);}}>
              <Form.Control as="select">
                  <option key={1} value="doctor">Doctor</option>
                  <option key={2} value="patient">Patient</option>
                  <option key={3} value="staff">Staff</option>
              </Form.Control>
          </Form.Group>
          </Form>
      {message}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={()=>{
          // console.log(cred)
          validate(cred)
          }}>Login</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default LoginPage