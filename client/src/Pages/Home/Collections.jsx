import React from 'react';

const Collections = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Categories
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Premium Collections
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sports Collection */}
                    <div className="group relative h-72 bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl hover:border-gray-200 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800"
                            alt="Sports Cars"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                            <h3 className="text-2xl font-bold text-white mb-1">Sports</h3>
                            <p className="text-gray-200 text-sm font-medium">12 Vehicles</p>
                        </div>
                    </div>

                    {/* Luxury SUV Collection */}
                    <div className="group relative h-72 bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl hover:border-gray-200 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800"
                            alt="Luxury SUVs"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                            <h3 className="text-2xl font-bold text-white mb-1">Luxury SUV</h3>
                            <p className="text-gray-200 text-sm font-medium">8 Vehicles</p>
                        </div>
                    </div>

                    {/* Executive Collection */}
                    <div className="group relative h-72 bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl hover:border-gray-200 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800"
                            alt="Executive Cars"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                            <h3 className="text-2xl font-bold text-white mb-1">Executive</h3>
                            <p className="text-gray-200 text-sm font-medium">15 Vehicles</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Collections;