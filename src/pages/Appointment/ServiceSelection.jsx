const ServiceSelection = ({ techInfo, serviceType, setServiceType, getServiceTypes }) => {
  return (
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
  );
};

export default ServiceSelection;