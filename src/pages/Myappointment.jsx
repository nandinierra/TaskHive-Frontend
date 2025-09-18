

import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Myappointment = () => {
  
  const { token, backendUrl } = useContext(AppContext);
  const [technicianData, setTechnicianData] = useState([])


useEffect(() => {
    const getTheAppointments = async () => {
        try {
            const options = {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };
            const response = await fetch(backendUrl + "/api/technician/get-appointment", options);
            
            if (!response.ok) {
                // If the response is not successful (e.g., 403, 404, 500)
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Assuming a successful response returns an array of appointments
            console.log(data);
            setTechnicianData(data);
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
            // You can set an error state here to show a message to the user
            setTechnicianData([]); // Ensure it's an empty array to prevent the .map() error
        }
    };
    
    // Only call the function if a token exists
    if (token) {
        getTheAppointments();
    } 
    
    else {
        console.log("No token available. Cannot fetch appointments.");
        setTechnicianData([]);
    }
    
}, [token]); // Add token to dependency array

 const cancelAppointment=async (appointmentId)=>{
    const options={
      "method":"DELETE",
      "headers":{
         "Content-Type":"application/json",
         "Authorization":`Bearer ${token}`
      }
    }
    const response= await fetch(backendUrl, `/delete-appointment/${appointmentId}`, options)
    const data=response.json();
    console.log(data)
 }

  return (
    <div className="min-h-screen mt-[60px] bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My Appointments
        </h1>

        {technicianData.length === 0 ? (
          <p className="text-gray-600">You have no appointments yet.</p>
        ) : (
          <div className="space-y-6">
            {technicianData.map((tech) => (
              <div
                key={tech._id}
                className="flex items-center justify-between bg-gray-50 border rounded-lg p-4 shadow-sm"
              >
              
                <div className="flex items-center gap-4">
                  <img
                    src={tech.technicianId.image}
                    alt={tech.technicianId.name}
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {tech.technicianId.name}
                    </h2>
                    <p className="text-sm text-gray-600">{tech.technicianId.profession}</p>
                    <p className="text-sm text-gray-500">
                      Experience: {tech.technicianId.experience}
                    </p>
                  </div>
                </div>

              
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Pay Online
                  </button>
                  <button onClick={cancelAppointment(tech.technicianId._id)}
                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Myappointment;
