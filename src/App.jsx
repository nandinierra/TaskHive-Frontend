
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Technicians from "./pages/Technicians.jsx";
import Myprofile from "./pages/Myprofile.jsx";
import Myappointment from "./pages/Myappointment.jsx";
import Appointment from "./pages/Appointment/Appointment.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";


const App = () => {

  return (
    <div>
    
      <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} /> 
      <Route path="/signup" element={<Signup />} />

      <Route path="/Technicians" element={<Technicians/>} /> 
      <Route path="/Technicians/:specificprovider" element={<Technicians/>} />  
      
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/myprofile" element={<Myprofile/>} />
        <Route path="/myappointment" element={<Myappointment/>} />
        <Route path="/appointment/:technicianId" element={<Appointment/>} />
    </Routes>
       <Footer/>
    </div>
  )

  
}

export default App

