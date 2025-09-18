

import Header from "../components/Header.jsx"
import Serviceproviders from "../components/Serviceproviders.jsx"; 
import ExperiencedTechnicians from "../components/ExperiencedTechnicians";


const Home = () => {

  return (
    <div className="min-h-screen mt-[73px] bg-gray-50">
  
       <Header/>

     <Serviceproviders />

      <ExperiencedTechnicians />
    
    </div>
  );
};

export default Home;
