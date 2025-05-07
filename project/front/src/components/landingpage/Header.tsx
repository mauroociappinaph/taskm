import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../../logo/image.png';


const Header: React.FC = () => {
    return (
        <header className="w-full bg-white/80 backdrop-blur shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
          <img src={logo} alt="TaskMate Logo" className="h-24 w-auto mr-3" />
          <div className="flex gap-2">
            <Link to="/login" className="px-5 py-2 rounded-full font-semibold text-primary-600 border border-primary-600 bg-white hover:bg-primary-50 transition-all duration-200 shadow-sm">Iniciar Sesión</Link>
            <Link to="/register" className="px-5 py-2 rounded-full font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 shadow-lg">Registrarse</Link>
          </div>
        </div>
      </header>
    )
 }

 export default Header;
