
import { Users, FolderOpen, CheckSquare, Plus, Home, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'users', label: 'Team', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/60 h-full">
      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-colors"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Quick Task
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-4">
            Navigation
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary border border-primary/20 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 mr-3 transition-colors",
                  isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                )} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Recent Projects */}
        <div className="pt-6 border-t border-gray-200">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
            Recent Projects
          </div>
          <div className="space-y-2">
            {['Website Redesign', 'Mobile App', 'Marketing Campaign'].map((project, index) => (
              <div key={project} className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                <div className={cn(
                  "w-3 h-3 rounded-full mr-3",
                  index === 0 ? "bg-green-400" : index === 1 ? "bg-yellow-400" : "bg-blue-400"
                )}></div>
                {project}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
