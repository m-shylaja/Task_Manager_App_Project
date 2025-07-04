
import { User } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <Card className="beautiful-card hover-lift group overflow-hidden animate-scale-in">
      <div className="h-1 bg-gradient-to-r from-primary to-blue-600"></div>
      
      <CardContent className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-5">
            <Avatar className="h-16 w-16 ring-4 ring-primary/20 shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-xl font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">{user.name}</h3>
              <div className="flex items-center text-slate-600 mb-3">
                <Mail className="h-4 w-4 mr-2" />
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex items-center text-sm text-slate-400">
                <Calendar className="h-4 w-4 mr-2" />
                Joined {format(new Date(user.createdAt), 'MMM yyyy')}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(user)}
              className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300 hover:scale-110"
            >
              <Edit className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(user.id)}
              className="h-10 w-10 p-0 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 rounded-full font-medium">
            Team Member
          </Badge>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-emerald-600 font-medium">Active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
