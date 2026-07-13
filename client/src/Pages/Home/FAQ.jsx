import React, { useState } from 'react';
import { Plus, MessageCircleQuestion } from 'lucide-react';

const FAQ_ITEMS = [
    {
        q: "How do I reserve a vehicle?",
        a: "To ensure a seamless experience, we require a valid license, proof of premium insurance, and a brief verification process through our secure portal."
    },
    {
        q: "Do you offer delivery to specific locations?",
        a: "Yes, we provide white-glove concierge delivery directly to your private estate, hotel, or private aviation terminal for absolute convenience."
    },
    {
        q: "What is your cancellation policy?",
        a: "Reservations can be modified or fully canceled without penalty up to 48 hours prior to your scheduled delivery time."
    },
    {
        q: "Are there mileage limitations?",
        a: "Most of our premium fleet includes a generous daily mileage allowance of 150 miles. Extended mileage packages can be arranged with your dedicated concierge."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">

                {/* Premium Header */}
                <div className="flex flex-col items-center text-center mb-16 gap-4">
                    <div className="flex items-center gap-2 text-blue-600 bg-blue-50/50 border border-blue-100 px-5 py-1.5 rounded-full">
                        <MessageCircleQuestion className="w-4 h-4" />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                            Common Questions
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-extralight text-gray-950 tracking-tighter">
                        Clarity in <span className="font-semibold italic text-gray-400">Every Detail</span>
                    </h2>
                </div>

                {/* Accordion List */}
                <div className="divide-y divide-gray-200 border-y border-gray-200">
                    {FAQ_ITEMS.map((item, idx) => {
                        const isOpen = openIndex === idx;

                        return (
                            <div key={idx} className="group">
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full py-6 flex justify-between items-center text-left transition-colors duration-300"
                                >
                                    <span className={`text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'}`}>
                                        {item.q}
                                    </span>

                                    <div className={`ml-4 p-2 rounded-full transition-colors duration-300 ${isOpen ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                                        <Plus
                                            className={`w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                                        />
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                                        }`}
                                >
                                    <p className="text-gray-500 font-light leading-relaxed pr-12">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default FAQ;