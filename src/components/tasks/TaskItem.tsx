
import { useState } from 'react';
import { Task, TaskStatus } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Plus, Edit, Trash2, Calendar, Clock, AlertCircle } from 'lucide-react';
import { format, isAfter, isBefore, startOfDay } from 'date-fns';
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

  const getStatusStyles = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'status-badge-todo';
      case 'in-progress': return 'status-badge-in-progress';
      case 'done': return 'status-badge-done';
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'To Do';
      case 'in-progress': return 'In Progress';
      case 'done': return 'Done';
    }
  };

  const isOverdue = task.dueDate && 
    isBefore(new Date(task.dueDate), startOfDay(new Date())) && 
    task.status !== 'done';
  
  const isDueSoon = task.dueDate && 
    isAfter(new Date(task.dueDate), new Date()) &&
    isBefore(new Date(task.dueDate), new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

  return (
    <div className={cn("space-y-3", level > 0 && "task-tree-line")}>
      <Card className={cn(
        "transition-all duration-200 hover:shadow-md group border-l-4",
        isOverdue && "border-l-red-500 bg-red-50/30",
        isDueSoon && !isOverdue && "border-l-yellow-500 bg-yellow-50/30",
        task.status === 'done' && "border-l-green-500 bg-green-50/30",
        task.status === 'in-progress' && "border-l-blue-500 bg-blue-50/30",
        task.status === 'todo' && "border-l-gray-300"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              {hasSubtasks && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 h-6 w-6 hover:bg-gray-100 transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              )}
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                    {task.name}
                  </h4>
                  
                  <Badge className={cn("text-xs font-medium", getStatusStyles(task.status))}>
                    {getStatusLabel(task.status)}
                  </Badge>
                  
                  {isOverdue && (
                    <Badge className="overdue-indicator text-xs font-medium">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Overdue
                    </Badge>
                  )}
                  
                  {isDueSoon && !isOverdue && (
                    <Badge className="bg-yellow-100 text-yellow-700 text-xs font-medium">
                      <Clock className="h-3 w-3 mr-1" />
                      Due Soon
                    </Badge>
                  )}
                </div>
                
                {task.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>
                )}
                
                {task.dueDate && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    Due {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </div>
                )}
              </div>
            </div>
            
            {canEdit && (
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddSubtask(task)}
                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                  title="Add subtask"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 p-0 hover:bg-gray-50 hover:text-gray-700"
                  title="Edit task"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
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
        <div className="space-y-3 animate-fade-in">
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
