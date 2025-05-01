import React, { useState } from "react";
import { useAuth } from "../../hooks";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { RegisterFormProps } from "../../types";
import { registerSchema, validateField } from "../../validations/schemas";
import { ValidationError } from "yup";

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validateForm = async () => {
    try {
      // Validar todo el formulario
      await registerSchema.validate({ name, email, password }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      // Capturar errores de validación
      const validationErrors: { [key: string]: string } = {};
      if (err instanceof ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
      }
      setErrors(validationErrors);
      return false;
    }
  };

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    const fieldError = await validateField(registerSchema, 'name', value);
    setErrors(prev => ({ ...prev, name: fieldError || undefined }));
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const fieldError = await validateField(registerSchema, 'email', value);
    setErrors(prev => ({ ...prev, email: fieldError || undefined }));
  };

  const handlePasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const fieldError = await validateField(registerSchema, 'password', value);
    setErrors(prev => ({ ...prev, password: fieldError || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

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
        {error && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <Input
          label="Nombre"
          type="text"
          id="name"
          placeholder="Tu nombre"
          value={name}
          onChange={handleNameChange}
          autoComplete="name"
          required
          error={errors.name}
        />

        <Input
          label="Correo electrónico"
          type="email"
          id="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={handleEmailChange}
          autoComplete="email"
          required
          error={errors.email}
        />

        <Input
          label="Contraseña"
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="new-password"
          required
          error={errors.password}
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
