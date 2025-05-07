import React from 'react';

const Footer: React.FC = () => {
  return (
      <footer className="mt-auto bg-gradient-to-r from-primary-600 to-primary-500 text-white py-8 animate-fade-in-up delay-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold">TaskMate</h2>

          </div>

          <p className="text-xs text-primary-100 mt-4 md:mt-0">&copy; {new Date().getFullYear()} TaskMate. Todos los derechos reservados.</p>
        </div>
      </footer>
  )
}

export default Footer;

