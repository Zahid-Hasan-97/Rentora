import React from 'react';

/**
 * WhyChooseUs Section - Updated Palette
 * Palette: #111111 background, Black cards, White text
 */
const features = [
    {
        title: "Elite Cars",
        description: "A curated collection of world-class vehicles designed for the discerning driver.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
        title: "Financial Clarity",
        description: "Honest, transparent pricing structures with zero hidden fees, guaranteed.",
        icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    },
    {
        title: "Effortless Logistics",
        description: "Experience a frictionless reservation workflow crafted for maximum convenience.",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    },
    {
        title: "Concierge Support",
        description: "Our dedicated specialists are at your service around the clock.",
        icon: "M18.364 5.636a9 9 0 010 12.728M15.556 8.464a5 5 0 010 7.072M12 12a2 2 0 100-4 2 2 0 000 4zM2 12a10 10 0 1120 0 10 10 0 01-20 0z"
    }
];

export default function App() {
    return (
        <section className="py-24 bg-[#111111] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl mb-20">
                    <span className="tracking-[0.2em] text-xs font-bold uppercase opacity-60">
                        Experience Perfection
                    </span>
                    <h2 className="mt-4 text-5xl md:text-6xl font-light tracking-tight">
                        Why our clients <span className="opacity-40 italic">choose</span> the extraordinary.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative p-8 bg-black border border-white/10 hover:border-white/30 transition-all duration-300"
                        >
                            <div className="mb-8 p-3 w-fit bg-[#111111]">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium mb-3">{feature.title}</h3>
                            <p className="opacity-60 text-sm leading-relaxed font-light">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}