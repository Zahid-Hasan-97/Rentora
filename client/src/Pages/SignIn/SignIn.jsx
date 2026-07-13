import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";

// Updated import paths to standard directory resolution
import axiosSecure from "../../API/axiosSecure";
import AuthContext from "../../Context/AuthContext/AuthContext";
import auth from "../../Firebase/firebase.init";

const SignIn = () => {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const emailRef = useRef();
    const [loginError, setLoginError] = useState("");
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            await axiosSecure.post("/jwt", { email: result.user.email });
            toast.success("Login Successful");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setLoginError("");

        try {
            await signInUser(email, password);
            await axiosSecure.post("/jwt", { email });
            toast.success("Login Successful");
            e.target.reset();
            navigate(from, { replace: true });
        } catch (error) {
            setLoginError(error.message);
        }
    };

    const handleForgetPassword = async () => {
        const email = emailRef.current.value;
        if (!email) return toast.error("Please enter your email first.");
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent.");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-[#0a0a0a] border border-[#222] rounded-3xl p-8 shadow-2xl">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-500 text-sm">Please sign in to continue your journey</p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-gray-600 w-4 h-4" />
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="w-full bg-[#111] border border-[#222] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white transition-all"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-gray-600 w-4 h-4" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full bg-[#111] border border-[#222] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white transition-all"
                            required
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleForgetPassword}
                        className="text-gray-500 text-xs hover:text-white transition-colors"
                    >
                        Forgot Password?
                    </button>

                    {loginError && <p className="text-red-500 text-xs">{loginError}</p>}

                    <button className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all">
                        Login <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px bg-[#222] flex-1"></div>
                    <span className="text-gray-600 text-xs uppercase font-bold">OR</span>
                    <div className="h-px bg-[#222] flex-1"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full border border-[#222] text-gray-300 py-3 rounded-xl hover:bg-[#111] transition-all"
                >
                    Continue with Google
                </button>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-white font-bold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;