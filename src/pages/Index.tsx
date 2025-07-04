
import { useState } from 'react';
import { Project } from '@/types';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { UsersList } from '@/components/users/UsersList';
import { ProjectsList } from '@/components/projects/ProjectsList';
import { TasksList } from '@/components/tasks/TasksList';

const Index = () => {
  const [activeSection, setActiveSection] = useState('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setActiveSection('tasks');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return (
          <div className="animate-slide-up">
            <UsersList />
          </div>
        );
      case 'projects':
        return (
          <div className="animate-slide-up">
            <ProjectsList onProjectSelect={handleProjectSelect} />
          </div>
        );
      case 'tasks':
        return (
          <div className="animate-slide-up">
            <TasksList selectedProject={selectedProject} />
          </div>
        );
      default:
        return (
          <div className="animate-slide-up">
            <ProjectsList onProjectSelect={handleProjectSelect} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Header />
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
