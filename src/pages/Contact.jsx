
const Contact = () => {
  return (
    <div className="max-w-6xl mt-[60px] mx-auto px-6 py-12">
     
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
        Contact Us
      </h1>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
        Have questions, feedback, or need support? We’d love to hear from you.  
        Our team is here to help you with bookings, services, and general queries.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
     
        <div className="bg-white p-8 shadow-lg rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Send us a Message
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

   
        <div className="bg-blue-50 p-8 shadow-md rounded-2xl flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-4">
            You can also reach us directly using the details below.
          </p>
          <ul className="space-y-4">
            <li>
              <span className="font-semibold text-gray-800">📍 Address:</span>{" "}
              123 Service Street, Hyderabad, India
            </li>
            <li>
              <span className="font-semibold text-gray-800">📞 Phone:</span>{" "}
              +91 98765 43210
            </li>
            <li>
              <span className="font-semibold text-gray-800">✉️ Email:</span>{" "}
              support@taskhive.com
            </li>
          </ul>

     
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Support Hours
            </h3>
            <p className="text-gray-700">Mon - Sat: 9:00 AM - 7:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
