
const Footer = () => {
  return (
   
      <footer className="bg-gray-800 text-white py-12 px-4 md:px-8">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TaskHive</h3>
            <p className="text-gray-400">Connecting you with trusted home service professionals since 2023.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">Electrical</li>
              <li className="hover:text-white cursor-pointer">Plumbing</li>
              <li className="hover:text-white cursor-pointer">Carpentry</li>
              <li className="hover:text-white cursor-pointer">Car Wash</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Press</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">Support</li>
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Partners</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2023 TaskHive. All rights reserved.</p>
        </div>

      </footer>
    
  )
}

export default Footer
