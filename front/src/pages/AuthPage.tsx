import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { CheckSquare } from "lucide-react";

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const switchToLogin = () => setIsLoginView(true);
  const switchToRegister = () => setIsLoginView(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <CheckSquare className="h-12 w-12 text-blue-500" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          TaskMate
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tu asistente de gestión de tareas personales
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLoginView ? (
            <LoginForm onSwitchToRegister={switchToRegister} />
          ) : (
            <RegisterForm onSwitchToLogin={switchToLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
