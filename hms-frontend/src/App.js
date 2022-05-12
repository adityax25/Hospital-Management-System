// import logo from './logo.svg';
// import './App.css';
import UserNavbar from "./Components/UserNavbar";
import HomePage from "./Components/HomePage";
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import doctorpage from "./Components/doctor/Doctorpage";
import Registrationpage from "./Components/patient/Registrationpage";
import Patientpage from "./Components/patient/Patientpage";
import Staffpage from "./Components/staff/Staffpage";
import UserFooter from "./Components/UserFooter";
function App() {
  return (
    <Router>
    <div className="App">
      <UserNavbar/>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/doctor/:id" component={doctorpage} />
          <Route path="/patient/registration" component={Registrationpage} />
          <Route path="/patient/:id" component={Patientpage} />
          <Route path="/staff/:id" component={Staffpage} />
        </Switch>
        <UserFooter/>
    </div>
    </Router>
  );
}

export default App;
