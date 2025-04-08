import { FC } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

const Navbar: FC = () => {

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <section>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and company name */}
                    <Link to={'/'} className="flex items-center gap-1">
                        <img className="w-12 object-cover" src="/logo.png" alt="" />
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

                        {/* Theme toggle button */}

                        <ModeToggle />
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center gap-1">
                        <ModeToggle />

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Menu" className="w-auto h-auto py-2.5 pl-2.5 hover:pr-2.5 duration-500 cursor-pointer">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="px-4">
                                <nav className="flex flex-col gap-4 mt-8">
                                    {navItems.map((item) => (
                                        <SheetClose asChild key={item.label}>
                                            <Link to={`/${item.href}`}>{item.label}</Link>
                                        </SheetClose>
                                    ))}
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