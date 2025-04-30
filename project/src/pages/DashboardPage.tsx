import React from "react";
import Header from "../components/layout/Header";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h2>
          <TaskForm />
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;