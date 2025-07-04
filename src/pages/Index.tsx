
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
        return <UsersList />;
      case 'projects':
        return <ProjectsList onProjectSelect={handleProjectSelect} />;
      case 'tasks':
        return <TasksList selectedProject={selectedProject} />;
      default:
        return <ProjectsList onProjectSelect={handleProjectSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
