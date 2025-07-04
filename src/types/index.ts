
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  parentTaskId?: string;
  name: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  subtasks?: Task[];
}

export interface ProjectShare {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  sharedAt: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type ProjectRole = 'owner' | 'editor' | 'viewer';

export interface TaskFilters {
  status?: TaskStatus;
  dateRange?: {
    start?: string;
    end?: string;
  };
  keyword?: string;
}
