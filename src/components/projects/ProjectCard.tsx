
import { Project, ProjectRole } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  userRole: ProjectRole;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onShare: (project: Project) => void;
  onSelect: (project: Project) => void;
}

export const ProjectCard = ({ 
  project, 
  userRole, 
  onEdit, 
  onDelete, 
  onShare,
  onSelect 
}: ProjectCardProps) => {
  const getRoleBadgeColor = (role: ProjectRole) => {
    switch (role) {
      case 'owner': return 'bg-blue-100 text-blue-700';
      case 'editor': return 'bg-green-100 text-green-700';
      case 'viewer': return 'bg-gray-100 text-gray-700';
    }
  };

  const canEdit = userRole === 'owner';
  const canShare = userRole === 'owner';

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(project)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <Badge className={cn("text-xs", getRoleBadgeColor(userRole))}>
            {userRole}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{project.description}</p>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-end space-x-2">
          {canShare && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onShare(project);
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          )}
          {canEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {canEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
