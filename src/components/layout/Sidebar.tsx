
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
    <aside className="w-80 bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/60 h-full shadow-xl backdrop-blur-sm">
      <div className="p-8 space-y-8">
        {/* Enhanced Quick Actions */}
        <div className="space-y-4">
          <Button 
            className="w-full modern-button rounded-xl py-3 text-base font-semibold shadow-lg"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-3" />
            New Project
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full subtle-button rounded-xl py-3 text-base border-dashed hover:border-solid transition-all duration-300"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-3" />
            Quick Task
          </Button>
        </div>
        
        {/* Enhanced Navigation */}
        <nav className="space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-6">
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
                  "w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300 group relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-primary/15 to-blue-600/15 text-primary border border-primary/30 shadow-lg scale-105"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:scale-105 hover:shadow-md"
                )}
              >
                <Icon className={cn(
                  "h-6 w-6 mr-4 transition-all duration-300",
                  isActive ? "text-primary scale-110" : "text-slate-400 group-hover:text-slate-600 group-hover:scale-110"
                )} />
                <span className="font-semibold text-base">{item.label}</span>
                {isActive && (
                  <>
                    <div className="ml-auto w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl"></div>
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Enhanced Recent Projects */}
        <div className="pt-8 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-4">
            Recent Projects
          </div>
          <div className="space-y-3">
            {['Website Redesign', 'Mobile App', 'Marketing Campaign'].map((project, index) => (
              <div key={project} className="flex items-center px-4 py-3 text-sm text-slate-600 hover:text-slate-900 cursor-pointer rounded-xl hover:bg-slate-50 transition-all duration-300 hover:scale-105 group">
                <div className={cn(
                  "w-4 h-4 rounded-full mr-4 shadow-sm transition-all duration-300 group-hover:scale-125",
                  index === 0 ? "bg-emerald-400" : index === 1 ? "bg-amber-400" : "bg-blue-400"
                )}></div>
                <span className="font-medium">{project}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
