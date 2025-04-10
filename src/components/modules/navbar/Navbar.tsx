import { FC, useEffect } from "react";
import { LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Profile from "@/components/profile";
import { useTheme } from "@/providers/theme-provider";

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
];

const Navbar: FC = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const handleLogout = () => {
        dispatch(logout())
    }

    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const logoUrl = theme === 'dark' ? '/logo.png' : theme === 'light' ? '/logo-black.png' : isSystemDark ? '/logo.png' : '/logo-black.png'

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <section className="!py-0">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and company name */}
                    <Link to={'/'} className="flex items-center gap-1">
                        <img className="w-12 object-cover" src={logoUrl} alt="" />
                        <span className="text-lg font-semibold">CycleCraze</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium hover:text-primary transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}

                        {/* Cart Button */}
                        <Link to="/cart" className="relative">
                            <Button variant="ghost" size="icon" aria-label="Cart">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">0</span>
                            </Button>
                        </Link>

                        {/* Authentication */}
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full overflow-hidden border border-muted w-8 h-8 p-0">
                                        <Profile />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <Link to="/profile">
                                        <DropdownMenuItem className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>My Profile</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link to="/my-orders">
                                        <DropdownMenuItem className="cursor-pointer">
                                            <span>My Orders</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link to="/auth/login">
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Login
                                </Button>
                            </Link>
                        )}
                        {/* Theme toggle button */}
                        <ModeToggle />
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center gap-2">
                        {/* Cart Button for Mobile */}
                        <Link to="/cart" className="relative">
                            <Button variant="ghost" size="icon" aria-label="Cart">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">0</span>
                            </Button>
                        </Link>

                        <ModeToggle />

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Menu" className="w-auto h-auto py-2.5 pl-2.5 hover:pr-2.5 duration-500 cursor-pointer">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="px-4">
                                <nav className="flex flex-col gap-4 mt-8">
                                    {/* Authentication in Mobile Menu */}
                                    {user ? (
                                        <div className="mb-4 pb-4 border-b">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-full overflow-hidden border border-muted">
                                                    <Profile />
                                                </div>
                                                <SheetClose asChild>
                                                    <Link to="/profile" className="text-sm font-medium">My Profile</Link>
                                                </SheetClose>
                                            </div>
                                            <SheetClose asChild>
                                                <Link to="/my-orders" className="text-sm font-medium py-2 block">
                                                    My Orders
                                                </Link>
                                            </SheetClose>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start text-destructive hover:text-destructive mt-2 px-0"
                                                onClick={handleLogout}
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="mb-4 pb-4 border-b">
                                            <SheetClose asChild>
                                                <Link to="/auth/login">
                                                    <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        Login
                                                    </Button>
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    )}

                                    {/* Regular Nav Items */}
                                    {navItems.map((item) => (
                                        <SheetClose asChild key={item.label}>
                                            <Link to={item.href} className="text-sm font-medium py-2">
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    ))}

                                    {/* Cart in Mobile Menu */}
                                    <SheetClose asChild>
                                        <Link to="/cart" className="text-sm font-medium py-2 flex items-center gap-2">
                                            <ShoppingCart className="h-4 w-4" />
                                            My Cart
                                        </Link>
                                    </SheetClose>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Navbar;