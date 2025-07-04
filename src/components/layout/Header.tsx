
import { User, Settings, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { currentUser } from '@/lib/mockData';

export const Header = () => {
  return (
    <header className="border-b bg-white/90 backdrop-blur-xl px-8 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-3xl font-bold gradient-text">
              TaskManager Pro
            </h1>
          </div>
          
          {/* Enhanced global search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              placeholder="Search projects, tasks, users..."
              className="pl-12 w-96 bg-slate-50/50 border-slate-200 focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative hover:bg-slate-100 rounded-xl transition-all duration-300">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white animate-pulse-glow">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="sm" className="hover:bg-slate-100 rounded-xl transition-all duration-300">
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20 shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white font-semibold">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="font-semibold text-slate-900">{currentUser.name}</p>
              <p className="text-sm text-slate-500">Project Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
