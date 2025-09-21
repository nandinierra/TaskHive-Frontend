
const TechnicianProfile = (props) => {
  const {techInfo, formatCurrency}=props
  
  return (
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
                className={`h-5 w-5 fill-current ${i < Math.floor(techInfo.rating) ? 'text-gray-300' : 'text-yellow-400'}`}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">About {techInfo.name} </h3>
          <p className="text-gray-600 text-sm">
            {techInfo.about}
          </p>
        </div>
      </div>
    </div>
  );
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
export default TechnicianProfile;