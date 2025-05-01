import React, { useState } from "react";
import { useAuth } from "../../hooks";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LoginFormProps } from "../../types";
import { loginSchema, validateField } from "../../validations/schemas";
import { ValidationError } from "yup";

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = async () => {
    try {
      // Validar todo el formulario
      await loginSchema.validate({ email, password }, { abortEarly: false });
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

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const fieldError = await validateField(loginSchema, 'email', value);
    setErrors(prev => ({ ...prev, email: fieldError || undefined }));
  };

  const handlePasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const fieldError = await validateField(loginSchema, 'password', value);
    setErrors(prev => ({ ...prev, password: fieldError || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido de nuevo</h1>
        <p className="text-gray-600">Inicia sesión para acceder a tus tareas</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <Input
          label="Correo electrónico"
          type="email"
          id="email"
          placeholder="your@email.com"
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
          autoComplete="current-password"
          required
          error={errors.password}
        />

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="mt-2"
        >
          Iniciar sesión
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Crear cuenta
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
