
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
    <div className={cn("space-y-4", level > 0 && "task-tree-line")}>
      <Card className={cn(
        "beautiful-card group border-l-4 transition-all duration-300 animate-fade-in",
        isOverdue && "border-l-red-500 bg-red-50/30 shadow-red-100",
        isDueSoon && !isOverdue && "border-l-amber-500 bg-amber-50/30 shadow-amber-100",
        task.status === 'done' && "border-l-emerald-500 bg-emerald-50/30 shadow-emerald-100",
        task.status === 'in-progress' && "border-l-blue-500 bg-blue-50/30 shadow-blue-100",
        task.status === 'todo' && "border-l-slate-300"
      )}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              {hasSubtasks && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 h-8 w-8 hover:bg-slate-100 transition-all duration-300 rounded-xl"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-500" />
                  )}
                </Button>
              )}
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-4 flex-wrap gap-2">
                  <h4 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors duration-300">
                    {task.name}
                  </h4>
                  
                  <Badge className={cn("font-semibold px-3 py-1 rounded-full", getStatusStyles(task.status))}>
                    {getStatusLabel(task.status)}
                  </Badge>
                  
                  {isOverdue && (
                    <Badge className="overdue-indicator font-semibold px-3 py-1 rounded-full animate-pulse">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Overdue
                    </Badge>
                  )}
                  
                  {isDueSoon && !isOverdue && (
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 font-semibold px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4 mr-2" />
                      Due Soon
                    </Badge>
                  )}
                </div>
                
                {task.description && (
                  <p className="text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-200">
                    {task.description}
                  </p>
                )}
                
                {task.dueDate && (
                  <div className="flex items-center text-slate-500 bg-white rounded-lg px-3 py-2 border border-slate-200 w-fit">
                    <Calendar className="h-4 w-4 mr-2" />
                    Due {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </div>
                )}
              </div>
            </div>
            
            {canEdit && (
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddSubtask(task)}
                  className="h-10 w-10 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-300 hover:scale-110"
                  title="Add subtask"
                >
                  <Plus className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-10 w-10 p-0 hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-all duration-300 hover:scale-110"
                  title="Edit task"
                >
                  <Edit className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  className="h-10 w-10 p-0 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 hover:scale-110"
                  title="Delete task"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Render subtasks */}
      {isExpanded && hasSubtasks && (
        <div className="space-y-4 animate-slide-up">
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
