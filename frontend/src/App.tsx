import { FormEvent, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/ContactPage";
import CollectionsPage from "./pages/CollectionsPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Orders from "./pages/Orders";
import TrackOrderPage from "./pages/TrackOrderPage";
import Checkout from "./pages/Checkout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useGlobalContext } from "../GlobalContext";
import searchIcon from "./assets/search_icon.png";
import crossIcon from "./assets/cross_icon.png";

function SearchOverlay() {
  const navigate = useNavigate();
  const { isSearchBarOpen, setIsSearchBarOpen } = useGlobalContext();
  const [query, setQuery] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setIsSearchBarOpen(false);
    navigate(`/collection${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ""}`);
  };

  if (!isSearchBarOpen) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[70] bg-stone-950/40 p-3 backdrop-blur-sm sm:p-5">
      <form onSubmit={submit} className="mx-auto flex max-w-4xl items-center gap-3 rounded-[1.5rem] bg-[#fffdf9] p-3 shadow-2xl">
        <img src={searchIcon} alt="" className="ml-3 h-5 w-5" />
        <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the Trendify collection..." className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm outline-none" />
        <button type="button" onClick={() => setIsSearchBarOpen(false)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 hover:border-stone-900" aria-label="Close search"><img src={crossIcon} alt="" className="h-4 w-4" /></button>
      </form>
    </div>
  );
}

function App() {
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [location.pathname]);

  return <div className="page-shell"><Navbar /><SearchOverlay /><ToastContainer position="top-right" autoClose={3000} /><Routes>
    <Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/collection" element={<CollectionsPage />} /><Route path="/signup" element={<SignUpPage />} /><Route path="/product/:_id" element={<ProductPage />} /><Route path="/cart" element={<CartPage />} /><Route path="/checkout" element={<Checkout />} /><Route path="/orders" element={<Orders />} /><Route path="/trackorder/:_id" element={<TrackOrderPage />} /><Route path="/forgot-password" element={<ForgotPassword />} /><Route path="/reset-password/:token" element={<ResetPassword />} />
  </Routes><Footer /></div>;
}

export default App;
