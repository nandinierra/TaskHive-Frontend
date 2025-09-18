

const About = () => {
  return (
    <div className="max-w-6xl mt-[60px] mx-auto px-6 py-12">
     
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
        About Us
      </h1>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
        We connect you with trusted technicians and service providers in your area. 
        Whether it’s plumbing, electrical work, appliance repair, or general maintenance – 
        we make booking appointments simple, reliable, and stress-free.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="bg-blue-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to simplify the process of finding skilled technicians and 
            make quality service accessible to everyone. We ensure transparency, 
            reliability, and customer satisfaction with every booking.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-600 mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to build a world where finding help is just one click away. 
            Our vision is to create a community-driven platform that supports both 
            customers and service providers with trust and efficiency.
          </p>
        </div>
      </div>

    
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">Trusted Technicians</h3>
            <p className="text-gray-600">Verified experts with proven skills and experience.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">Easy Booking</h3>
            <p className="text-gray-600">Book an appointment in just a few clicks.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">Customer Support</h3>
            <p className="text-gray-600">We’re here to help you 24/7 with any queries.</p>
          </div>
        </div>
      </div>

    
      <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Book Your Technician?</h2>
        <p className="mb-6">Browse our technicians and schedule your appointment hassle-free today!</p>
        <a
          href="/technicians"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Find a Technician
        </a>
      </div>
    </div>
  );
};

export default About;
