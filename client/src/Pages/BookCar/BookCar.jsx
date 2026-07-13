import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Calendar, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import axiosSecure from "../../API/axiosSecure";

const BookCar = () => {
    const car = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleBooking = async (e) => {
        e.preventDefault();
        const form = e.target;

        // Owner can't book own car
        if (car.hr_email === user?.email) {
            Swal.fire({
                icon: "warning",
                title: "You can't book your own car.",
                background: '#0a0a0a',
                color: '#fff',
            });
            return;
        }

        // Car unavailable
        if (!car.available) {
            Swal.fire({
                icon: "error",
                title: "This car is currently unavailable.",
                background: '#0a0a0a',
                color: '#fff',
            });
            return;
        }

        const booking = {
            carId: car._id,
            carModel: car.model,
            carImage: car.image,
            price: car.price,
            bookingDate: form.bookingDate.value,
            status: "Confirmed",
            hr_email: user.email,
            createdAt: new Date(),
        };

        try {
            const { data } = await axiosSecure.post(
                "/bookings",
                booking
            );

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Booking Confirmed",
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#0a0a0a',
                    color: '#fff',
                });
                navigate("/myBookings");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Booking Failed",
                text: error.response?.data?.message || "Something went wrong.",
                background: '#0a0a0a',
                color: '#fff',
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-28 pb-20 px-6 font-sans text-[#ededed]">
            <div className="w-full max-w-5xl bg-[#0a0a0a] border border-[#1f1f1f] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">

                {/* Left Side: Image & Vehicle Identity */}
                <div className="lg:w-1/2 relative min-h-[350px] lg:min-h-full">
                    <img
                        src={car.image}
                        alt={car.model}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Cinematic Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                    <div className="absolute bottom-10 left-10 pr-10 z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-white/20 rounded-full bg-black/40 backdrop-blur-md">
                            <ShieldCheck className="text-white w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase tracking-widest text-white font-bold">
                                Verified Vehicle
                            </span>
                        </div>
                        <p className="text-xs uppercase tracking-[0.4em] text-gray-400 font-bold mb-2">
                            {car.brand}
                        </p>
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            {car.model}
                        </h2>
                    </div>
                </div>

                {/* Right Side: Booking Form & Pricing */}
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#0a0a0a]">

                    <div className="mb-10">
                        <h3 className="text-2xl font-light text-white mb-2 tracking-tight">Book Car</h3>
                        <p className="text-gray-500 text-sm font-light">Select your preferred date to finalize the reservation.</p>
                    </div>

                    {/* Pricing Highlight */}
                    <div className="mb-10 p-6 bg-[#111] border border-[#222] rounded-2xl flex justify-between items-center">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">Daily Rate</p>
                            <p className="text-3xl font-bold text-white flex items-end gap-1">
                                ${car.price} <span className="text-sm text-gray-500 font-light mb-1">/ Day</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">Status</p>
                            {car.available ? (
                                <span className="inline-flex items-center gap-1.5 text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-red-400 text-sm font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Unavailable
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Booking Form */}
                    <form onSubmit={handleBooking} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1">
                                Reservation Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="date"
                                    name="bookingDate"
                                    className="w-full bg-[#111] border border-[#333] text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-white transition-all font-mono text-sm shadow-inner [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 cursor-pointer"
                                    required
                                />
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            disabled={!car.available}
                            className="w-full group relative flex items-center justify-center gap-3 bg-white text-black py-5 rounded-xl uppercase text-xs tracking-[0.2em] font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                            {car.available ? (
                                <>
                                    <CreditCard className="w-4 h-4" />
                                    Confirm Booking
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            ) : (
                                "Currently Unavailable"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-[#555] text-xs mt-6 font-light">
                        No charges are applied until confirmation.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default BookCar;