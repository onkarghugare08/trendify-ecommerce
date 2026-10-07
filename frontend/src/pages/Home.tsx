import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useGlobalContext } from "../../GlobalContext";
import heroImg from "../assets/hero_img.png";
import exchangeIcon from "../assets/exchange_icon.png";
import qualityIcon from "../assets/quality_icon.png";
import supportIcon from "../assets/support_img.png";

const Home = () => {
  const { products, setIsUserDetailOpen, loading } = useGlobalContext();

  useEffect(() => {
    setIsUserDetailOpen(false);
  }, [setIsUserDetailOpen]);

  const latest = products.slice(0, 8);
  const bestSellers = products.filter((product) => product.bestSeller).slice(0, 8);

  return (
    <main>
      <Container>
        <section className="relative overflow-hidden rounded-[2rem] bg-[#e9ded2] reveal">
          <div className="grid min-h-[560px] lg:grid-cols-2">
            <div className="flex items-center p-8 sm:p-12 lg:p-16 xl:p-20">
              <div className="max-w-xl">
                <p className="eyebrow">New season · 2026</p>
                <h1 className="prata-regular mt-5 text-5xl leading-[1.02] tracking-[-0.03em] text-stone-950 sm:text-6xl lg:text-7xl">Quiet luxury.<br />Everyday confidence.</h1>
                <p className="mt-6 max-w-md text-sm leading-7 text-stone-600 sm:text-base">Discover refined essentials designed to fit effortlessly into the way you actually live.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/collection"><span className="inline-flex rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-stone-800">Shop new arrivals</span></Link>
                  <Link to="/collection" className="inline-flex items-center rounded-full border border-stone-400 bg-white/50 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-stone-900 hover:bg-white">Explore collection</Link>
                </div>
                <div className="mt-10 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  <span>Premium feel</span><span>Easy returns</span><span>Secure checkout</span>
                </div>
              </div>
            </div>
            <div className="min-h-[360px] overflow-hidden lg:min-h-0">
              <img src={heroImg} alt="Trendify new season" className="h-full w-full object-cover object-center" />
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="flex flex-col gap-4 text-center">
            <Title text1="Curated" text2="for you" />
            <h2 className="prata-regular text-3xl tracking-[-0.02em] sm:text-4xl">The latest pieces worth making room for.</h2>
            <p className="mx-auto max-w-2xl text-sm leading-6 text-stone-500">A tighter edit of fashion essentials across men, women and kids — updated with the pieces our shoppers are looking for now.</p>
          </div>
          <div className="mt-10">
            {loading ? <LoadingSpinner /> : latest.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">{latest.map((product) => <ProductCard key={product._id} product={product} />)}</div> : <p className="py-20 text-center text-stone-500">Products are loading right now. Please refresh in a moment.</p>}
          </div>
        </section>
      </Container>

      <section className="bg-stone-950 text-white">
        <Container className="section-space">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow !text-stone-500">Shop by mood</p>
              <h2 className="prata-regular mt-3 text-3xl sm:text-4xl">Build a wardrobe that feels like you.</h2>
            </div>
            <Link to="/collection" className="text-xs font-bold uppercase tracking-[0.16em] text-stone-300 hover:text-white">View all pieces →</Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Women", "Men", "Kids", "Winterwear"].map((category) => (
              <Link key={category} to="/collection" className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.08]">
                <span className="text-xs uppercase tracking-[0.15em] text-stone-500">Collection</span>
                <h3 className="prata-regular mt-12 text-2xl text-white">{category}</h3>
                <p className="mt-2 text-sm text-stone-500">Shop the edit</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <section className="section-space">
          <div className="flex flex-col items-center text-center">
            <Title text1="Most" text2="loved" />
            <h2 className="prata-regular text-3xl sm:text-4xl">Bestsellers, without the guesswork.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">Customer favorites chosen for repeat wear, easy styling and the kind of quality that gets better with time.</p>
          </div>
          <div className="mt-10">
            {loading ? <LoadingSpinner /> : bestSellers.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">{bestSellers.map((product) => <ProductCard key={product._id} product={product} />)}</div> : <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center text-stone-500">Our bestseller edit is being refreshed.</div>}
          </div>
        </section>

        <section className="mb-20 grid gap-4 md:grid-cols-3">
          {[
            [exchangeIcon, "Easy returns", "10-day returns and exchanges, kept simple."],
            [qualityIcon, "Quality first", "Thoughtfully selected products you can rely on."],
            [supportIcon, "Human support", "Reach us by email, phone or chat when you need us."],
          ].map(([icon, title, description]) => (
            <div key={String(title)} className="rounded-[1.5rem] border border-stone-200 bg-white p-7">
              <img src={String(icon)} alt="" className="h-11 w-11 object-contain" />
              <h3 className="mt-5 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-500">{description}</p>
            </div>
          ))}
        </section>
      </Container>
    </main>
  );
};

export default Home;
