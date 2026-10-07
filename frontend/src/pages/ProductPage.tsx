import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Container from "../Container";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import star from "../assets/star_icon.png";
import dullStar from "../assets/star_dull_icon.png";
import { Products, useGlobalContext } from "../../GlobalContext";

const ProductPage = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState<Products | null>(null);
  const [mainImage, setMainImage] = useState<string>();
  const [selectedSize, setSelectedSize] = useState("");
  const [fetching, setFetching] = useState(true);
  const { cartItems, setCartItems, products } = useGlobalContext();

  useEffect(() => {
    let active = true;
    setFetching(true);
    axios
      .get(`https://mern-ecommerce-ngdf.onrender.com/products/${_id}`)
      .then((res) => {
        if (!active) return;
        const result = res.data.product ?? res.data;
        setProduct(result);
        setMainImage(result?.images?.[0]);
      })
      .catch(() => toast.error("We couldn't load this product right now."))
      .finally(() => active && setFetching(false));

    return () => { active = false; };
  }, [_id]);

  const addToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      toast.warning("Please select a size first.");
      return;
    }

    const existing = cartItems.find((item) => item._id === product._id && item.size === selectedSize);
    if (existing) {
      setCartItems((current) => current.map((item) => item._id === product._id && item.size === selectedSize ? { ...item, quantity: item.quantity + 1 } : item));
      toast.info("Quantity updated in your cart.");
      return;
    }

    setCartItems((current) => [...current, { ...product, size: selectedSize, quantity: 1, createdAt: new Date().toISOString() }]);
    toast.success("Added to your cart.");
  };

  const related = products.filter((item) => item.category === product?.category && item._id !== product?._id).slice(0, 4);

  if (fetching) return <Container className="py-20"><LoadingSpinner /></Container>;
  if (!product) return <Container className="py-24"><div className="rounded-3xl border border-stone-200 bg-white p-12 text-center"><p className="prata-regular text-3xl">Product not found</p><Link to="/collection" className="mt-5 inline-flex rounded-full bg-stone-950 px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white">Back to collection</Link></div></Container>;

  return (
    <main className="pb-16">
      <Container>
        <div className="pt-8 text-xs font-semibold uppercase tracking-[0.14em] text-stone-400"><Link to="/collection" className="hover:text-stone-900">Collection</Link><span className="mx-2">/</span>{product.subCategory}</div>

        <section className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
            <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
              {product.images.slice(0, 4).map((image, index) => (
                <button type="button" key={`${image}-${index}`} onClick={() => setMainImage(image)} className={`overflow-hidden rounded-xl border bg-white ${mainImage === image ? "border-stone-950" : "border-stone-200"}`}>
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="aspect-[4/5] w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="product-image-wrap order-1 aspect-[4/5] rounded-[2rem] sm:order-2">
              <img src={mainImage || product.images[0]} alt={product.name} className="h-full w-full object-cover" />
              {product.bestSeller && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em]">Bestseller</span>}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="eyebrow">{product.category} · {product.subCategory}</p>
            <h1 className="prata-regular mt-4 text-4xl leading-tight tracking-[-0.025em] sm:text-5xl">{product.name}</h1>
            <div className="mt-5 flex items-center gap-1">
              {[0, 1, 2, 3].map((item) => <img key={item} src={star} alt="" className="h-4 w-4" />)}
              <img src={dullStar} alt="" className="h-4 w-4" />
              <span className="ml-2 text-xs text-stone-500">4.2 · 122 reviews</span>
            </div>
            <p className="mt-7 text-2xl font-semibold text-stone-950">${product.price.toFixed(2)}</p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-500">{product.description}</p>

            <div className="mt-8 border-y border-stone-200 py-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold">Select size</p>
                <span className="text-xs text-stone-400">Choose before adding</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.sizes.map((size) => <button type="button" key={size} onClick={() => setSelectedSize(size)} className={`h-11 min-w-11 rounded-full border px-4 text-sm font-semibold transition ${selectedSize === size ? "border-stone-950 bg-stone-950 text-white" : "border-stone-200 bg-white hover:border-stone-500"}`}>{size}</button>)}
              </div>
            </div>

            <Button size="large" className="mt-6 w-full sm:w-auto" onClick={addToCart}>Add to cart</Button>
            <div className="mt-6 grid gap-3 text-xs leading-5 text-stone-500 sm:grid-cols-3">
              <div className="rounded-2xl bg-stone-50 p-4"><strong className="text-stone-900">Authentic</strong><br />Curated quality you can trust.</div>
              <div className="rounded-2xl bg-stone-50 p-4"><strong className="text-stone-900">COD</strong><br />Pay at your doorstep.</div>
              <div className="rounded-2xl bg-stone-50 p-4"><strong className="text-stone-900">10-day returns</strong><br />Simple exchanges and returns.</div>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-5">
            <div><p className="eyebrow">Product details</p><h2 className="prata-regular mt-2 text-2xl">Made for repeat wear.</h2></div>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">122 customer reviews</span>
          </div>
          <div className="grid gap-6 pt-6 text-sm leading-7 text-stone-500 md:grid-cols-2">
            <p>Elevate your everyday with a thoughtfully crafted Trendify piece. The design balances comfort, polish and versatility so it can move from relaxed days to dressed-up plans without feeling overworked.</p>
            <p>Pair it with the rest of your wardrobe, keep it in rotation and let the details do the work. Built to be one of those pieces you reach for again and again.</p>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between gap-4"><div><TitleLine /><h2 className="prata-regular mt-2 text-3xl">You may also like</h2></div><Link to="/collection" className="text-xs font-bold uppercase tracking-[0.13em] text-stone-500 hover:text-stone-950">Shop all →</Link></div>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-4">{related.map((item) => <ProductCard product={item} key={item._id} />)}</div>
          </section>
        )}
      </Container>
    </main>
  );
};

const TitleLine = () => <div className="flex items-center gap-3"><span className="eyebrow">Complete the look</span><span className="h-px w-10 bg-stone-900" /></div>;

export default ProductPage;
