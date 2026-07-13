import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowRight, Crown } from "lucide-react";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------------
// 1. FeaturedCarsCard Component (Combined into a single file to fix import errors)
// ----------------------------------------------------------------------------
const FeaturedCarsCard = ({ car }) => {
    return (
        <div className="car-card group relative bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-2 flex flex-col">

            <div className="relative h-64 overflow-hidden">
                <img
                    src={car.image || "/placeholder.jpg"}
                    alt={car.model}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                {/* Premium Featured Badge */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 text-white shadow-lg">
                    <Crown className="w-3.5 h-3.5 text-yellow-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Featured</span>
                </div>
            </div>

            <div className="p-6 relative z-10 flex flex-col flex-grow bg-black">

                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2">
                            {car.brand}
                        </p>
                        <h3 className="text-2xl font-medium text-white truncate max-w-[200px]">
                            {car.model}
                        </h3>
                    </div>

                    {/* Display Price if available, otherwise hide gracefully */}
                    {car.price && (
                        <div className="text-right flex-shrink-0">
                            <p className="text-xl font-bold text-white">${car.price}</p>
                            <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">/ day</p>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <Link
                        to={`/cars/${car._id}`}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-white text-black py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-gray-200 active:scale-[0.98]"
                    >
                        Discover Vehicle
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

// ----------------------------------------------------------------------------
// 2. Main FeaturedCars Section Component
// ----------------------------------------------------------------------------
const FeaturedCars = () => {
    const sectionRef = useRef(null);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Safe fallback for API URL to prevent import.meta build errors in certain environments
        const apiUrl = "http://localhost:5000";

        axios
            .get(`${apiUrl}/cars/featured`)
            .then((res) => {
                // Ensure we extract the array properly whether it's wrapped in { data: [...] } or not
                const carData = Array.isArray(res.data) ? res.data : (res.data?.data || []);
                setCars(carData);
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!cars.length) return;

        let ctx;
        let isActive = true;

        // Using window.gsap to avoid import resolution errors in restricted environments
        const initGsap = () => {
            if (!isActive) return;

            if (window.gsap && window.gsap.ScrollTrigger) {
                ctx = window.gsap.context(() => {
                    window.gsap.from(".car-card", {
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                        },
                        y: 100,
                        opacity: 0,
                        duration: 1.2,
                        stagger: 0.2,
                        ease: "power4.out",
                    });
                }, sectionRef);
            } else {
                // Retry if GSAP hasn't loaded in the global window yet
                setTimeout(initGsap, 50);
            }
        };

        initGsap();

        return () => {
            isActive = false;
            if (ctx && ctx.revert) ctx.revert();
        };
    }, [cars]);

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-[#111111] text-white border-t border-white/5 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Premium Header */}
                <div className="flex flex-col items-center text-center mb-20">
                    <span className="tracking-[0.2em] text-xs font-bold uppercase opacity-50 mb-4 block">
                        Signature Collection
                    </span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
                        Featured <span className="opacity-40 italic font-semibold">Masterpieces</span>
                    </h2>
                </div>

                {/* Loading State & Grid */}
                {loading ? (
                    <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <p className="opacity-60 text-sm tracking-[0.2em] uppercase">Curating Collection...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {cars.map((car) => (
                            <FeaturedCarsCard key={car._id} car={car} />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};

export default FeaturedCars;