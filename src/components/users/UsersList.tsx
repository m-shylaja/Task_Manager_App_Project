
import { useState } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/lib/mockData';
import { UserCard } from './UserCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user);
    // TODO: Implement edit functionality
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddUser = () => {
    console.log('Add new user');
    // TODO: Implement add functionality
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Users</h2>
        <Button onClick={handleAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>
    </div>
  );
};
