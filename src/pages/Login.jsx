import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {toast} from "react-toastify"
import axios from "axios"
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  
  const {backendUrl, token, setToken} = useContext(AppContext)
  
  const navigate=useNavigate()
   
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    try{
 
      
       const {data} =await axios.post(backendUrl + '/api/user/login',formData );
        if(data.success){
          localStorage.setItem('token', data.token)
          console.log(data.token)
          setToken(data.token)
          toast.success("successfully LogedIn")
          navigate('/', {replace:true})
        }else{
          toast.error(data.message)
        }
      }
    catch(error){
           toast.error(error.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Login</h2>
        <p className="text-gray-500 mb-6">
          Please log in to book appointment
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Create a new account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
