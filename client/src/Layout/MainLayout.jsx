import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#111111]">

            <div className="max-w-screen-2xl mx-auto flex flex-col min-h-screen">

                <Navbar />

                <main className="flex-1 pt-24">
                    <Outlet />
                </main>

                <Footer />

            </div>

        </div>
    );
};

export default MainLayout;