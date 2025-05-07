
import React from 'react';
const features = [
  {
    title: 'Interfaz intuitiva',
    description: 'Diseño limpio y fácil de usar para gestionar tus tareas sin complicaciones.',
    icon: (
      <svg className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: 'Arrastrar y soltar',
    description: 'Reorganiza tus tareas fácilmente con drag & drop.',
    icon: (
      <svg className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="9" cy="12" r="1.5" />
        <circle cx="15" cy="12" r="1.5" />
        <circle cx="12" cy="7.5" r="1.5" />
        <circle cx="12" cy="16.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Seguimiento en tiempo real',
    description: 'Actualizaciones instantáneas para mantenerte al día.',
    icon: (
      <svg className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Seguridad avanzada',
    description: 'Tus datos están protegidos con tecnología de punta.',
    icon: (
      <svg className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];


const Features: React.FC = () => {
  return (
      <section className="w-full bg-white py-16 animate-fade-in-up delay-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h3 className="text-center text-2xl font-extrabold text-primary-600 mb-8 tracking-wide uppercase">Características</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-primary-50 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all duration-200">
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Features;
