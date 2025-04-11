import Analytics from '@/pages/dashboards/Analytics';
import Dashboard from '@/pages/dashboards/Dashboard';
import ManageProducts from '@/pages/dashboards/ManageProducts';
import { DashBoardItemsData, SidebarItems } from '@/types';
import {
    BarChart2,
    Compass,
    ShoppingBag,
    MessageCircle,
    Settings,
    HelpCircle,
    Users,
    LayoutDashboard,
    PackageSearch,
} from 'lucide-react';



const dashBoardItemsData: DashBoardItemsData[] = [
    {
        title: 'Dashboard',
        icon: <LayoutDashboard size={18} />,
        path: '/dashboard',
        component: <Dashboard />
    },
    {
        title: 'Analytics',
        icon: <BarChart2 size={18} />,
        path: 'analytics',
        component: <Analytics />
    },
    {
        title: 'Explore',
        icon: <Compass size={18} />,
        path: 'explore',
        component: <p>Explore</p>
    },
    {
        title: 'Shop',
        icon: <ShoppingBag size={18} />,
        path: 'shop',
        component: <p>Shop</p>
    },
    {
        title: 'Chat',
        icon: <MessageCircle size={18} />,
        path: 'chat',
        component: <p>Chat</p>
    },
    {
        title: 'Settings',
        icon: <Settings size={18} />,
        path: 'settings',
        section: 'Tools',
        component: <p>Settings</p>
    },
    {
        title: 'Help',
        icon: <HelpCircle size={18} />,
        path: 'help',
        component: <p>Help</p>
    },
    {
        title: 'Manage user',
        icon: <Users size={18} />,
        path: 'manage-user',
        component: <p>manage-user</p>
    },
    {
        title: 'Manage Products',
        icon: <PackageSearch size={18} />,
        path: 'manage-product',
        component: <ManageProducts/>
    },
];

const routes = dashBoardItemsData.map(item => ({
    path: item.path,
    element: item.component
}))
const sidebarItems: SidebarItems[] = dashBoardItemsData.map(item => ({
    title: item.title,
    icon: item.icon,
    path: item.path,
    section: item?.section,
}))


export const dashboardItems = { routes, sidebarItems }