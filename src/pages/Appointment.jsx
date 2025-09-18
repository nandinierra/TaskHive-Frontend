
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Appointment = () => {
  const { technicianId } = useParams();
  const { technicians, user } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(technicians)
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
    "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

 
  const getDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      // Format date as YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0];
      
      // Format display date
      const displayDate = date.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      
      options.push({
        value: formattedDate,
        label: i === 0 ? `Today, ${displayDate}` : 
               i === 1 ? `Tomorrow, ${displayDate}` : displayDate
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

  
  const isSlotAvailable = (date, slotTime) => {
    
    const isBooked = bookedSlots.some(booking => 
      booking.date === date && booking.time === slotTime
    );
    
    if (isBooked) return false;
    
 
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${convertTo24Hour(slotTime)}:00`);
    
    return selectedDateTime > now;
  };

  
  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours}:${minutes}`;
  };

 
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

 
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
 console.log(techInfo)
 
  const getTechnicianDescription = (technician) => {
    const descriptions = {
      Electrician: `${technician.name} is a certified electrician with ${technician.experience} of experience in residential and commercial electrical work. Specializing in wiring, lighting solutions, and electrical system upgrades, they ensure all work meets safety standards and regulations.`,
      Plumber: `${technician.name} is a skilled plumber with ${technician.experience} of expertise in fixing leaks, pipe installations, and drainage systems. They provide efficient and lasting solutions for all plumbing issues with attention to detail.`,
      Carpenter: `With ${technician.experience} of woodworking experience, ${technician.name} specializes in furniture repair, custom cabinetry, and installation services. Their craftsmanship and attention to detail ensure high-quality results for all projects.`,
      "Appliance Repair": `${technician.name} has ${technician.experience} of experience repairing household appliances including refrigerators, washing machines, and ovens. They provide reliable service with genuine parts and thorough diagnostics.`,
      Painter: `${technician.name} is a professional painter with ${technician.experience} of experience in interior and exterior painting projects. They provide color consultation and use high-quality materials for a flawless finish.`,
      "Car Washer": `${technician.name} offers professional car cleaning services with ${technician.experience} of experience. From basic washes to premium detailing, they use eco-friendly products to make your vehicle look its best.`
    };
    
    return descriptions[technician.profession] || `${technician.name} is a skilled ${technician.profession.toLowerCase()} with ${technician.experience} of experience providing quality service to customers.`;
  };

 
  const fetchTechInfo = async () => {
    const techInfor = technicians.find(tech => tech._id === (technicianId));
    setTechInfo(techInfor);
    

    if (techInfor) {
      const services = getServiceTypes(techInfor.profession);
      if (services.length > 0) {
        setServiceType(services[0]);
      }
    }
  };

 
  const fetchBookedSlots = async () => {
    setLoadingSlots(true);
    try {
      // In a real app, this would be an API call to get booked slots
      // For demo purposes, we'll simulate some booked slots
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


const userData = () => {
  if (!techInfo) return; 

  const details = {
    name: techInfo.name,
    profession: techInfo.profession,
    experience: techInfo.experience
  };

  console.log(details);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    setIsSubmitting(true);
    try {
      const servicePrice = calculateServicePrice();
      // In a real app, this would be an API call to book the slot
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
      // Add to booked slots
      setBookedSlots([...bookedSlots, { date: selectedDate, time: selectedSlot }]);
     
      // Redirect to confirmation page
      userData()
      navigate("/myappointment", { state: { booking: bookingData } }); 
      
    }

     catch (error){
      console.error("Booking error:", error);
      alert("Failed to book appointment. Please try again.");
    }
    
    
    finally {
      setIsSubmitting(false);
    }
  };



console.log(techInfo)
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
    <div className="min-h-screen bg-gray-50 py-8">
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

            <div className="md:w-2/5 bg-blue-50 p-6">
              <div className="text-center">
                <img
                  src={techInfo.image}
                  alt={techInfo.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-md"
                />
                <h1 className="text-2xl font-bold text-gray-900 mt-4">{techInfo.name}</h1>
                <p className="text-blue-600 font-medium">{techInfo.profession}</p>
                
                <div className="flex items-center justify-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 fill-current ${i < Math.floor(techInfo.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {techInfo.rating} ({techInfo.reviews} reviews)
                  </span>
                </div>
                
                <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{techInfo.experience}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Starting at:</span>
                    <span className="font-medium text-blue-600">{formatCurrency(techInfo.hourlyRate || 500)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About {techInfo.name.split(' ')[0]}</h3>
                  <p className="text-gray-600 text-sm">
                    {getTechnicianDescription(techInfo)}
                  </p>
                </div>
              </div>
            </div>
            
          
            <div className="md:w-3/5 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <select
                      required
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {getServiceTypes(techInfo.profession).map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
             
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {dateOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedDate(option.value)}
                          className={`py-2 px-3 text-sm rounded-md border transition-colors ${
                            selectedDate === option.value
                              ? 'bg-blue-100 text-blue-700 border-blue-300'
                              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                 
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Time Slots {selectedDate && `for ${new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}`}
                    </label>
                    
                    {loadingSlots ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {allTimeSlots.map((slot) => {
                          const isAvailable = isSlotAvailable(selectedDate, slot);
                          const isSelected = selectedSlot === slot;
                          
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={!isAvailable}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 px-3 text-sm rounded-md border transition-colors ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : isAvailable
                                  ? 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
                                  : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="98XXXXXX90"
                    />
                  </div>
                 
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your complete address"
                    />
                  </div>
                  
              
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Describe the Problem</label>
                    <textarea
                      required
                      value={customerProblem}
                      onChange={(e) => setCustomerProblem(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Please describe the issue you're experiencing..."
                    />
                  </div>
                  
                  {selectedSlot && (
                    <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
                      <div className="flex justify-between">
                        <span>Service Fee ({serviceType})</span>
                        <span className="font-medium">{formatCurrency(servicePrice)}</span>
                      </div>
                      <div className="flex justify-between mt-1 text-sm">
                        <span>GST (18%)</span>
                        <span className="font-medium">{formatCurrency(taxAmount)}</span>
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span className="text-blue-600">{formatCurrency(totalPrice)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">* Final amount may vary based on actual service time</p>
                    </div>
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
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900">On-Time Service</h4>
              <p className="text-sm text-gray-600 mt-1">Our technicians value your time and arrive as scheduled</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900">Quality Guarantee</h4>
              <p className="text-sm text-gray-600 mt-1">We stand behind our work with a satisfaction guarantee</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900">Transparent Pricing</h4>
              <p className="text-sm text-gray-600 mt-1">No hidden fees. You'll know the cost before work begins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;