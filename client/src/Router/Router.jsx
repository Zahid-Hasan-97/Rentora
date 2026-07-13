import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";

import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import SignIn from "../Pages/SignIn/SignIn";
import AvailableCars from "../Pages/AvailableCars/AvailableCars";
import AddCar from "../Pages/AddCar/AddCar";
import MyCars from "../Pages/MyCars/MyCars";
import MyBookings from "../Pages/MyBookings/MyBookings";
import CarDetails from "../Pages/CarDetails/CarDetails";
import BookCar from "../Pages/BookCar/BookCar";

import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <h2>404 | Page Not Found</h2>,

        children: [
            {
                index: true,
                element: <Home />,
                loader: () =>
                    fetch(`${import.meta.env.VITE_API_URL}/cars`),
            },

            {
                path: "availableCars",
                element: <AvailableCars />,
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/cars`),
            },

            {
                path: "cars/:id",
                element: <CarDetails />,
                loader: ({ params }) =>
                    fetch(`${import.meta.env.VITE_API_URL}/cars/${params.id}`),
            },

            // ✅ Book Car Route
            {
                path: "bookCar/:id",
                element: (
                    <PrivateRoute>
                        <BookCar />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(`${import.meta.env.VITE_API_URL}/cars/${params.id}`),
            },

            {
                path: "addCar",
                element: (
                    <PrivateRoute>
                        <AddCar />
                    </PrivateRoute>
                ),
            },

            {
                path: "myCars",
                element: (
                    <PrivateRoute>
                        <MyCars />
                    </PrivateRoute>
                ),
            },

            {
                path: "myBookings",
                element: (
                    <PrivateRoute>
                        <MyBookings />
                    </PrivateRoute>
                ),
            },

            {
                path: "register",
                element: <Register />,
            },

            {
                path: "signin",
                element: <SignIn />,
            },
        ],
    },
]);

export default router;