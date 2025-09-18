import {Link} from "react-router-dom";

const serviceProviders = [
    {
      id: 1,
      name: 'Electrical Services',
      profession: 'Electrician',
      description: 'Expert electricians for all your wiring, installation and repair needs'
    },
    {
      id: 2,
      name: 'Plumbing',
       profession: 'Plumber',
      description: 'Fix leaks, install fixtures, and solve all plumbing issues'
    },
    {
      id: 3,
      name: 'Carpentry',
       profession: 'Carpenter',
      description: 'Custom furniture, repairs, and woodworking solutions'
    },
    {
      id: 4,
      name: 'Car Wash',
       profession: 'Carwasher',
      description: 'Professional interior and exterior cleaning at your doorstep'
    },
    {
      id: 5,
      name: 'Appliance Repair',
       profession: 'ApplianceRepairer',
      description: 'Expert technicians to repair your home appliances'
    },
    {
      id: 6,
      name: 'Painting',
       profession: 'Painter', 
      description: 'Interior and exterior painting services for your home'
    }
];


const Serviceproviders = () => {

  return (
       <div id="speacialservice"
       className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Service Providers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TaskHive connects you with skilled professionals across various home service categories. 
              Each service provider is vetted, experienced, and ready to deliver quality workmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceProviders.map((service, index) => (
              <Link key={index} to={`/Technicians/${service.profession}`}>
              <div  className="service-card bg-gray-50 p-6 rounded-xl border border-gray-100 transition-all duration-300 cursor-pointer">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors">
                  Explore Services
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Serviceproviders

