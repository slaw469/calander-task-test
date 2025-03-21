import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Timer, Calendar, Settings, Rabbit } from 'lucide-react';

interface LayoutProps {
  showSidebar?: boolean;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ showSidebar = true, children }) => {
  if (!showSidebar) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <main className="flex-1">
          {children || <Outlet />}
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground flex">
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <h2 className="text-lg font-semibold">Habit Tracker</h2>
            </SidebarHeader>
            
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/habits" className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent">
                  <Rabbit size={18} />
                  <span>Habits</span>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Link to="/timer" className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent">
                  <Timer size={18} />
                  <span>Timer</span>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Link to="/calendar" className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent">
                  <Calendar size={18} />
                  <span>Calendar</span>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Link to="/settings" className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent">
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
            
            <SidebarFooter>
              <p className="text-xs text-muted-foreground">© 2025 Habit Tracker</p>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1">
          {children || <Outlet />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;