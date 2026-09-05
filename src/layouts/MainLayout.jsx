import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import ToastContainer from "../components/ToastContainer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-25">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-2 focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 animate-fadeIn pb-6">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <ToastContainer />
    </div>
  );
}
