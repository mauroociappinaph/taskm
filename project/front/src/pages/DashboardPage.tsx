import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTasks } from "../hooks/useTasks";
import Header from "../components/layout/Header";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import TaskStats from "../components/tasks/TaskStats";

// Animaciones para los elementos de la página
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const DashboardPage: React.FC = () => {
  const { refreshTasks, loading } = useTasks();

  // Recargar tareas cuando se monte el componente
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Tablero</h1>
            <p className="text-gray-600 mb-6">
              Gestiona tus tareas de forma eficiente con TaskMate
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white shadow-sm rounded-lg overflow-hidden"
          >
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800">Añadir nueva tarea</h2>
            </div>
            <div className="px-6 py-4">
              <TaskForm />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white shadow-sm rounded-lg overflow-hidden"
          >
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800">Mis tareas</h2>
            </div>
            <div className="px-6 py-4">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <TaskList />
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6"
          >
            <TaskStats />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
