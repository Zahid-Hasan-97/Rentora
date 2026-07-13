import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, LayoutGrid } from "lucide-react";
// Import path resolved to the correct file location
import RecentCarsCard from "./RecentCarsCard";
import { Link } from "react-router-dom";

const RecentCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/cars?limit=6")
            .then((res) => res.json())
            .then((data) => {
                setCars(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <section className="bg-white py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Elegant Header */}
                <div className="flex flex-col items-center text-center mb-20 gap-4">
                    <div className="flex items-center gap-2 text-blue-600 bg-blue-50/50 border border-blue-100 px-5 py-1.5 rounded-full">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                            Curated Selection
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-extralight text-gray-950 tracking-tighter">
                        Our Latest <span className="font-semibold italic text-gray-400">Acquisitions</span>
                    </h2>
                    <p className="max-w-lg text-gray-500 font-light mt-4">
                        Discover a hand-picked collection of prestige vehicles, meticulously maintained for the discerning driver.
                    </p>
                </div>

                {/* Premium Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-[450px] bg-gray-100 rounded-3xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {cars.map((car) => (
                            <RecentCarsCard key={car._id} car={car} />
                        ))}
                    </div>
                )}

                {/* View Full Gallery Action */}
                <div className="flex justify-center mt-24">
                    <button className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-gray-200 bg-transparent px-8 py-4 transition-all hover:border-black hover:bg-black">
                        <LayoutGrid className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" />
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-white uppercase tracking-widest transition-colors">
                            View Full Gallery
                        </span>
                        <Link
                            to="/availableCars"
                            className="bg-gray-100 p-1.5 rounded-full group-hover:bg-gray-800 transition-colors"
                        ><ArrowRight className="w-5 h-5" />
                        </Link>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RecentCars;