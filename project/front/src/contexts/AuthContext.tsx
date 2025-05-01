import React, { createContext, useState, useContext, useEffect } from "react";
import { User, AuthContextType } from "../types";
import { toast } from "react-hot-toast";
import { login as loginApi, register as registerApi, isAuthenticated, logout as logoutApi } from "../api/auth";
import { getAuthToken } from "../api/config";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la aplicación
    const checkAuth = async () => {
      try {
        const isLoggedIn = isAuthenticated();
        if (isLoggedIn) {
          setUser({
            id: "authenticated",
            email: "user@example.com",
            name: "Usuario Autenticado",
            createdAt: new Date()
          });
        }
      } catch (err) {
        console.error("Error al verificar autenticación:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Intentando iniciar sesión con:", { email, password });
      await loginApi({ email, password, onSwitchToRegister: () => {} });

      // Si llegamos aquí, el inicio de sesión fue exitoso y el token está almacenado
      // En una implementación completa, deberíamos obtener los datos del usuario

      const token = getAuthToken();
      console.log("Token obtenido:", token ? "Presente" : "Ausente");

      if (token) {
        // Crear un usuario básico basado en el correo electrónico
        // Esto debería reemplazarse con datos reales del usuario
        const baseUser: User = {
          id: "authenticated",
          email,
          name: email.split('@')[0],
          createdAt: new Date()
        };

        setUser(baseUser);
        toast.success('Inicio de sesión exitoso');
      } else {
        throw new Error("No se recibió token de autenticación");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError("Falló el inicio de sesión. Verifica tus credenciales.");
      toast.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Intentando registrar usuario:", { email, name });
      await registerApi({ email, password, name });

      // Si llegamos aquí, el registro fue exitoso y el token está almacenado
      const token = getAuthToken();
      console.log("Token obtenido después del registro:", token ? "Presente" : "Ausente");

      if (token) {
        // Crear un usuario básico con los datos proporcionados
        const newUser: User = {
          id: "new-user",
          email,
          name,
          createdAt: new Date()
        };

        setUser(newUser);
        toast.success('Registro exitoso');
      } else {
        throw new Error("No se recibió token de autenticación después del registro");
      }
    } catch (err) {
      console.error("Error en registro:", err);
      setError("Error en el registro. El usuario podría ya existir.");
      toast.error('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setUser(null);
    toast.success('Sesión cerrada');
  };

  const updateProfile = async (name: string, email: string) => {
    setLoading(true);
    setError(null);

    try {
      // Aquí iría una llamada a la API para actualizar el perfil
      // Por ahora solo actualizamos el estado local
      if (!user) throw new Error("No hay usuario conectado");

      const updatedUser = {
        ...user,
        name,
        email
      };

      setUser(updatedUser);
      toast.success('Perfil actualizado correctamente');
    } catch (err) {
      setError("Error al actualizar el perfil");
      console.error(err);
      toast.error('Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile,
      loading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
