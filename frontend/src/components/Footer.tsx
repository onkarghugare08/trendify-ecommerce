import { FormEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "../Container";
import Button from "./Button";
import logo from "../assets/logo.png";

const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const showNewsletter = ["/", "/about", "/contact", "/collection"].includes(location.pathname);

  return (
    <footer className="mt-20 bg-stone-950 text-stone-200">
      {showNewsletter && (
        <div className="border-b border-white/10 bg-[#1e1e1e]">
          <Container className="py-14">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="eyebrow !text-stone-400">The Trendify Edit</p>
                <h2 className="prata-regular mt-3 text-3xl leading-tight text-white sm:text-4xl">Style notes, new drops & private offers.</h2>
                <p className="mt-3 text-sm leading-6 text-stone-400">Get the pieces worth bookmarking — delivered occasionally, never noisily.</p>
              </div>
              <form onSubmit={handleSubscribe} className="flex w-full max-w-xl gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white outline-none placeholder:text-stone-500 focus:border-white/40"
                  aria-label="Email address"
                  required
                />
                <Button buttonType="submit" size="medium" className="shrink-0 bg-white text-stone-950 hover:bg-stone-200">
                  {subscribed ? "Subscribed" : "Join"}
                </Button>
              </form>
            </div>
          </Container>
        </div>
      )}

      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_.7fr_.7fr]">
          <div>
            <Link to="/" className="inline-block">
              <img src={logo} alt="Trendify" className="h-9 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-400">Modern fashion essentials curated around quality, comfort and a little everyday drama. Trendify makes it easier to find your next favorite piece.</p>
          </div>
          <div>
            <p className="eyebrow !text-stone-500">Explore</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-stone-300">
              <Link to="/collection" className="hover:text-white">All collection</Link>
              <Link to="/about" className="hover:text-white">About Trendify</Link>
              <Link to="/contact" className="hover:text-white">Contact</Link>
              <Link to="/orders" className="hover:text-white">Track order</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow !text-stone-500">Contact</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-stone-300">
              <span>+11-558-669-447</span>
              <span>contact.trendify@info.com</span>
              <span>Los Angeles, USA</span>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Trendify. All rights reserved.</p>
          <p>Designed for a smoother, more premium shopping experience.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
