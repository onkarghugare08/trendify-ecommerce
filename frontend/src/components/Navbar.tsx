import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Container from "../Container";
import { useGlobalContext } from "../../GlobalContext";
import logo from "../assets/logo.png";
import cartIcon from "../assets/cart_icon.png";
import searchIcon from "../assets/search_icon.png";
import profileIcon from "../assets/profile_icon.png";
import menuIcon from "../assets/menu_icon.png";
import crossIcon from "../assets/cross_icon.png";

const links = [
  ["Home", "/"],
  ["Collection", "/collection"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook added to evaluate current pathing
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { setIsSearchBarOpen, cartItems } = useGlobalContext();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
      isActive ? "text-stone-950" : "text-stone-500 hover:text-stone-950"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 glass-nav">
      <div className="bg-stone-950 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white py-2">
        Free shipping on orders over \$75 · Easy 10-day returns
      </div>
      <Container>
        <div className="flex h-[76px] items-center justify-between gap-6">
          <Link to="/" className="shrink-0 focus-ring" onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="Trendify" className="h-9 w-auto object-contain" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {links.map(([label, path]) => {
              // Safely verify matching paths to handle the under-border layout dynamically
              const isActive = location.pathname === path;
              
              return (
                <NavLink key={path} to={path} className={navClass}>
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-[8px] left-0 h-0.5 w-full rounded-full bg-stone-950" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white transition hover:border-stone-900"
              aria-label="Open search"
              onClick={() => setIsSearchBarOpen(true)}
            >
              <img src={searchIcon} alt="" className="h-4 w-4" />
            </button>

            <Link
              to="/cart"
              className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white transition hover:border-stone-900"
              aria-label={`Cart with ${cartItems.length} items`}
            >
              <img src={cartIcon} alt="" className="h-[18px] w-[18px]" />
              {cartItems.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-950 px-1 text-[9px] font-bold text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <div className="relative hidden sm:block">
              <button
                type="button"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white transition hover:border-stone-900"
                aria-label="Account"
                aria-expanded={isUserMenuOpen}
                onClick={() => setIsUserMenuOpen((open) => !open)}
              >
                {user ? (
                  <span className="text-xs font-bold uppercase text-stone-900">{String(user.email).slice(0, 1)}</span>
                ) : (
                  <img src={profileIcon} alt="" className="h-[18px] w-[18px]" />
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-12 w-64 overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-2xl">
                  {user ? (
                    <>
                      <div className="rounded-xl bg-stone-50 p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">Signed in as</p>
                        <p className="mt-1 truncate text-sm font-medium text-stone-900">{user.email}</p>
                      </div>
                      <Link to="/orders" className="mt-2 block rounded-xl px-3 py-2.5 text-sm hover:bg-stone-50" onClick={() => setIsUserMenuOpen(false)}>
                        Orders
                      </Link>
                      <button type="button" className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-stone-500 hover:bg-stone-50 hover:text-stone-900" onClick={logoutUser}>
                        Log out
                      </button>
                    </>
                  ) : (
                    <Link to="/signup" className="block rounded-xl px-3 py-3 text-sm font-semibold hover:bg-stone-50" onClick={() => setIsUserMenuOpen(false)}>
                      Sign in / Create account
                    </Link>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-stone-950 md:hidden"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <img src={menuIcon} alt="" className="h-4 w-4 invert" />
            </button>
          </div>
        </div>
      </Container>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-stone-950/30 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
          <aside className="ml-auto flex h-full w-[min(88vw,380px)] flex-col bg-[#faf9f6] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-stone-200 pb-5">
              <img src={logo} alt="Trendify" className="h-8 w-auto" />
              <button type="button" className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-stone-200" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <img src={crossIcon} alt="" className="h-4 w-4" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-2">
              {links.map(([label, path]) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => `rounded-2xl px-4 py-4 text-sm font-semibold uppercase tracking-[0.15em] ${isActive ? "bg-stone-950 text-white" : "text-stone-600 hover:bg-stone-100"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto rounded-2xl bg-stone-100 p-5">
              <p className="eyebrow">Your account</p>
              <p className="mt-2 text-sm text-stone-600">{user?.email || "Sign in for faster checkout and order tracking."}</p>
              <div className="mt-4 flex gap-2">
                <Link to={user ? "/orders" : "/signup"} onClick={() => setIsMenuOpen(false)} className="rounded-full bg-stone-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white">
                  {user ? "View orders" : "Sign in"}
                </Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="rounded-full border border-stone-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em]">
                  Cart ({cartItems.length})
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;
