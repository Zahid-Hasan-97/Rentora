import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import auth from "../../Firebase/firebase.init";
import AuthContext from "./AuthContext";
import axiosSecure from "../../API/axiosSecure";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // Register

    const createUser = (email, password) => {

        setLoading(true);

        return createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    };

    // Login

    const signInUser = (email, password) => {

        setLoading(true);

        return signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    };

    // Google Login

    const signInWithGoogle = () => {

        setLoading(true);

        return signInWithPopup(
            auth,
            googleProvider
        );

    };

    // Logout

    const signOutUser = async () => {

        localStorage.removeItem("access-token");

        return signOut(auth);

    };

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(

            auth,

            async (currentUser) => {

                setUser(currentUser);

                if (currentUser?.email) {

                    try {

                        const res = await axiosSecure.post("/jwt", {
                            email: currentUser.email,
                        });

                        localStorage.setItem(
                            "access-token",
                            res.data.token
                        );

                    } catch (error) {

                        console.log(error);

                    }

                }

                setLoading(false);

            }

        );

        return () => unsubscribe();

    }, []);

    const authInfo = {

        user,

        loading,

        createUser,

        signInUser,

        signInWithGoogle,

        signOutUser,

    };

    return (

        <AuthContext.Provider value={authInfo}>

            {children}

        </AuthContext.Provider>

    );

};

export default AuthProvider;