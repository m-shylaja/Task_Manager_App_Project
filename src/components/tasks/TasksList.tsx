
import { useState, useMemo } from 'react';
import { Task, TaskFilters, Project, ProjectRole } from '@/types';
import { mockTasks, mockProjectShares, currentUser } from '@/lib/mockData';
import { TaskItem } from './TaskItem';
import { TaskFiltersComponent } from './TaskFilters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TasksListProps {
  selectedProject: Project | null;
}

export const TasksList = ({ selectedProject }: TasksListProps) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filters, setFilters] = useState<TaskFilters>({});

  const userRole = useMemo(() => {
    if (!selectedProject) return 'viewer';
    const share = mockProjectShares.find(
      share => share.projectId === selectedProject.id && share.userId === currentUser.id
    );
    return share?.role || 'viewer';
  }, [selectedProject]);

  const canEdit = userRole === 'owner' || userRole === 'editor';

  // Build task hierarchy
  const buildTaskHierarchy = (tasks: Task[]): Task[] => {
    const taskMap = new Map<string, Task>();
    const rootTasks: Task[] = [];

    // First pass: create map and initialize subtasks arrays
    tasks.forEach(task => {
      taskMap.set(task.id, { ...task, subtasks: [] });
    });

    // Second pass: build hierarchy
    tasks.forEach(task => {
      const taskWithSubtasks = taskMap.get(task.id)!;
      if (task.parentTaskId) {
        const parent = taskMap.get(task.parentTaskId);
        if (parent) {
          parent.subtasks!.push(taskWithSubtasks);
        }
      } else {
        rootTasks.push(taskWithSubtasks);
      }
    });

    return rootTasks;
  };

  // Filter tasks based on criteria
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (selectedProject) {
      filtered = filtered.filter(task => task.projectId === selectedProject.id);
    }

    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(task => 
        task.name.toLowerCase().includes(keyword) || 
        task.description.toLowerCase().includes(keyword)
      );
    }

    if (filters.dateRange?.start || filters.dateRange?.end) {
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        const start = filters.dateRange?.start ? new Date(filters.dateRange.start) : null;
        const end = filters.dateRange?.end ? new Date(filters.dateRange.end) : null;
        
        if (start && taskDate < start) return false;
        if (end && taskDate > end) return false;
        return true;
      });
    }

    return buildTaskHierarchy(filtered);
  }, [tasks, selectedProject, filters]);

  const handleEditTask = (task: Task) => {
    console.log('Edit task:', task);
    // TODO: Implement edit functionality
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddSubtask = (parentTask: Task) => {
    console.log('Add subtask to:', parentTask);
    // TODO: Implement add subtask functionality
  };

  const handleAddTask = () => {
    console.log('Add new task');
    // TODO: Implement add task functionality
  };

  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Select a project to view tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Tasks - {selectedProject.name}
        </h2>
        {canEdit && (
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        )}
      </div>

      <TaskFiltersComponent filters={filters} onFiltersChange={setFilters} />

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks found matching your criteria</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              level={0}
              canEdit={canEdit}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onAddSubtask={handleAddSubtask}
            />
          ))
        )}
      </div>
    </div>
  );
};
