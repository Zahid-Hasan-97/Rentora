import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// Path update kora hoyeche, local context structure onujayi adjust kora holo
import AuthContext from '../../src/Context/AuthContext/AuthContext';
import { LayoutDashboard, Car, CalendarClock, LogOut, LogIn, PlusCircle } from 'lucide-react';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="fixed top-0 inset-x-0 z-50 px-4 py-4">
            <div className="max-w-6xl mx-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#222] rounded-2xl flex items-center justify-between shadow-2xl">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="h-20 flex items-center justify-center">
                        <img
                            src="https://i.postimg.cc/YCFt8SWr/RENTORA.png"
                            alt="Rentora Logo"
                            className="h-full w-auto object-contain"
                        />
                    </div>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</Link>
                    <Link to="/availableCars" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Cars</Link>

                    {user && (
                        <>
                            <Link to="/addCar" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                <PlusCircle className="w-4 h-4" /> Add
                            </Link>
                            <Link to="/myCars" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4" /> My Cars
                            </Link>
                            <Link to="/myBookings" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                <CalendarClock className="w-4 h-4" /> Bookings
                            </Link>
                        </>
                    )}
                </div>

                {/* Auth */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3 bg-[#111] p-1.5 rounded-full border border-[#222]">
                            <img
                                src={user.photoURL || "https://i.pravatar.cc/150?u=user"}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover border border-[#333]"
                            />
                            <button
                                onClick={handleSignOut}
                                className="pr-3 text-gray-400 hover:text-white transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/signin"
                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all"
                        >
                            <LogIn className="w-4 h-4" /> Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;