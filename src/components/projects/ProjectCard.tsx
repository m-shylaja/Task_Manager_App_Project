
import { Project, ProjectRole } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Share2, Users, Calendar, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

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
      case 'owner': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'editor': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'viewer': return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const canEdit = userRole === 'owner';
  const canShare = userRole === 'owner';

  return (
    <Card className="hover-lift group cursor-pointer border-0 shadow-sm hover:shadow-lg bg-white overflow-hidden" onClick={() => onSelect(project)}>
      <div className="h-2 bg-gradient-to-r from-primary to-blue-600"></div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.name}
            </CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
            
            <div className="flex items-center justify-between">
              <Badge className={cn("text-xs font-medium capitalize", getRoleBadgeColor(userRole))}>
                {userRole}
              </Badge>
              
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(project.updatedAt), 'MMM dd')}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {canShare && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onShare(project); }}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Project
                </DropdownMenuItem>
              )}
              {canEdit && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(project); }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Project
                </DropdownMenuItem>
              )}
              {canEdit && (
                <DropdownMenuItem 
                  onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Project
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>3 team members</span>
          <span className="mx-2">•</span>
          <span>12 tasks</span>
        </div>
      </CardContent>
    </Card>
  );
};
