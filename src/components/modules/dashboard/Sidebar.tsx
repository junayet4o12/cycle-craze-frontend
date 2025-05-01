import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '@/providers/theme-provider';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/auth/authSlice';
import { dashboardItems } from '@/utils/sidebar-item-and-routes-generator';
import { SidebarItems } from '@/types';
import { SidebarModeToggle } from '@/components/sidebar-mode-toggle';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const dispatch = useAppDispatch()
  const sidebarItems: SidebarItems[] = dashboardItems.sidebarItems

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const logoUrl = theme === 'dark' ? '/logo.png' : theme === 'light' ? '/logo-black.png' : isSystemDark ? '/logo.png' : '/logo-black.png'

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className={cn(
      "flex flex-col h-screen border-r transition-all duration-300",
      collapsed ? "w-16 pt-10" : "w-60"
    )}>
      {/* Header with logo and toggle button */}
      <div className="flex items-center h-14 border-b relative ">
        <Link to={'/dashboard'} className={`flex items-center gap-1 ${collapsed ? 'px-2 mx-auto' : 'px-4'}`}>
          <img className="w-8 object-cover" src={logoUrl} alt="" />
          {
            !collapsed && <span className="text-sm font-semibold">CycleCraze</span>
          }
        </Link>

        {/* Toggle button positioned absolutely */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={`absolute   h-8 w-8 p-0 ${collapsed ? '-top-7 left-1/2 -translate-x-1/2' : 'top-3 right-1'}`}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Navigation menu */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-0.5 px-2">
          {sidebarItems.map((item, index) => {
            const showSectionTitle =
              item.section && (index === 0 || sidebarItems[index - 1].section !== item.section);

            return (
              <div key={item.path}>
                {showSectionTitle && !collapsed && (
                  <div className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-500">
                    {item.section}
                  </div>
                )}

                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center rounded-md text-sm h-10",
                      collapsed ? "justify-center px-3.5 w-max" : "justify-start px-3 w-full",
                      isActive
                        ? "bg-muted text-foreground font-semibold"
                        : "hover:bg-muted"
                    )
                  }
                >
                  <span className="flex items-center">
                    {item.icon}
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </span>
                </NavLink>



              </div>
            );
          })}
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              cn(
                "flex items-center rounded-md text-sm h-10",
                collapsed ? "justify-center px-3.5 w-max" : "justify-start px-3 w-full",
                isActive
                  ? "bg-muted text-[#E63946] font-semibold"
                  : "hover:bg-muted"
              )
            }
          >
            <span className="flex items-center">
              <Home size={18} />
              {!collapsed && <span className="ml-3">Home</span>}
            </span>
          </NavLink>
          <SidebarModeToggle collapsed={collapsed} />
          <div onClick={handleLogout}
            className={`flex items-center text-primary cursor-pointer rounded-md text-sm h-10 hover:bg-muted  ${collapsed ? "justify-center px-3.5 w-max" : "justify-start px-3 w-full"}`}>
            <span className="flex items-center">
              <LogOut size={18} />
              {!collapsed && <span className="ml-3">Logout</span>}
            </span>
          </div>

        </nav>
      </div>
    </div>
  );
}