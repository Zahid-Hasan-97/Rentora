import React, { useMemo, useState } from "react";
import { FaList, FaSearch, FaTh, FaMapMarkerAlt, FaCarSide } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";

const AvailableCars = () => {
    // Added fallback to empty array to prevent map errors if data is still loading
    const initialCars = useLoaderData() || [];
    const cars = Array.isArray(initialCars) ? initialCars : [];

    const [search, setSearch] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("all");
    const [sort, setSort] = useState("newest");
    const [view, setView] = useState("grid");

    // Your exact filtering & sorting logic
    const filteredCars = useMemo(() => {
        let data = [...cars];

        data = data.filter((car) => {
            const value = search.toLowerCase();
            return (
                car.model?.toLowerCase().includes(value) ||
                car.brand?.toLowerCase().includes(value) ||
                car.location?.toLowerCase().includes(value)
            );
        });

        if (availabilityFilter !== "all") {
            data = data.filter(
                (car) => String(car.available) === availabilityFilter
            );
        }

        switch (sort) {
            case "low":
                data.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
                break;
            case "high":
                data.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
                break;
            case "oldest":
                data.sort((a, b) => new Date(a.posted || 0) - new Date(b.posted || 0));
                break;
            default: // newest
                data.sort((a, b) => new Date(b.posted || 0) - new Date(a.posted || 0));
        }

        return data;
    }, [cars, search, availabilityFilter, sort]);

    return (
        <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans pt-24 pb-32">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header Section (Dealership Style) */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-[2px] w-12 bg-white"></div>
                        <span className="uppercase tracking-[0.3em] text-xs font-bold text-gray-400">Inventory</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-6 text-white">
                        Cars Collection
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Glance through our widest collection of premium vehicles and choose according to your preference and style.
                    </p>
                </div>

                {/* Control Panel / Filters */}
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center bg-[#0f0f0f] p-4 lg:p-6 rounded-none border-l-4 border-white mb-12 gap-6 shadow-2xl">

                    {/* Search Bar */}
                    <div className="relative w-full xl:w-2/5">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            className="w-full bg-[#1a1a1a] text-white border border-[#2a2a2a] py-3 pl-12 pr-4 focus:outline-none focus:border-white transition-colors uppercase text-sm tracking-wide"
                            placeholder="Search by Model, Brand or Location..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Select Filters & View Toggles */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full xl:w-auto">

                        <select
                            className="bg-[#1a1a1a] text-white border border-[#2a2a2a] py-3 px-4 focus:outline-none focus:border-white uppercase text-xs tracking-widest cursor-pointer transition-colors"
                            value={availabilityFilter}
                            onChange={(e) => setAvailabilityFilter(e.target.value)}
                        >
                            <option value="all">Status: All</option>
                            <option value="true">Status: Available</option>
                            <option value="false">Status: Unavailable</option>
                        </select>

                        <select
                            className="bg-[#1a1a1a] text-white border border-[#2a2a2a] py-3 px-4 focus:outline-none focus:border-white uppercase text-xs tracking-widest cursor-pointer transition-colors"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="newest">Sort: Newest First</option>
                            <option value="oldest">Sort: Oldest First</option>
                            <option value="low">Sort: Lowest Price</option>
                            <option value="high">Sort: Highest Price</option>
                        </select>

                        {/* View Toggles */}
                        <div className="flex bg-[#1a1a1a] border border-[#2a2a2a]">
                            <button
                                className={`px-5 py-3 transition-colors ${view === "grid" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
                                onClick={() => setView("grid")}
                                aria-label="Grid View"
                            >
                                <FaTh size={18} />
                            </button>
                            <button
                                className={`px-5 py-3 transition-colors border-l border-[#2a2a2a] ${view === "list" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
                                onClick={() => setView("list")}
                                aria-label="List View"
                            >
                                <FaList size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="mb-6 flex justify-between items-end border-b border-[#222] pb-4">
                    <h2 className="text-xl font-bold uppercase tracking-widest">Available Vehicles</h2>
                    <span className="text-sm text-gray-500 uppercase tracking-widest">{filteredCars.length} Results Found</span>
                </div>

                {filteredCars.length === 0 ? (
                    <div className="py-20 text-center flex flex-col items-center">
                        <FaCarSide size={64} className="text-[#222] mb-6" />
                        <h3 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">No Vehicles Found</h3>
                        <p className="text-gray-600 mt-2">Adjust your filters or search criteria.</p>
                    </div>
                ) : (
                    <div
                        className={
                            view === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                                : "flex flex-col gap-6"
                        }
                    >
                        {filteredCars.map((car) => (
                            <div
                                key={car._id}
                                className={`group bg-[#0a0a0a] border border-[#1f1f1f] hover:border-white transition-all duration-500 overflow-hidden flex ${view === 'list' ? 'flex-col md:flex-row' : 'flex-col'}`}
                            >
                                {/* Image Container */}
                                <div className={`relative overflow-hidden ${view === 'list' ? 'md:w-2/5 h-64 md:h-auto' : 'w-full h-72'}`}>
                                    <img
                                        src={car.image}
                                        alt={car.model}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                                    {/* Availability Badge */}
                                    {/* <div className="absolute top-4 left-4">
                                        {car.available ? (
                                            <span className="bg-green-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-lg">
                                                Available
                                            </span>
                                        ) : (
                                            <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-lg">
                                                Unavailable
                                            </span>
                                        )}
                                    </div> */}

                                    <div className="absolute top-4 left-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold flex items-center gap-1 ${car.available ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}>
                                            {car.available ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                            {car.available ? "Available" : "Unavailable"}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className={`p-8 flex flex-col justify-between ${view === 'list' ? 'md:w-3/5' : 'w-full flex-grow'}`}>
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-bold uppercase tracking-wider text-white">
                                                {car.brand} <span className="text-gray-400 font-light">{car.model}</span>
                                            </h3>
                                        </div>

                                        <p className="text-sm text-gray-500 flex items-center gap-2 mb-6 uppercase tracking-widest">
                                            <FaMapMarkerAlt className="text-gray-400" /> {car.location}
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="flex justify-between items-end border-t border-[#1f1f1f] pt-6 mb-6">
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Rental Rate</p>
                                                <p className="text-3xl font-bold text-white">
                                                    ${Number(car.price).toLocaleString()}
                                                    <span className="text-sm font-light text-gray-500 tracking-widest"> / DAY</span>
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/cars/${car._id}`}
                                            className="block w-full text-center border border-white text-white py-4 uppercase text-xs tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-colors duration-300"
                                        >
                                            Show Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableCars;