import React, { useState } from "react";

const Myprofile = () => {
  // Initial user data (can later come from DB/API)
  const [user, setUser] = useState({
    name: "Nandy",
    email: "nandy@example.com",
    phone: "+91 98765 43210",
    address: "Hyderabad, Telangana, India",
    gender: "Female",
    birthday: "2004-09-06",
    joined: "March 2025",
  });

  // States for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated details
  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    // Later: send to backend API
    console.log("Updated User:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[480px]">
        <div className="flex flex-col items-center">
      
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
            {user.name.charAt(0)}
          </div>

          {!isEditing ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                {user.name}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">{user.phone}</p>

              <div className="w-full h-px bg-gray-200 my-6"></div>

              <div className="text-left w-full space-y-3">
                <div className="flex w-full justify-center items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Address</h3>
                  <p className="text-gray-800">{user.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Gender</h3>
                  <p className="text-gray-800">{user.gender}</p>
                </div>
                  </div>
                <div className="flex w-full justify-center items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Birthday
                  </h3>
                  <p className="text-gray-800">
                    {new Date(user.birthday).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Member Since
                  </h3>
                  <p className="text-gray-800">{user.joined}</p>
                </div>
                </div>

              </div>

              <div className="mt-6 flex gap-4 w-full">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                Edit Profile
              </h2>

              <div className="w-full mt-4 space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border rounded-md px-3 py-2"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full border rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full border rounded-md px-3 py-2"
                />

              
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

            
              <div className="mt-6 flex gap-4 w-full">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setFormData(user); 
                    setIsEditing(false);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
