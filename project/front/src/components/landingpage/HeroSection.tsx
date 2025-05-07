import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto w-full px-4 sm:px-8 py-16 gap-10 md:gap-0">
        {/* Text */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 animate-fade-in">
            Organiza tus tareas <span className="text-primary-600 block">de manera eficiente</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg animate-fade-in delay-100">
            TaskMate te ayuda a gestionar tus tareas diarias con una interfaz intuitiva, arrastrar y soltar, y seguimiento de progreso en tiempo real.
          </p>
          <div className="flex gap-4 animate-fade-in delay-200">
            <Link to="/register" className="px-8 py-3 rounded-full text-lg font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400">
              Comenzar ahora
            </Link>
            <Link to="/login" className="px-8 py-3 rounded-full text-lg font-bold text-primary-600 bg-primary-100 hover:bg-primary-200 border border-primary-200 transition-all duration-200">
              Iniciar sesión
            </Link>
          </div>
        </div>
        {/* Illustration */}
        <div className="flex-1 flex flex-col items-center justify-center animate-fade-in-up">
          <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-0">
            <rect x="10" y="20" width="200" height="100" rx="20" fill="#F97316" fillOpacity="0.10" />
            <rect x="40" y="45" width="120" height="14" rx="4" fill="#F97316" fillOpacity="0.25" />
            <rect x="40" y="70" width="80" height="14" rx="4" fill="#F97316" fillOpacity="0.25" />
            <rect x="40" y="95" width="100" height="14" rx="4" fill="#F97316" fillOpacity="0.25" />
            <circle cx="170" cy="52" r="7" fill="#10B981" />
            <circle cx="130" cy="77" r="7" fill="#10B981" />
            <circle cx="155" cy="102" r="7" fill="#10B981" />
          </svg>
        </div>
      </section>
)

}

export default HeroSection;
