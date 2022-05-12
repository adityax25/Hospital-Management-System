import React,{useState,useEffect} from 'react'
import { Navbar, Nav, Container, Row,NavDropdown} from "react-bootstrap";
import LoginPage from "./LoginPage";
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from 'react-router-dom';

function UserNavbar() {
    
    const history = useHistory()
    const [showlogin,setShowLogin] = useState(false)
    const [info,setInfo] = useState(<Nav.Link onClick={()=>{setShowLogin(true)}} >Login</Nav.Link>)
    const [isloggedin,setIsLoggedIn] = useState("false")
    let user_id
    let user_type
    useEffect(()=>{
        user_id = localStorage.getItem("id")
        user_type = localStorage.getItem("usertype")
        localStorage.setItem("id",user_id)
        localStorage.setItem("usertype",user_type)
        if (user_id) {
            setIsLoggedIn("true")
        } 
    },[])

    useEffect(()=>{
        user_id = localStorage.getItem("id")
        user_type = localStorage.getItem("usertype")
    },[isloggedin])
    // const showInfo = () => {
    //     if (localStorage.getItem("id")) {
    //         setIsLoggedIn("true")
    //     } else{
    //         setIsLoggedIn("false") 
    //     }
    // }
    // try{
    //     if (localStorage.getItem("id")) {
    //         setIsLoggedIn("true")
    //     } else{
    //         setIsLoggedIn("false") 
    //     }
    // }
    // catch{
    console.log(user_id);
    console.log(user_type);
    // }
    
    return (
        <div>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                <Navbar.Brand href="/#home">Health is Happiness</Navbar.Brand>
                <Nav className="ml-auto">
                <Nav.Link href="/#home">Home</Nav.Link>
                {isloggedin!=="true"&&<Nav.Link><Link to="/patient/registration" className="medlinks" >Sign Up</Link></Nav.Link>}
                <LoginPage show={showlogin} onHide={() => {setShowLogin(false)}} isloggedin={isloggedin} setloggedin={setIsLoggedIn}></LoginPage>
                {/* <Nav.Link onClick={()=>setShowLogin(true)} >Login</Nav.Link> */}
                {isloggedin==="true"&&<Nav.Link onClick={()=>{history.push(`/${user_type}/${user_id}`)}}>Dashboard</Nav.Link>}
                {isloggedin==="true"?<Nav.Link onClick={()=>{localStorage.clear();setIsLoggedIn("false");history.push("/");}}>Logout</Nav.Link>:<Nav.Link onClick={()=>{setShowLogin(true)}} >Login</Nav.Link>}
                </Nav>
                    {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Form> */}
                </Container>
            </Navbar>
        </div>
    )
}

export default UserNavbar
