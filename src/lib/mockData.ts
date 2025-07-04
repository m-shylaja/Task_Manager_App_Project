
import { User, Project, Task, ProjectShare } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    createdAt: '2024-01-03T00:00:00Z'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Building a modern e-commerce solution',
    ownerId: '1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application',
    ownerId: '2',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    name: 'Backend Development',
    description: 'Develop REST API endpoints',
    status: 'in-progress',
    dueDate: '2024-07-15T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    projectId: '1',
    parentTaskId: '1',
    name: 'User Authentication',
    description: 'Implement JWT authentication',
    status: 'done',
    dueDate: '2024-07-10T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    projectId: '1',
    parentTaskId: '1',
    name: 'Database Schema',
    description: 'Design and implement database schema',
    status: 'todo',
    dueDate: '2024-07-20T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    projectId: '1',
    name: 'Frontend Development',
    description: 'Build user interface components',
    status: 'todo',
    dueDate: '2024-07-25T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockProjectShares: ProjectShare[] = [
  {
    id: '1',
    projectId: '1',
    userId: '1',
    role: 'owner',
    sharedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    projectId: '1',
    userId: '2',
    role: 'editor',
    sharedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    projectId: '2',
    userId: '2',
    role: 'owner',
    sharedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '4',
    projectId: '2',
    userId: '1',
    role: 'viewer',
    sharedAt: '2024-01-02T00:00:00Z'
  }
];

// Current logged-in user (User A)
export const currentUser: User = mockUsers[0];
