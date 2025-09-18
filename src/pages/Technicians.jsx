import {useParams, useNavigate} from "react-router-dom";
import  {AppContext}  from "../context/AppContext";
import {useContext,  useState, useEffect } from "react";

const Technicians = () => {
  
  const { specificprovider } = useParams();
  const { technicians } = useContext(AppContext);
  const navigate=useNavigate()
  const [activeFilter, setActiveFilter] = useState("all");
  const [filterTech, setFilterTech] = useState([]);



  const filters = [
    { id: "all", label: "All Technicians", profesion:"" },
    { id: "electrician", label: "Electricians",profesion:"Electrician" },
    { id: "plumber", label: "Plumbers", profesion:"Plumber" },
    { id: "carpenter", label: "Carpenters",profesion:"Carpenter" },
    { id: "appliance", label: "Appliance Repair",profesion:"ApplianceRepairer" },
    { id: "painter", label: "Painters",profesion:"Painter" },
    { id: "carwasher", label: "Car Washers",profesion:"Carwasher" },
  ];

  
  const applyFilter=()=>{
    if(specificprovider){
      setFilterTech(technicians.filter(tech=>tech.profession===specificprovider))
    }else{
      setFilterTech(technicians)
    }
  }


useEffect(() => {
  applyFilter();
  if (specificprovider) {
    const foundFilter = filters.find(f => f.profesion === specificprovider);
    setActiveFilter(foundFilter ? foundFilter.id : "all");
  } else {
      setActiveFilter("all");
  } 
  }, [technicians, specificprovider]);



  return (
    <div className="min-h-screen bg-gray-50">
   
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Our Skilled Technicians
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with professional, background-checked technicians ready to
              help with your home services
            </p>
          </div>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
           {filters.map((filter) => (
          <button
    key={filter.id}
    onClick={() => {
      setActiveFilter(filter.id);
      navigate(`/Technicians/${filter.profesion}`);
    }}
    className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-colors ${
      activeFilter === filter.id
        ? "bg-blue-100 text-blue-700"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {filter.label}
  </button>
           ))}

          </div>

       
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterTech.map((tech, index) => (
              <div  onClick={()=>navigate(`/appointment/${tech._id}`)}
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
      </div>
    </div>
  );
   
};

export default Technicians;
