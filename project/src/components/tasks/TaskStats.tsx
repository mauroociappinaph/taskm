import React from 'react';
import { CheckCircle, Circle, ListTodo, PieChart } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${color} hover:shadow-md transition-shadow`}
  >
    <div className="flex items-center justify-between h-[85px]">
      <div className="flex flex-col justify-between h-full">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <motion.p
          className="text-3xl font-semibold text-gray-900"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {value}
        </motion.p>
      </div>
      <motion.div
        className={`p-3 rounded-full ${color.replace('border-l-4', 'bg-opacity-20')} ${color.replace('border', 'bg')}`}
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
    </div>
  </motion.div>
);

const TaskStats: React.FC = () => {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Tareas totales"
        value={totalTasks}
        icon={<ListTodo className="h-6 w-6 text-white" />}
        color="border-blue-500"
        delay={0}
      />
      <StatCard
        title="Tareas completadas"
        value={completedTasks}
        icon={<CheckCircle className="h-6 w-6 text-white" />}
        color="border-green-500"
        delay={0.1}
      />
      <StatCard
        title="Tareas pendientes"
        value={pendingTasks}
        icon={<Circle className="h-6 w-6 text-white" />}
        color="border-yellow-500"
        delay={0.2}
      />
      <StatCard
        title="Porcentaje completado"
        value={`${completionPercentage}%`}
        icon={<PieChart className="h-6 w-6 text-white" />}
        color="border-purple-500"
        delay={0.3}
      />
    </div>
  );
};

export default TaskStats;
