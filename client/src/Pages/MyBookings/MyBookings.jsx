import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import axiosSecure from "../../API/axiosSecure";
import { Clock, Calendar } from "lucide-react";

const MyBookings = () => {
    const { user } = useAuth();

    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookingDate, setBookingDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);

    // Fetch Real Bookings
    useEffect(() => {
        if (!user?.email) return;

        const loadBookings = async () => {
            try {
                const { data } = await axiosSecure.get(
                    `/bookings?email=${user.email}`
                );
                setBookings(data);
            } catch (error) {
                console.log(error);
            }
        };

        loadBookings();
    }, [user]);

    const handleCancelBooking = (id) => {
        Swal.fire({
            title: "Cancel Booking?",
            text: "You cannot undo this action.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cancel",
            background: '#0a0a0a',
            color: '#fff',
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#333'
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                const { data } = await axiosSecure.patch(
                    `/bookings/${id}`,
                    {
                        status: "Canceled",
                    }
                );

                if (data.success || data.modifiedCount > 0 || data) {
                    setBookings((prev) =>
                        prev.map((booking) =>
                            booking._id === id
                                ? {
                                    ...booking,
                                    status: "Canceled",
                                }
                                : booking
                        )
                    );

                    Swal.fire({
                        icon: "success",
                        title: "Booking Cancelled Successfully",
                        timer: 1500,
                        showConfirmButton: false,
                        background: '#0a0a0a',
                        color: '#fff',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: error.response?.data?.message || "Failed to cancel booking",
                    background: '#0a0a0a',
                    color: '#fff',
                });
            }
        });
    };

    const handleUpdateBooking = async () => {
        try {
            const { data } = await axiosSecure.patch(
                `/bookings/${selectedBooking._id}`,
                {
                    bookingDate: bookingDate.toISOString(),
                }
            );

            if (data.success || data.modifiedCount > 0 || data) {
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking._id === selectedBooking._id
                            ? {
                                ...booking,
                                bookingDate: bookingDate.toISOString(),
                            }
                            : booking
                    )
                );

                Swal.fire({
                    icon: "success",
                    title: "Booking Updated Successfully",
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#0a0a0a',
                    color: '#fff',
                });

                setShowModal(false);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response?.data?.message || "Failed to update booking",
                background: '#0a0a0a',
                color: '#fff',
            });
        }
    };

    const handleDeleteBooking = async (id) => {
        const result = await Swal.fire({
            title: "Delete Booking?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            background: '#0a0a0a',
            color: '#fff',
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#333'
        });

        if (!result.isConfirmed) return;

        try {
            const { data } = await axiosSecure.delete(`/bookings/${id}`);

            if (data.success || data.deletedCount > 0 || data) {
                setBookings((prev) =>
                    prev.filter((booking) => booking._id !== id)
                );

                Swal.fire({
                    icon: "success",
                    title: "Booking Deleted",
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#0a0a0a',
                    color: '#fff',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response?.data?.message || "Failed to delete booking",
                background: '#0a0a0a',
                color: '#fff',
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#ededed] pt-32 pb-20 font-sans">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4 opacity-70">
                        <div className="h-[1px] w-12 bg-white"></div>
                        <span className="uppercase tracking-[0.2em] text-xs font-semibold text-gray-400">Client Portal</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 text-white font-['Clash_Display']">
                        My Bookings
                    </h2>
                    <p className="text-gray-400 text-sm max-w-2xl font-['Manrope']">
                        Review your upcoming journeys and past experiences. Manage modifications with ease.
                    </p>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#1f1f1f] bg-[#111] text-[10px] uppercase tracking-[0.2em] text-gray-500">
                                <th className="py-6 px-8 font-semibold">Car</th>
                                <th className="py-6 px-8 font-semibold">Model</th>
                                <th className="py-6 px-8 font-semibold">Date</th>
                                <th className="py-6 px-8 font-semibold">Price</th>
                                <th className="py-6 px-8 font-semibold">Status</th>
                                <th className="py-6 px-8 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-gray-600">
                                            <Clock size={32} />
                                            <p className="uppercase tracking-widest text-sm">No bookings found.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="border-b border-[#1f1f1f] hover:bg-[#111]/50 transition-colors group">

                                        <td className="py-6 px-8">
                                            <div className="w-24 h-16 bg-[#1a1a1a] overflow-hidden rounded-lg border border-[#222]">
                                                <img
                                                    src={booking.carImage || booking.image}
                                                    alt={booking.carModel || booking.model}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                        </td>

                                        <td className="py-6 px-8 font-semibold text-white tracking-wide text-lg font-['Clash_Display']">
                                            {booking.carModel || booking.model}
                                        </td>

                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-2 text-gray-300 font-['Manrope']">
                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                {new Date(booking.bookingDate).toLocaleDateString()}
                                            </div>
                                        </td>

                                        <td className="py-6 px-8 font-light text-2xl text-white font-['Clash_Display']">
                                            ${booking.price}
                                        </td>

                                        <td className="py-6 px-8">
                                            {booking.status === "Canceled" ? (
                                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-widest font-bold rounded-full">
                                                    Canceled
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-widest font-bold rounded-full">
                                                    {booking.status || 'Active'}
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-6 px-8">
                                            <div className="flex justify-end gap-3">
                                                {booking.status !== "Canceled" ? (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedBooking(booking);
                                                                setBookingDate(new Date(booking.bookingDate));
                                                                setShowModal(true);
                                                            }}
                                                            className="px-4 py-2 border border-[#333] text-gray-300 uppercase text-[10px] tracking-widest font-bold hover:bg-white hover:text-black hover:border-white transition-all duration-300 rounded"
                                                        >
                                                            Modify
                                                        </button>
                                                        <button
                                                            onClick={() => handleCancelBooking(booking._id)}
                                                            className="px-4 py-2 border border-[#333] text-gray-500 uppercase text-[10px] tracking-widest font-bold hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 rounded"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => handleDeleteBooking(booking._id)}
                                                        className="px-4 py-2 border border-[#333] text-gray-500 uppercase text-[10px] tracking-widest font-bold hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Custom Styled Modal for DatePicker */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <div className="bg-[#0a0a0a] border border-[#222] p-8 max-w-md w-full rounded-2xl shadow-2xl relative">

                            <h3 className="text-2xl font-light text-white tracking-tight mb-6 font-['Clash_Display']">
                                Modify Booking Date
                            </h3>

                            <div className="mb-8 custom-datepicker-wrapper">
                                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">
                                    Select New Date
                                </label>
                                <DatePicker
                                    selected={bookingDate}
                                    onChange={(date) => setBookingDate(date)}
                                    className="w-full bg-[#111] text-white border border-[#333] p-4 rounded-xl outline-none focus:border-white transition-colors font-mono text-sm"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 border border-[#333] text-gray-400 py-3 rounded-xl uppercase text-[10px] tracking-widest font-bold hover:bg-[#111] hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateBooking}
                                    className="flex-1 bg-white text-black py-3 rounded-xl uppercase text-[10px] tracking-widest font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Scoped CSS for fixing DatePicker background in dark mode */}
            <style jsx global>{`
                .custom-datepicker-wrapper .react-datepicker-wrapper {
                    width: 100%;
                }
                .react-datepicker {
                    background-color: #111 !important;
                    border: 1px solid #333 !important;
                    color: #fff !important;
                    font-family: 'Inter', sans-serif !important;
                }
                .react-datepicker__header {
                    background-color: #1a1a1a !important;
                    border-bottom: 1px solid #333 !important;
                }
                .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
                    color: #fff !important;
                }
                .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
                    color: #ccc !important;
                }
                .react-datepicker__day:hover, .react-datepicker__month-text:hover, .react-datepicker__quarter-text:hover, .react-datepicker__year-text:hover {
                    background-color: #333 !important;
                }
                .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range {
                    background-color: #2563EB !important;
                    color: #fff !important;
                }
            `}</style>
        </div>
    );
};

export default MyBookings;