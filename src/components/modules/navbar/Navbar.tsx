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
import Container from "../container/Container";

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
            <Container>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and company name */}
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                            LC
                        </div>
                        <span className="text-lg font-semibold">LogoCompany</span>
                    </div>

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
                    <div className="md:hidden flex items-center">
                        <ModeToggle />

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Menu">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <nav className="flex flex-col gap-4 mt-8">
                                    {navItems.map((item) => (
                                        <SheetClose asChild key={item.label}>
                                            <a
                                                href={item.href}
                                                className="text-lg font-medium hover:text-primary transition-colors"
                                            >
                                                {item.label}
                                            </a>
                                        </SheetClose>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Navbar;