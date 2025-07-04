
import { useState } from 'react';
import { Project, ProjectRole } from '@/types';
import { mockProjects, mockProjectShares, currentUser } from '@/lib/mockData';
import { ProjectCard } from './ProjectCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProjectsListProps {
  onProjectSelect: (project: Project) => void;
}

export const ProjectsList = ({ onProjectSelect }: ProjectsListProps) => {
  const [projects] = useState<Project[]>(mockProjects);

  const getUserRole = (projectId: string): ProjectRole => {
    const share = mockProjectShares.find(
      share => share.projectId === projectId && share.userId === currentUser.id
    );
    return share?.role || 'viewer';
  };

  const handleEditProject = (project: Project) => {
    console.log('Edit project:', project);
    // TODO: Implement edit functionality
  };

  const handleDeleteProject = (projectId: string) => {
    console.log('Delete project:', projectId);
    // TODO: Implement delete functionality
  };

  const handleShareProject = (project: Project) => {
    console.log('Share project:', project);
    // TODO: Implement share functionality
  };

  const handleAddProject = () => {
    console.log('Add new project');
    // TODO: Implement add functionality
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <Button onClick={handleAddProject}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            userRole={getUserRole(project.id)}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onShare={handleShareProject}
            onSelect={onProjectSelect}
          />
        ))}
      </div>
    </div>
  );
};
