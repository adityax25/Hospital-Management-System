import React from 'react'
import {Container,Row,Col,Card,Table} from 'react-bootstrap'
import "./stylesheet.css"
import { FaWhatsapp,FaFacebookF,FaTwitter,FaTelegramPlane,FaDiscord,FaInstagram,FaYoutube } from "react-icons/fa";
function UserFooter() {
    return (
        <div className="Footer">
        <Container>
            <br/><br/><br/>
        <h2>Contact us on</h2>
        <FaWhatsapp style={{color:"white",backgroundColor:"green",fontSize:"4em",margin:"10px",padding:"10px",borderRadius:"50%"}} />
        <FaFacebookF style={{color:"white",backgroundColor:"blue",fontSize:"4em",margin:"10px",padding:"10px",borderRadius:"50%"}}/>
        <FaTwitter style={{color:"white",backgroundColor:"skyblue",fontSize:"4em",margin:"10px",padding:"10px",borderRadius:"50%"}} />
        <br/><br/>
        <FaTelegramPlane style={{color:"white",backgroundColor:"gray",fontSize:"4em",margin:"10px",padding:"10px",borderRadius:"50%"}} />
        <FaInstagram className="Instagrams" />
        <FaYoutube style={{color:"white",backgroundColor:"red",fontSize:"4em",margin:"10px",padding:"10px",borderRadius:"50%"}} />
        <br/><br/>
        <h5>Phone no:+91 9876543210</h5> <h5>Email:healthishappiness@gmail.com</h5>
        <br/><br/><br/>
        </Container>  
        </div>
    )
}

export default UserFooter
