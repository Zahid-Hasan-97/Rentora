import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, MapPin, DollarSign, Tag, CheckCircle2 } from "lucide-react";

// Import gulo ke external hishebe consider kora hoyeche
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import axiosSecure from "../../API/axiosSecure";

const AddCar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const features = [
        "GPS", "AC", "Bluetooth", "Leather Seats",
        "Sunroof", "Backup Camera", "Cruise Control", "Parking Sensors"
    ];

    const handleFeatureToggle = (feature) => {
        setSelectedFeatures(prev =>
            prev.includes(feature) ? prev.filter(i => i !== feature) : [...prev, feature]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const newCar = {
            model: form.model.value,
            brand: form.brand.value,
            price: Number(form.price.value),
            registrationNumber: form.registrationNumber.value,
            available: form.availability.value === "true",
            image: form.image.value,
            location: form.location.value,
            description: form.description.value,
            features: selectedFeatures,
            posted: new Date().toISOString(),
        };

        try {
            const { data } = await axiosSecure.post("/cars", newCar);
            if (data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Car Added Successfully",
                    background: '#0a0a0a',
                    color: '#fff',
                    confirmButtonColor: '#fff',
                });
                form.reset();
                setSelectedFeatures([]);
                navigate("/myCars");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to add car",
                text: error.response?.data?.message || "Something went wrong",
                background: '#0a0a0a',
                color: '#fff',
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#ededed] py-16 px-6">
            <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-[#1f1f1f] p-8 md:p-12 rounded-3xl">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-2">Add New Vehicle</h2>
                    <p className="text-gray-500 text-sm">Add vehicle details to your digital Cars.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Model</label>
                            <input name="model" className="w-full bg-[#111] p-3 border border-[#222] rounded focus:border-white outline-none transition-all" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Brand</label>
                            <input name="brand" className="w-full bg-[#111] p-3 border border-[#222] rounded focus:border-white outline-none transition-all" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Price per day</label>
                            <input type="number" name="price" className="w-full bg-[#111] p-3 border border-[#222] rounded focus:border-white outline-none transition-all" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Registration</label>
                            <input name="registrationNumber" className="w-full bg-[#111] p-3 border border-[#222] rounded focus:border-white outline-none transition-all" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Location</label>
                        <input name="location" className="w-full bg-[#111] p-3 border border-[#222] rounded focus:border-white outline-none transition-all" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Image URL</label>
                        <input name="image" className="w-full bg-[#111] p-3 border border-[#222] rounded focus:border-white outline-none transition-all" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Status</label>
                        <select name="availability" className="w-full bg-[#111] p-3 border border-[#222] rounded focus:border-white outline-none transition-all">
                            <option value="true">Available</option>
                            <option value="false">Unavailable</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Description</label>
                        <textarea name="description" rows="3" className="w-full bg-[#111] p-3 border border-[#222] rounded focus:border-white outline-none transition-all" />
                    </div>

                    <div className="space-y-4">
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Features</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {features.map((f) => (
                                <div key={f} onClick={() => handleFeatureToggle(f)}
                                    className={`cursor-pointer p-3 border rounded text-xs text-center transition-all ${selectedFeatures.includes(f) ? 'border-white bg-white text-black' : 'border-[#222] hover:border-[#444]'}`}>
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity">
                        Add Vehicle
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCar;