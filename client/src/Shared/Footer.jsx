import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
// Inline SVGs used instead of react-icons/fa for guaranteed rendering in all environments

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'Facebook',
            url: 'https://facebook.com',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
        }
    ];

    return (
        <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Section: Newsletter & Branding */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    <div>
                        <Link to="/" className="inline-block mb-6">
                            <img
                                src="https://i.postimg.cc/YCFt8SWr/RENTORA.png"
                                alt="Rentora Logo"
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md font-light">
                            Redefining the art of mobility. Experience unparalleled luxury and performance with our curated fleet of premium vehicles.
                        </p>
                    </div>

                    <div className="bg-[#111] border border-[#222] p-8 rounded-2xl">
                        <h4 className="text-xl font-medium mb-2">Join the inner circle</h4>
                        <p className="text-sm text-gray-500 mb-6 font-light">Subscribe to receive exclusive offers and updates.</p>
                        <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                            <Mail className="absolute left-4 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-[#0a0a0a] text-white text-sm border border-[#333] rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:border-white transition-colors"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Middle Section: Navigation Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-t border-[#1a1a1a] pt-16">

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h5 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Contact</h5>
                        <ul className="space-y-4 text-sm text-gray-300 font-light">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-500 shrink-0" />
                                <span>Badda, Gulshan<br />Dhaka-1212, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gray-500 shrink-0" />
                                <span>+880-01521216370</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-500 shrink-0" />
                                <span>concierge@rentora.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Company</h5>
                        <ul className="space-y-4 text-sm text-gray-400 font-light">
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/fleet" className="hover:text-white transition-colors">Our Fleet</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Premium Services</Link></li>
                            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h5 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Support</h5>
                        <ul className="space-y-4 text-sm text-gray-400 font-light">
                            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/locations" className="hover:text-white transition-colors">Locations</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h5 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Connect</h5>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Section: Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#1a1a1a] text-xs text-gray-500 font-light">
                    <p>&copy; {currentYear} Rentora Luxury Cars. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;