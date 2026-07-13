import { ArrowRight, MapPin, Tag, CheckCircle2, XCircle } from "lucide-react";

const RecentCarsCard = ({ car }) => {
    // Since we are using standard routing/links, 
    // ensure your app has a <Link> handler or replace with standard <a> tag if needed
    const isAvailable = car.availability || car.available;

    return (
        <div className="group relative bg-white border border-gray-100 rounded-3xl p-2 transition-all duration-500 hover:shadow-2xl hover:border-gray-200">
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-2xl h-64">
                <img
                    src={car.image || "/placeholder.jpg"}
                    alt={car.model}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm">
                    {car.price > 1000 ? "Luxury" : car.brand}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-medium text-gray-950 mb-4">{car.model}</h3>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Tag className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-gray-900">${car.price}</span>
                        <span className="text-gray-400">/ per day</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{car.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        {isAvailable ? (
                            <span className="flex items-center gap-2 text-emerald-600 font-medium">
                                <CheckCircle2 className="w-4 h-4" /> Available Now
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 text-red-500 font-medium">
                                <XCircle className="w-4 h-4" /> Currently Rented
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <a
                    href={`/cars/${car._id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98]"
                >
                    Book Now
                    <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
};

export default RecentCarsCard;