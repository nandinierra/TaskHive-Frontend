import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Myappointment = () => {
  const { technicians } = useContext(AppContext);

  const myAppointments = technicians.slice(0, 3);

  return (
    <div className="min-h-screen mt-[60px] bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My Appointments
        </h1>

        {myAppointments.length === 0 ? (
          <p className="text-gray-600">You have no appointments yet.</p>
        ) : (
          <div className="space-y-6">
            {myAppointments.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center justify-between bg-gray-50 border rounded-lg p-4 shadow-sm"
              >
              
                <div className="flex items-center gap-4">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {tech.name}
                    </h2>
                    <p className="text-sm text-gray-600">{tech.profession}</p>
                    <p className="text-sm text-gray-500">
                      Experience: {tech.experience}
                    </p>
                  </div>
                </div>

              
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Pay Online
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
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
