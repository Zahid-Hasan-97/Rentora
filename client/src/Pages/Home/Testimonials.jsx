import { useEffect, useState, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {

    const sectionRef = useRef(null);

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios
            .get(`${import.meta.env.VITE_API_URL}/reviews?limit=3`)
            .then((res) => {
                console.log("Reviews Response:", res.data);

                const reviewsData = res.data?.data || [];

                setReviews(reviewsData);
            })
            .catch(console.log)
            .finally(() => setLoading(false));

    }, []);

    useEffect(() => {

        if (!reviews.length) return;

        const ctx = gsap.context(() => {

            gsap.from(".testimonial-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 60,
                opacity: 0,
                stagger: .2,
                duration: 1,
                ease: "power4.out",
            });

        }, sectionRef);

        return () => ctx.revert();

    }, [reviews]);

    if (loading) {

        return (
            <section className="py-32">
                <div className="text-center">
                    Loading Reviews...
                </div>
            </section>
        );

    }
    console.log("Reviews State:", reviews);

    return (

        <section
            ref={sectionRef}
            className="py-32 bg-[var(--bg-base)]"
        >

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-5xl text-center mb-20 font-['Clash_Display']">
                    Voices of Excellence.
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    {Array.isArray(reviews) &&
                        reviews.map((review) => (

                        <div
                            key={review._id}
                            className="testimonial-card glass-2 rounded-3xl p-8"
                        >

                            <Quote
                                size={42}
                                className="opacity-20 mb-6 text-[var(--accent-secondary)]"
                            />

                            <p className="mb-8">
                                {review.review}
                            </p>

                            <div className="flex gap-1 mb-6">

                                {[...Array(review.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill="#FACC15"
                                        color="#FACC15"
                                    />
                                ))}

                            </div>

                            <div className="flex items-center gap-4">

                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />

                                <div>

                                    <h3 className="font-semibold">
                                        {review.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {review.role}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

};

export default Testimonials;