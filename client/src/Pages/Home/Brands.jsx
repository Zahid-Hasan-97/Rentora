import React from "react";

const BRANDS = [
    { name: "Honda", logo: "https://i.ibb.co/4wmFtYzf/Honda.png" },
    { name: "Mazda", logo: "https://i.ibb.co/YBvVF4Pn/Mazda.png" },
    { name: "Toyota", logo: "https://i.ibb.co/7tMnpbX6/Toyota.png" },
    { name: "Range Rover", logo: "https://i.ibb.co/hFq45m9j/Range-Rover.png" },
    { name: "Land Rover", logo: "https://i.ibb.co/ycMtQCHh/Land-Rover.png" },
    { name: "BYD", logo: "https://i.ibb.co/8LHv2s4w/Byd.png" },
    { name: "Jaguar", logo: "https://i.ibb.co/NdPL5QPh/Jaguar.png" },
    { name: "Audi", logo: "https://i.ibb.co/fKMkkGH/Audi.png" },
    { name: "Ferrari", logo: "https://i.ibb.co/LdFBKDGd/Ferarri.png" },
    { name: "Volkswagen", logo: "https://i.ibb.co/bjPXwMmP/Volkswagon.png" },
    { name: "Porsche", logo: "https://i.ibb.co/67YkYgHX/Porche.png" },
    { name: "Mercedes-Benz", logo: "https://i.ibb.co/vvxN9nhd/Mercedez.png" },
    { name: "BMW", logo: "https://i.ibb.co/b5bVHPgY/BMW.png" },
];

const Brands = () => {
    return (
        <section className="py-12 bg-[#111111] border-y border-white/5 relative overflow-hidden flex flex-col items-center justify-center">

            <p className="text-center text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase mb-8">
                Trusted by the world's most prestigious marques
            </p>

            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

            {/* Marquee */}
            <div className="flex overflow-hidden w-full group">

                <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">

                    {[...BRANDS, ...BRANDS].map((brand, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center mx-12 md:mx-20 shrink-0"
                        >
                            <div className="w-50 h-12 flex items-center justify-center">
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    loading="lazy"
                                    draggable={false}
                                    className="max-w-full max-h-full object-contain"
                                    onLoad={() => console.log("Loaded:", brand.name)}
                                    onError={() => console.log("Error:", brand.name)}
                                />
                            </div>
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
};

export default Brands;