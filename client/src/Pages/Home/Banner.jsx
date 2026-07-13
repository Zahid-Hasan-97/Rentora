import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Banner = () => {
    return (
        <div className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#050505]">

            {/* Cinematic Background Video Container */}
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#050505]">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] hover:scale-105 opacity-60"
                >
                    <source src="/Banner Video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Omni-directional Gradient Overlays for Seamless Blending */}
            {/* Bottom Fade */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-0" />

            {/* Top Fade */}
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#050505] via-[#050505]/50 to-transparent z-0" />

            {/* Side Fades (Crucial for ultra-wide screens to blend the edges) */}
            <div className="absolute inset-y-0 left-0 w-1/4 md:w-1/3 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent z-0" />
            <div className="absolute inset-y-0 right-0 w-1/4 md:w-1/3 bg-gradient-to-l from-[#050505] via-[#050505]/60 to-transparent z-0" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center mt-16 md:mt-0">

                {/* Premium Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-8 border border-white/10 rounded-full bg-[#111]/40 backdrop-blur-md shadow-2xl">
                    <Sparkles className="text-white/70 w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold">
                        Premium Car Rental Services
                    </span>
                </div>

                {/* Editorial Typography */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tighter leading-[1.1]">
                    Drive Your <br className="hidden md:block" />
                    <span className="font-light italic text-gray-400">Dream Car</span> Today
                </h1>

                <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                    Experience luxury, comfort, and reliability. Rent your next vehicle with premium service, all in just a few clicks.
                </p>

                {/* Call To Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                    <Link
                        to="/availableCars"
                        className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-white text-black rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
                            View Available Cars
                        </span>
                        <div className="bg-black/10 p-1.5 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                            <ArrowRight className="w-4 h-4 text-black" />
                        </div>
                    </Link>

                    <button className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-transparent text-white border border-white/20 rounded-full hover:border-white transition-all duration-300 hover:bg-white/5">
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
                            Learn More
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;