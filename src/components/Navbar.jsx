import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import { AppContext } from "../context/AppContext";


const Navbar = () => {
    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const logout = () => {
        setToken(''); 
        localStorage.removeItem('token');
        navigate('/', { replace: true });
    };

    const [activeTab, setActiveTab] = useState("home");

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveTab("home");
        } else if (location.pathname.startsWith("/Technicians")) {
            setActiveTab("allTechnicians");
        } else if (location.pathname.startsWith("/about")) {
            setActiveTab("about");
        } else if (location.pathname.startsWith("/contact")) {
            setActiveTab("contact");
        } else {
            setActiveTab("");
        }
    }, [location.pathname]);

    return (
        <nav className="fixed w-full top-0 z-25 bg-white shadow-md py-4 px-6 flex items-center justify-between">
            <div
                onClick={() => navigate("/")}
                className="text-2xl font-bold text-blue-600 cursor-pointer"
            >
                TaskHive
            </div>
            <div className="hidden md:flex space-x-8">
                {[
                    { id: "home", label: "Home", path: "/" },
                    { id: "allTechnicians", label: "All Technicians", path: "/Technicians" },
                    { id: "about", label: "About", path: "/about" },
                    { id: "contact", label: "Contact", path: "/contact" },
                ].map((item) => (
                    <NavLink key={item.id} to={item.path}>
                        <button
                            className={`py-2 cursor-pointer px-3 rounded-md transition-all duration-200 ${
                                activeTab === item.id
                                    ? "bg-blue-100 text-blue-600 font-medium"
                                    : "text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                            }`}
                        >
                            {item.label}
                        </button>
                    </NavLink>
                ))}
            </div>
            <div>
                {token ? (
                    <div className="flex items-center gap-2 cursor-pointer group relative">
                        <img
                            className="w-8 rounded-full"
                            src="https://res.cloudinary.com/doicvqkvb/image/upload/v1757579385/oyblk49lovvrknllxxpj.png"
                        />
                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                            <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                <p onClick={() => navigate("/myprofile")} className="hover:text-black cursor-pointer">
                                    My Profile
                                </p>
                                <p onClick={() => navigate("/myappointment")} className="hover:text-black cursor-pointer">
                                    My Appointment
                                </p>
                                <p onClick={logout} className="hover:text-black cursor-pointer">
                                    Logout
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className={`bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200`}
                    >
                        Create Account
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;