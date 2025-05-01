import React, { useState } from "react";
import { useAuth } from "../../hooks";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { RegisterFormProps } from "../../types";

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Name is required");
      return;
    }

    if (!email.trim()) {
      setFormError("Email is required");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    try {
      await register(email, password, name);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Crear cuenta</h1>
        <p className="text-gray-600">Únete a TaskMate para organizar tus tareas</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {(error || formError) && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {formError || error}
          </div>
        )}

        <Input
          label="Nombre"
          type="text"
          id="name"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />

        <Input
          label="Correo electrónico"
          type="email"
          id="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <Input
          label="Contraseña"
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="mt-2"
        >
          Crear cuenta
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Iniciar sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
