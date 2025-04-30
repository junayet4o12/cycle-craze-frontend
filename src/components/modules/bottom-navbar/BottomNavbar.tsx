import { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Home,
    User,
    ShoppingBag,
    PhoneCall,
    Wrench,
    LogOut,
    User2
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import Profile from "@/components/profile";

interface NavLinkItem {
    label: string;
    href: string;
    icon: ReactNode;
    show?: boolean;
    isFocus?:boolean;
}
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const BottomNavbar: FC = () => {
    const location = useLocation();
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch()
    const navItems: NavLinkItem[] = [
        {
            label: "Home",
            href: "/",
            icon: <Home className="h-5 w-5" />,
        },

        {
            label: "Services",
            href: "/services",
            icon: <Wrench className="h-5 w-5" />,
        },
        {
            label: "Shop",
            href: "/shop",
            icon: <ShoppingBag className="h-5 w-5" />,
            isFocus: true,
        },
        {
            label: "Contact",
            href: "/contact",
            icon: <PhoneCall className="h-5 w-5" />,
        },

        {
            label: "Account",
            href: "/auth/login",
            icon: <User2 className="h-5 w-5" />,
            show: user ? false : true
        },
    ];
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <section className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t bg-background shadow-sm">
            <ul className="flex justify-between items-center py-2">
                {navItems
                    .filter((item) => item.show !== false)
                    .map((item) => {
                        const isActive = location.pathname === item.href;

                        return (
                            <li 
                            className={`${item.isFocus && `mt-[-35px]  border-t w-14 aspect-square flex justify-center items-center rounded-full ${isActive ? 'bg-primary text-white' : 'bg-background'}`} ${isActive ? "text-primary" : "text-muted-foreground"
                                        }`}
                            key={item.href}>
                                <Link
                                    to={item.href}
                                    className={`flex flex-col items-center text-xs font-medium transition-colors `}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                {user && <li>
                    <div className="w-6 text-center ">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="" asChild>
                                <div className="cursor-pointer flex flex-col">
                                    <Profile />
                                    <span className="text-xs">You</span>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <Link to="/profile">
                                    <DropdownMenuItem className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>My Profile</span>
                                    </DropdownMenuItem>
                                </Link>
                                {/* {user.role === 'user' &&  */}
                                <Link to="/my-orders">
                                    <DropdownMenuItem className="cursor-pointer">
                                        <span>My Orders</span>
                                    </DropdownMenuItem>
                                </Link>
                                {/* } */}
                                {
                                    user && user.role === 'admin' ? <Link to="/dashboard">
                                        <DropdownMenuItem className="cursor-pointer">
                                            <span>Dashboard</span>
                                        </DropdownMenuItem>
                                    </Link> : ''
                                }
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </li>}
            </ul>
        </section>
    );
};

export default BottomNavbar;
