import React from "react";
import { MapPin, ShieldCheck, Check } from "lucide-react";
import { Link as RouterLink, useLoaderData } from "react-router-dom";

// Note: Mocking the auth hook so the component can compile and preview correctly.
// Replace this with: import useAuth from "../../Hooks/useAuth"; in your actual project.
const useAuth = () => {
    return { user: { name: "Guest" } };
};

const CarDetails = () => {
    const { user } = useAuth();

    // ==========================================
    // PREVIEW SAFEGUARD & ROUTER CHECK
    // ==========================================
    let loaderData = null;
    let isPreview = false;

    try {
        loaderData = useLoaderData();
    } catch (e) {
        isPreview = true;
        console.warn("Not inside a data router, running in preview mode.");
    }

    // Custom Link component to prevent Router Context crashes in sandbox environments
    const SafeLink = ({ to, children, className, state, ...props }) => {
        if (isPreview) {
            return (
                <a href={to} className={className} {...props}>
                    {children}
                </a>
            );
        }
        return (
            <RouterLink to={to} className={className} state={state} {...props}>
                {children}
            </RouterLink>
        );
    };

    // Fallback object so the preview looks perfect
    const car = loaderData || {
        _id: "1",
        model: "911 GT3 Touring",
        brand: "Porsche",
        image: "https://images.unsplash.com/photo-1611821064430-0d40220e4e0a?q=80&w=2000&auto=format&fit=crop",
        location: "Dubai, UAE",
        price: 850,
        description: "The Porsche 911 GT3 represents the pinnacle of naturally aspirated performance. Stripped of unnecessary weight and focused entirely on driver engagement, it delivers an analog experience in a digital world. Meticulously maintained and ready for the track.",
        features: ["Carbon Fiber Bucket Seats", "PDK Transmission", "Sport Chrono Package", "Carbon Ceramic Brakes", "Bose Surround Sound"],
        available: true,
    };

    const {
        _id,
        model,
        brand,
        image,
        location,
        price,
        description,
        features,
        available,
    } = car;

    return (
        <div className="min-h-screen bg-[#050505] text-[#ededed] pt-28 pb-32 font-sans selection:bg-white selection:text-black">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header Section */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="h-[2px] w-12 bg-white"></div>
                    <span className="uppercase tracking-[0.3em] text-xs font-bold text-gray-400">
                        Vehicle Overview
                    </span>
                </div>

                {/* Main Dealership Layout */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* LEFT COLUMN: Cinematic Image Presentation */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-28 relative group overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a]">
                            <img
                                src={image}
                                alt={model}
                                className="w-full h-auto object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out"
                            />

                            {/* Inner vignette for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#000]/80 via-transparent to-transparent pointer-events-none opacity-60"></div>

                            {/* Availability Badge */}
                            <div className="absolute top-6 left-6 z-10">
                                {available ? (
                                    <span className="bg-white text-black text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        Available Now
                                    </span>
                                ) : (
                                    <span className="bg-[#111] text-white border border-[#333] text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        Unavailable
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Specifications & Action */}
                    <div className="lg:col-span-5 flex flex-col">

                        {/* Title Block */}
                        <div className="mb-10 pb-8 border-b border-[#1f1f1f]">
                            <p className="uppercase tracking-[0.4em] text-sm font-bold text-gray-500 mb-3">
                                {brand}
                            </p>
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-wider text-white leading-none mb-6">
                                {model}
                            </h1>

                            <div className="flex items-end gap-3">
                                <span className="text-4xl lg:text-5xl font-light text-white">
                                    ${Number(price).toLocaleString()}
                                </span>
                                <span className="text-sm text-gray-500 uppercase tracking-[0.2em] mb-1 font-bold">
                                    / Day
                                </span>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-5 flex flex-col gap-2">
                                <MapPin className="text-gray-500 w-5 h-5 mb-2" />
                                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Location</span>
                                <span className="text-sm text-white font-medium truncate">{location}</span>
                            </div>
                            <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-5 flex flex-col gap-2">
                                <ShieldCheck className="text-gray-500 w-5 h-5 mb-2" />
                                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Insurance</span>
                                <span className="text-sm text-white font-medium">Fully Covered</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span> Description
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm text-justify">
                                {description}
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="mb-12">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span> Key Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                                {features?.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 text-sm text-gray-300">
                                        <Check className="text-white shrink-0 w-4 h-4" />
                                        <span className="tracking-wide">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call To Action */}
                        <div className="mt-auto pt-8 border-t border-[#1f1f1f]">
                            {available ? (
                                user ? (
                                    <SafeLink
                                        to={`/bookCar/${_id}`}
                                        className="group relative flex items-center justify-center w-full bg-white text-black py-5 uppercase text-sm tracking-[0.3em] font-bold overflow-hidden transition-all duration-300"
                                    >
                                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Proceed to Booking</span>
                                        <div className="absolute inset-0 bg-[#111] w-full h-full transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                                        <div className="absolute inset-0 border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </SafeLink>
                                ) : (
                                    <SafeLink
                                        to="/signin"
                                        state={{ from: { pathname: `/bookCar/${_id}` } }}
                                        className="group relative flex items-center justify-center w-full bg-[#0a0a0a] border border-white text-white py-5 uppercase text-sm tracking-[0.3em] font-bold overflow-hidden hover:text-black transition-colors duration-500"
                                    >
                                        <span className="relative z-10">Sign In To Book</span>
                                        <div className="absolute inset-0 bg-white w-full h-full transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out"></div>
                                    </SafeLink>
                                )
                            ) : (
                                <button
                                    disabled
                                    className="block w-full text-center bg-[#0a0a0a] text-gray-600 border border-[#1f1f1f] py-5 uppercase text-sm tracking-[0.3em] font-bold cursor-not-allowed"
                                >
                                    Currently Unavailable
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;