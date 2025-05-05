import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { useTheme } from "@/providers/theme-provider";
import Subscribe from "./Subscribe";

export default function Footer() {
    const { theme } = useTheme();
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const logoUrl = theme === 'dark' ? '/logo.png' : theme === 'light' ? '/logo-black.png' : isSystemDark ? '/logo.png' : '/logo-black.png';

    return (
        <footer className="w-full">
            <section className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and About */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Link to={'/'} className="flex items-center gap-1">
                                <img className="w-12 object-cover" src={logoUrl} alt="CycleCraze Logo" />
                                <span className="text-xl font-semibold">CycleCraze</span>
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Discover high-quality bicycles at unbeatable prices. Whether you're into mountain biking, hybrid rides, or e-bikes — CycleCraze has something for every cyclist.
                        </p>
                        <Link to="/about" className="text-sm font-medium">
                            Read More About Shop
                        </Link>
                    </div>

                    {/* Shop Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Shop</h3>
                        <ul className="space-y-2">
                            <li><Link to="/shop" className="text-sm text-muted-foreground hover:text-accent-foreground">All Bikes</Link></li>
                            <li><Link to="/shop?category=Mountain" className="text-sm text-muted-foreground hover:text-accent-foreground">Mountain Bikes</Link></li>
                            <li><Link to="/shop?category=Hybrid" className="text-sm text-muted-foreground hover:text-accent-foreground">Hybrid Bikes</Link></li>
                            <li><Link to="/shop?category=Electric" className="text-sm text-muted-foreground hover:text-accent-foreground">Electric Bikes</Link></li>
                        </ul>
                    </div>

                    {/* Information Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Information</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about-us" className="text-sm text-muted-foreground hover:text-accent-foreground">About Us</Link></li>
                            <li><Link to="/faqs" className="text-sm text-muted-foreground hover:text-accent-foreground">FAQs</Link></li>
                            <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-accent-foreground">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Address and Newsletter */}
                    <div className="space-y-8">
                        {/* Address */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Address Office</h3>
                            <div className="flex items-start space-x-2">
                                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <span className="text-sm text-muted-foreground">muhammadjunayetmaruf@gmail.com</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <span className="text-sm text-muted-foreground">Feni Polytechnic Road, Feni Sadar, Chattogram, Bangladesh</span>
                            </div>
                            <div className="flex space-x-3">
                                <Link to="https://facebook.com/junayet4012" target="_blank" aria-label="Facebook">
                                    <Facebook className="h-5 w-5 text-muted-foreground hover:text-accent-foreground" />
                                </Link>
                                <Link to="https://twitter.com/junayet4012" target="_blank" aria-label="Twitter">
                                    <Twitter className="h-5 w-5 text-muted-foreground hover:text-accent-foreground" />
                                </Link>
                                <Link to="https://github.com/junayet4o12" target="_blank" aria-label="GitHub">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground hover:text-accent-foreground">
                                        <path d="M12 1C5.4 1 0 6.4 0 13c0 5.3 3.4 9.8 8.2 11.3.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.5-1.4-1.9-1.4-1.9-1.2-.9.1-.9.1-.9 1.3.1 2 1.3 2 1.3 1.2 2 3.1 1.4 3.9 1.1.1-.9.5-1.4.9-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17 6.3 18 6.6 18 6.6c.6 1.7.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.5.4 1 .8 1 1.7v2.6c0 .3.2.7.8.6C20.6 22.8 24 18.3 24 13c0-6.6-5.4-12-12-12z" />
                                    </svg>
                                </Link>
                                <Link to="https://instagram.com/junayet4012" target="_blank" aria-label="Instagram">
                                    <Instagram className="h-5 w-5 text-muted-foreground hover:text-accent-foreground" />
                                </Link>
                                <Link to="https://youtube.com/@junayet4012" target="_blank" aria-label="YouTube">
                                    <Youtube className="h-5 w-5 text-muted-foreground hover:text-accent-foreground" />
                                </Link>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Newsletter</h3>
                            <p className="text-sm text-muted-foreground">
                                Stay updated with our latest collections, offers, and more!
                            </p>
                           <Subscribe/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Bar */}
            <div className="w-full bg-gray-900 text-white py-4">
                <section className="px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <Link to="https://facebook.com/junayet4012" target="_blank" aria-label="Facebook">
                            <Facebook className="h-5 w-5 text-white hover:text-gray-300" />
                        </Link>
                        <Link to="https://twitter.com/junayet4012" target="_blank" aria-label="Twitter">
                            <Twitter className="h-5 w-5 text-white hover:text-gray-300" />
                        </Link>
                        <Link to="https://github.com/junayet4o12" target="_blank" aria-label="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-gray-300">
                                <path d="M12 1C5.4 1 0 6.4 0 13c0 5.3 3.4 9.8 8.2 11.3.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.5-1.4-1.9-1.4-1.9-1.2-.9.1-.9.1-.9 1.3.1 2 1.3 2 1.3 1.2 2 3.1 1.4 3.9 1.1.1-.9.5-1.4.9-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17 6.3 18 6.6 18 6.6c.6 1.7.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.5.4 1 .8 1 1.7v2.6c0 .3.2.7.8.6C20.6 22.8 24 18.3 24 13c0-6.6-5.4-12-12-12z" />
                            </svg>
                        </Link>
                        <Link to="https://instagram.com/junayet4012" target="_blank" aria-label="Instagram">
                            <Instagram className="h-5 w-5 text-white hover:text-gray-300" />
                        </Link>
                        <Link to="https://youtube.com/@junayet4012" target="_blank" aria-label="YouTube">
                            <Youtube className="h-5 w-5 text-white hover:text-gray-300" />
                        </Link>
                    </div>
                    <p className="text-sm text-center md:text-right">Copyright © 2025 CycleCraze. All rights reserved.</p>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <div className="w-8 h-5 bg-blue-600 rounded"></div>
                        <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        </div>
                        <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded"></div>
                        <div className="w-8 h-5 bg-purple-600 rounded"></div>
                        <div className="w-8 h-5 bg-white border rounded"></div>
                    </div>
                </section>
            </div>
        </footer>
    );
}
