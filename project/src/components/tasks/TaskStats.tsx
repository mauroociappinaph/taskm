import React from 'react';
import { CheckCircle, Circle, ListTodo, PieChart } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color.replace('border-l-4', 'bg-opacity-10 text-opacity-100')}`}>
        {icon}
      </div>
    </div>
  </div>
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
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Tareas totales"
        value={totalTasks}
        icon={<ListTodo className="h-6 w-6 text-blue-600" />}
        color="border-blue-500"
      />
      <StatCard
        title="Tareas completadas"
        value={completedTasks}
        icon={<CheckCircle className="h-6 w-6 text-green-600" />}
        color="border-green-500"
      />
      <StatCard
        title="Tareas pendientes"
        value={pendingTasks}
        icon={<Circle className="h-6 w-6 text-yellow-600" />}
        color="border-yellow-500"
      />
      <StatCard
        title="Porcentaje completado"
        value={`${completionPercentage}%`}
        icon={<PieChart className="h-6 w-6 text-purple-600" />}
        color="border-purple-500"
      />
    </div>
  );
};

export default TaskStats;
