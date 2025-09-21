import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import TechnicianProfile from "./Techniciansprofile.jsx";
import ServiceSelection from "./ServiceSelection.jsx";
import DateSelection from "./DateSelection.jsx";
import TimeSlotSelection from "./TimeSlotSelection.jsx";
import CustomerForm from "./CustomerForm.jsx";
import BookingSummary from "./BookingSummary.jsx";
import ServiceGuarantees from "./ServiceGuarantees.jsx";



const Appointment = () => {
  const { technicianId } = useParams();
  const { technicians, token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [techInfo, setTechInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerProblem, setCustomerProblem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

 

  const allTimeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "01:00 PM", "02:00 PM", 
    "03:00 PM", "04:00 PM", "05:00 PM", 
    "06:00 PM", "07:00 PM", "08:00 PM", 
    "09:00 PM"
  ];


  // Get date options
  const getDateOptions = () => {
    const options = [];
    const today = new Date();  //Sat Sep 20 2025 10:44:21 GMT+0530 (India Standard Time)
    console.log("today",today)
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      console.log("checking date format", date.toISOString())
      const formattedDate = date.toISOString().split('T')[0];  //2025-09-23
      
      const displayDate = date.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      console.log("displaydate",displayDate)
      options.push({
        value: formattedDate,
        label: i === 0 ? `Today, ${displayDate}` : i === 1 ? `Tomorrow, ${displayDate}` : displayDate
      });
    }
    
    return options;
  };


  const dateOptions = getDateOptions();




  const getServiceTypes = (profession) => {
    const services = {
      Electrician: ["Wiring Installation", "Lighting Setup", "Outlet Repair", "Panel Upgrade", "Smart Home Setup"],
      Plumber: ["Leak Repair", "Pipe Installation", "Drain Cleaning", "Fixture Installation", "Water Heater Repair"],
      Carpenter: ["Furniture Repair", "Cabinet Making", "Installation", "Custom Woodwork", "Deck Building"],
      "Appliance Repair": ["Washer/Dryer Repair", "Refrigerator Repair", "Oven Repair", "Dishwasher Repair"],
      Painter: ["Interior Painting", "Exterior Painting", "Wallpaper Installation", "Color Consultation"],
      "Car Washer": ["Basic Wash", "Premium Detailing", "Interior Cleaning", "Waxing", "Polishing"]
    };
    
    return services[profession] || ["General Service"];
  };


/**doubt */
  const isSlotAvailable = (date, slotTime) => {
    const isBooked = bookedSlots.some(booking => 
      booking.date === date && booking.time === slotTime
    );
    
    if (isBooked) return false;
    
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${convertTo24Hour(slotTime)}:00`);
    
    return selectedDateTime > now;
  };

  // Convert to 24-hour format (FIXED) 

  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12' && modifier === 'AM') {
      hours = '00';
    } else if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate service price
  const calculateServicePrice = () => {
    if (!techInfo || !serviceType) return 0;
   
    let basePrice = techInfo.hourlyRate || 500;
    
    const service = serviceType.toLowerCase();
    
    if (service.includes("installation") || service.includes("upgrade")) {
      basePrice += 200;
    } else if (service.includes("repair")) {
      basePrice += 100;
    } else if (service.includes("premium") || service.includes("detailing")) {
      basePrice += 300;
    }
    
    return basePrice;
  };


  // Fetch technician info
  const fetchTechInfo = async () => {
    console.log('fetch techniciansId', technicians)
    const techInfor = technicians.find(tech => tech._id === (technicianId));
     console.log("technicianId",technicianId)
    setTechInfo(techInfor);

    if (techInfor) {
      const services = getServiceTypes(techInfor.profession);
      if (services.length > 0) {
        setServiceType(services[0]);
      }
    }

  };

  // Fetch booked slots
  const fetchBookedSlots = async () => {
    setLoadingSlots(true);
    try {
      const mockBookedSlots = [
        { date: new Date().toISOString().split('T')[0], time: "10:00 AM" },
        { date: new Date().toISOString().split('T')[0], time: "02:00 PM" },
        { 
          date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], 
          time: "11:00 AM" 
        },
      ];
 
      setBookedSlots(mockBookedSlots);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchTechInfo();
    fetchBookedSlots();
    
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, [technicians, technicianId]);


  const userData = async () => {
    try {
      const options = {
        "method" : "POST",
        "headers" : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({technicianId:technicianId})
      }
     console.log("options",options)
      const response= await fetch(backendUrl+"/api/technician/book-appointment", options)
      const data=await response.json();
      console.log(data);

      return data; // Return data for potential use
    } catch (error) {
      console.error("API call failed:", error);
      throw error; // Re-throw to be caught by handleSubmit
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    setIsSubmitting(true);
    try {
    if(token){
      const servicePrice = calculateServicePrice();
      const bookingData = {
        technicianId,
        technicianName: techInfo.name,
        date: selectedDate,
        time: selectedSlot,
        serviceType,
        customerName,
        customerPhone,
        customerAddress,
        problemDescription: customerProblem,
        price: servicePrice,
        status: "confirmed",
        bookedAt: new Date().toISOString()
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setBookedSlots([...bookedSlots, { date: selectedDate, time: selectedSlot }]);
      
      // Await the API call here
      await userData();
      alert("booked successfully")
        
      navigate("/myappointment", { state: { booking: bookingData }}); 
    }

    else{
        navigate('/login', {replace:true})
    }
      
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!techInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading technician information...</p>
        </div>
      </div>
    );
  }

  const servicePrice = calculateServicePrice();
  const taxAmount = servicePrice * 0.18;
  const totalPrice = servicePrice + taxAmount;

  return (
    <div className="min-h-screen mt-[70px] bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Technicians
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <TechnicianProfile 
              techInfo={techInfo} 
              formatCurrency={formatCurrency}
            />
            
            <div className="md:w-3/5 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ServiceSelection 
                    techInfo={techInfo}
                    serviceType={serviceType}
                    setServiceType={setServiceType}
                    getServiceTypes={getServiceTypes}
                  />
                  
                  <DateSelection 
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    dateOptions={dateOptions}
                  />
                  
                  <TimeSlotSelection 
                    selectedDate={selectedDate}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                    loadingSlots={loadingSlots}
                    allTimeSlots={allTimeSlots}
                    isSlotAvailable={isSlotAvailable}
                  />
                  
                  <CustomerForm 
                    customerName={customerName}
                    setCustomerName={setCustomerName}
                    customerPhone={customerPhone}
                    setCustomerPhone={setCustomerPhone}
                    customerAddress={customerAddress}
                    setCustomerAddress={setCustomerAddress}
                    customerProblem={customerProblem}
                    setCustomerProblem={setCustomerProblem}
                  />
                  
                  {selectedSlot && (
                    <BookingSummary 
                      serviceType={serviceType}
                      servicePrice={servicePrice}
                      taxAmount={taxAmount}
                      totalPrice={totalPrice}
                      formatCurrency={formatCurrency}
                    />
                  )}
                </div>
              
                <div className="mt-8"> 
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedSlot}
                    className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium ${
                      isSubmitting || !selectedSlot ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Booking Appointment...' : `Book Now - ${formatCurrency(totalPrice)}`}
                  </button> 
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <ServiceGuarantees />
      </div>
    </div>
  );
};

export default Appointment;