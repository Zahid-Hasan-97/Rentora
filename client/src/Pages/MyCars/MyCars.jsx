import React, { useEffect, useState } from "react";
import { Trash2, Edit3, Clock, MapPin, DollarSign, CheckCircle2, XCircle } from "lucide-react";

// Import gulo ke external hishebe consider kora hoyeche jate bundler error na dey
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import axiosSecure from "../../API/axiosSecure";

const MyCars = () => {
    const { user } = useAuth();
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [showModifyModal, setShowModifyModal] = useState(false);

    useEffect(() => {
        if (!user?.email) return;
        const loadCars = async () => {
            try {
                const { data } = await axiosSecure.get(`/cars?email=${user.email}`);
                setCars(data);
            } catch (error) {
                console.error("Error loading cars:", error);
            }
        };
        loadCars();
    }, [user]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Delete this car?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            background: '#0a0a0a',
            color: '#fff',
            confirmButtonColor: '#dc2626',
        }).then(async (result) => {
            if (!result.isConfirmed) return;
            try {
                const { data } = await axiosSecure.delete(`/cars/${_id}`);
                if (data.deletedCount > 0) {
                    setCars((prev) => prev.filter((car) => car._id !== _id));
                    Swal.fire({ icon: 'success', title: "Deleted!", background: '#0a0a0a', color: '#fff' });
                }
            } catch (error) {
                Swal.fire({ icon: "error", title: "Delete Failed", background: '#0a0a0a', color: '#fff' });
            }
        });
    };

    const handleModify = (car) => {
        setSelectedCar(car);
        setShowModifyModal(true);
    };

    const handleModifySubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedCar = {
            model: form.model.value,
            price: Number(form.price.value),
            available: form.available.value === "true",
            registrationNumber: form.registrationNumber.value,
            features: form.features.value.split(",").map(item => item.trim()),
            description: form.description.value,
            image: form.image.value,
            location: form.location.value,
        };

        try {
            const { data } = await axiosSecure.put(`/cars/${selectedCar._id}`, updatedCar);
            if (data.modifiedCount > 0 || data.matchedCount > 0) {
                setCars((prev) => prev.map((car) => car._id === selectedCar._id ? { ...car, ...updatedCar } : car));
                setShowModifyModal(false);
                Swal.fire({ icon: "success", title: "Car Updated", timer: 1500, background: '#0a0a0a', color: '#fff' });
            } else {
                Swal.fire({ icon: "info", title: "No changes detected", background: '#0a0a0a', color: '#fff' });
            }
        } catch (error) {
            Swal.fire({ icon: "error", title: "Update Failed", background: '#0a0a0a', color: '#fff' });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#ededed] py-20 px-6 lg:px-12">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">My Cars</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <div key={car._id} className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl overflow-hidden hover:border-[#333] transition-all group">
                            <div className="h-48 overflow-hidden">
                                <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-medium">{car.model}</h3>
                                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold flex items-center gap-1 ${car.available ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}>
                                        {car.available ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                        {car.available ? "Available" : "Unavailable"}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm text-gray-400 mb-6">
                                    <p className="flex items-center gap-2"><DollarSign size={16} /> ${car.price}</p>
                                    <p className="flex items-center gap-2"><MapPin size={16} /> {car.location}</p>
                                    <p className="flex items-center gap-2"><Clock size={16} /> {new Date(car.posted || Date.now()).toLocaleDateString()}</p>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button onClick={() => handleModify(car)} className="flex-1 py-2 border border-[#333] hover:bg-white hover:text-black rounded transition-all text-xs uppercase tracking-widest font-bold">Modify</button>
                                    <button onClick={() => handleDelete(car._id)} className="flex-1 py-2 border border-[#333] hover:border-red-500/50 hover:text-red-400 rounded transition-all text-xs uppercase tracking-widest font-bold">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModifyModal && selectedCar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-[#222] p-8 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-light mb-6">Update Details</h3>
                        <form onSubmit={handleModifySubmit} className="space-y-4">
                            <input name="model" defaultValue={selectedCar.model} className="w-full bg-[#111] p-3 border border-[#333] rounded outline-none" required placeholder="Model" />
                            <input name="price" type="number" defaultValue={selectedCar.price} className="w-full bg-[#111] p-3 border border-[#333] rounded outline-none" required placeholder="Price" />
                            <input name="registrationNumber" defaultValue={selectedCar.registrationNumber} className="w-full bg-[#111] p-3 border border-[#333] rounded outline-none" placeholder="Registration Number" />
                            <input name="features" defaultValue={selectedCar.features?.join(", ")} className="w-full bg-[#111] p-3 border border-[#333] rounded outline-none" placeholder="Features (comma separated)" />
                            <input name="image" defaultValue={selectedCar.image} className="w-full bg-[#111] p-3 border border-[#333] rounded outline-none" placeholder="Image URL" />
                            <input name="location" defaultValue={selectedCar.location} className="w-full bg-[#111] p-3 border border-[#333] rounded outline-none" placeholder="Location" />
                            <select name="available" defaultValue={String(selectedCar.available)} className="w-full bg-[#111] p-3 border border-[#333] rounded outline-none">
                                <option value="true">Available</option>
                                <option value="false">Unavailable</option>
                            </select>
                            <textarea name="description" defaultValue={selectedCar.description} className="w-full bg-[#111] p-3 border border-[#333] rounded outline-none" placeholder="Description" />
                            <div className="flex gap-4 mt-6">
                                <button type="button" onClick={() => setShowModifyModal(false)} className="flex-1 py-3 border border-[#333] rounded uppercase text-[10px] tracking-widest font-bold">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-white text-black rounded uppercase text-[10px] tracking-widest font-bold">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCars;