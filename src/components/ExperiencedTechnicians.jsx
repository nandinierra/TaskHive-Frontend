
import {useNavigate} from "react-router-dom"
import {AppContext} from "../context/AppContext"
import {useContext} from "react"
    
//  const technicians = [
//     {
//       id: 1,
//       name: 'Michael Rodriguez',
//       profession: 'Electrician',
//       rating: 4.9,
//       reviews: 142,
//       experience: '8 years',
//       image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
//     },
//     {
//       id: 2,
//       name: 'Sarah Johnson',
//       profession: 'Plumber',
//       rating: 4.8,
//       reviews: 118,
//       experience: '6 years',
//       image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
//     },
//     {
//       id: 3,
//       name: 'James Wilson',
//       profession: 'Carpenter',
//       rating: 4.7,
//       reviews: 96,
//       experience: '10 years',
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
//     },
//     {
//       id: 4,
//       name: 'Emma Thompson',
//       profession: 'Appliance Repair',
//       rating: 4.9,
//       reviews: 127,
//       experience: '7 years',
//       image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
//     },
//      {
//       id: 5,
//       name: 'James Wilson',
//       profession: 'Carpenter',
//       rating: 4.7,
//       reviews: 96,
//       experience: '10 years',
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
//     },
//     {
//       id: 6,
//       name: 'Emma Thompson',
//       profession: 'Appliance Repair',
//       rating: 4.9,
//       reviews: 127,
//       experience: '7 years',
//       image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
//     },
//      {
//       id: 7,
//       name: 'James Wilson',
//       profession: 'Carpenter',
//       rating: 4.7,
//       reviews: 96,
//       experience: '10 years',
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
//     },
//     {
//       id: 8,
//       name: 'Emma Thompson',
//       profession: 'Appliance Repair',
//       rating: 4.9,
//       reviews: 127,
//       experience: '7 years',
//       image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
//     }
//   ];
 

const ExperiencedTechnicians = () => {

  const navigate=useNavigate();
  const context=useContext(AppContext)
  if(!context){
      throw new Error("TechniciansList must be used within AppContextProvider")
  }
  const {technicians} = context


  return (
    <div className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Experienced Technicians</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our technicians are carefully selected professionals with proven track records. 
              Each one brings expertise, reliability, and commitment to quality service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicians.map((tech, index) => (

              <div onClick={()=>navigate(`/appointment/${tech._id}`)}
              key={index} className="technician-card bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img src={tech.image} alt={tech.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">{tech.name}</h3>
                  <p className="text-gray-600 mb-2">{tech.profession}</p>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{tech.rating} ({tech.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-600">Experience: {tech.experience}</p>
                  <button className="mt-4 w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          


          
          <div className="text-center mt-12">
            <button onClick={()=>{navigate("/Technicians")}} className="bg-white cursor-pointer text-blue-600 font-semibold py-3 px-8 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
              View All Technicians
            </button>
          </div>
        </div>
    </div>

  )
}

export default ExperiencedTechnicians
