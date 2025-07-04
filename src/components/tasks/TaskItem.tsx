
import { useState } from 'react';
import { Task, TaskStatus } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  level: number;
  canEdit: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onAddSubtask: (parentTask: Task) => void;
}

export const TaskItem = ({ 
  task, 
  level, 
  canEdit, 
  onEdit, 
  onDelete, 
  onAddSubtask 
}: TaskItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-700';
      case 'in-progress': return 'bg-orange-100 text-orange-700';
      case 'done': return 'bg-green-100 text-green-700';
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'To Do';
      case 'in-progress': return 'In Progress';
      case 'done': return 'Done';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

  return (
    <div className={cn("space-y-2", level > 0 && "ml-6")}>
      <Card className={cn(
        "transition-all hover:shadow-md",
        isOverdue && "border-red-200 bg-red-50"
      )}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              {hasSubtasks && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-0 h-auto"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900">{task.name}</h4>
                  <Badge className={cn("text-xs", getStatusColor(task.status))}>
                    {getStatusLabel(task.status)}
                  </Badge>
                  {isOverdue && (
                    <Badge className="bg-red-100 text-red-700 text-xs">
                      Overdue
                    </Badge>
                  )}
                </div>
                
                {task.description && (
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                )}
                
                {task.dueDate && (
                  <p className="text-xs text-gray-500">
                    Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </p>
                )}
              </div>
            </div>
            
            {canEdit && (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddSubtask(task)}
                  title="Add subtask"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  title="Edit task"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  title="Delete task"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Render subtasks */}
      {isExpanded && hasSubtasks && (
        <div className="space-y-2">
          {task.subtasks!.map(subtask => (
            <TaskItem
              key={subtask.id}
              task={subtask}
              level={level + 1}
              canEdit={canEdit}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddSubtask={onAddSubtask}
            />
          ))}
        </div>
      )}
    </div>
  );
};
