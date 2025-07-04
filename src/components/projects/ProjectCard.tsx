
import { Project, ProjectRole } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Share2, Users, Calendar, MoreVertical, Star } from 'lucide-react';
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
      case 'owner': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'editor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'viewer': return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const canEdit = userRole === 'owner';
  const canShare = userRole === 'owner';

  return (
    <Card className="beautiful-card hover-lift group cursor-pointer overflow-hidden animate-scale-in" onClick={() => onSelect(project)}>
      <div className="h-2 bg-gradient-to-r from-primary via-blue-600 to-indigo-600"></div>
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                {project.name}
              </CardTitle>
              {userRole === 'owner' && (
                <Star className="h-5 w-5 text-amber-400 fill-current" />
              )}
            </div>
            <p className="text-slate-600 line-clamp-2 mb-4 leading-relaxed">{project.description}</p>
            
            <div className="flex items-center justify-between">
              <Badge className={cn("font-semibold capitalize px-3 py-1 rounded-full", getRoleBadgeColor(userRole))}>
                {userRole}
              </Badge>
              
              <div className="flex items-center text-sm text-slate-400">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(project.updatedAt), 'MMM dd')}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-100 rounded-xl"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl border-slate-200">
              {canShare && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onShare(project); }} className="rounded-lg">
                  <Share2 className="h-4 w-4 mr-3" />
                  Share Project
                </DropdownMenuItem>
              )}
              {canEdit && (
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(project); }} className="rounded-lg">
                  <Edit className="h-4 w-4 mr-3" />
                  Edit Project
                </DropdownMenuItem>
              )}
              {canEdit && (
                <DropdownMenuItem 
                  onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                  className="text-red-600 rounded-lg"
                >
                  <Trash2 className="h-4 w-4 mr-3" />
                  Delete Project
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-6">
        <div className="flex items-center justify-between text-slate-500 bg-slate-50 rounded-xl px-4 py-3">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            <span className="font-medium">3 team members</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">12 tasks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
