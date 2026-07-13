import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => (
    <section className="py-32 relative overflow-hidden bg-white text-gray-950">
        {/* Subtle light gradient background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/80 via-white to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            {/* Premium Badge matching the RecentCars section */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2 text-blue-600 bg-blue-50/50 border border-blue-100 px-5 py-1.5 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                        Take The Wheel
                    </span>
                </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-6">
                Ready to <span className="font-semibold italic text-gray-400">Elevate?</span>
            </h2>

            <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto font-light">
                Step into a world where absolute performance meets uncompromising luxury.
            </p>

            {/* Link wrapper around the Premium Button Style */}
            <Link
                to="/availableCars"
                className="group relative inline-flex items-center justify-center gap-3 mx-auto overflow-hidden rounded-full border border-gray-200 bg-transparent px-8 py-4 transition-all hover:border-black hover:bg-black"
            >
                <span className="text-sm font-semibold text-gray-900 group-hover:text-white uppercase tracking-widest transition-colors">
                    Reserve Your Journey
                </span>
                <div className="bg-gray-100 p-1.5 rounded-full group-hover:bg-gray-800 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-gray-900 group-hover:text-white transition-colors" />
                </div>
            </Link>
        </div>
    </section>
);

export default CTA;