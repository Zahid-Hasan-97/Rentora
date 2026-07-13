import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { User, Mail, Image as ImageIcon, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

// Import paths adjusted for standard structure
import axiosSecure from "../../api/axiosSecure";
import AuthContext from "../../context/AuthContext/AuthContext";

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        setErrorMessage("");

        if (password.length < 6) {
            return setErrorMessage("Password must be at least 6 characters long.");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return setErrorMessage("Password must contain uppercase, lowercase, number and special character.");
        }

        try {
            const result = await createUser(email, password);
            await updateProfile(result.user, { displayName: name, photoURL: photo });
            await axiosSecure.post("/jwt", { email: result.user.email });

            toast.success("Registration Successful");
            form.reset();
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-[#0a0a0a] border border-[#222] rounded-3xl p-8 shadow-2xl">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-gray-500 text-sm">Join us and start your journey</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    {[
                        { name: "name", type: "text", placeholder: "Full Name", icon: User },
                        { name: "email", type: "email", placeholder: "Email address", icon: Mail },
                        { name: "photo", type: "text", placeholder: "Photo URL", icon: ImageIcon },
                    ].map((field) => (
                        <div key={field.name} className="relative">
                            <field.icon className="absolute left-3 top-3.5 text-gray-600 w-4 h-4" />
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                className="w-full bg-[#111] border border-[#222] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white transition-all"
                                required
                            />
                        </div>
                    ))}

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-gray-600 w-4 h-4" />
                        <input
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="w-full bg-[#111] border border-[#222] text-white rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:border-white transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-3.5 text-gray-600 hover:text-white"
                        >
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}

                    <button className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all">
                        Register <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-white font-bold hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;