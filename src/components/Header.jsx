
const Header = () => {
  return (
    <div>
        <div className="bg-[url('https://res.cloudinary.com/doicvqkvb/image/upload/v1757492181/taskhive_backgrondimage_xxzoyk.png')] bg-cover bg-center h-[650px] py-16 px-4 md:px-8 text-white flex items-center">
       
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-[500px]">Book Trusted Home Service Professionals</h1>
            <p className="text-xl mb-8 opacity-90 max-w-[500px]">Experience hassle-free booking with vetted technicians for all your home service needs</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#speacialservice">
              <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
                Book a Service Now
              </button>
              </a>
         
            </div>
          </div>

        
        </div>
    </div>
  )
}

export default Header
