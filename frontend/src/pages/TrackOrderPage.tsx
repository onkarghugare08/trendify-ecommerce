import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../Container";
import { CartItem, useGlobalContext } from "../../GlobalContext";
import Button from "../components/Button";

const steps = ["Order created", "Order received", "Order arranged", "Despatched", "Delivered"];

const TrackOrderPage = () => {
  const { cartItems } = useGlobalContext();
  const { _id } = useParams();
  const [order, setOrder] = useState<CartItem | null>(null);

  useEffect(() => {
    setOrder(cartItems.find((item) => item._id === _id) ?? null);
  }, [_id, cartItems]);

  const deliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "2-digit" }).toUpperCase();
  }, []);

  if (!order) return <Container className="py-24"><div className="rounded-3xl border border-stone-200 bg-white p-12 text-center"><p className="prata-regular text-3xl">Order not found</p><Link to="/orders" className="mt-6 inline-block"><Button>Back to orders</Button></Link></div></Container>;

  return <main className="pb-12"><Container><section className="border-b border-stone-200 py-10"><p className="eyebrow">Order tracking</p><h1 className="prata-regular mt-3 text-4xl sm:text-5xl">On the way.</h1><p className="mt-3 text-sm text-stone-500">Estimated delivery · {deliveryDate}</p></section>
    <div className="grid gap-6 py-10 lg:grid-cols-[1fr_420px]">
      <section className="soft-card rounded-[2rem] p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><div><p className="eyebrow">Delivery progress</p><h2 className="prata-regular mt-2 text-2xl">Your order is moving</h2></div><span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">Ready for shipping</span></div><div className="mt-10 relative"><div className="absolute left-4 right-4 top-4 h-1 rounded-full bg-stone-200"/><div className="absolute left-4 right-[25%] top-4 h-1 rounded-full bg-stone-950"/><div className="relative grid grid-cols-5 gap-2">{steps.map((step, index) => <div key={step} className="text-center"><span className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full border-4 border-white ${index < 4 ? "bg-stone-950" : "bg-stone-200"}`}><span className="h-1.5 w-1.5 rounded-full bg-white"/></span><p className="mt-3 text-[10px] font-semibold uppercase leading-4 tracking-[0.05em] text-stone-500">{step}</p></div>)}</div></div><div className="mt-12 rounded-2xl bg-stone-50 p-5 text-sm text-stone-600"><p className="eyebrow">Shipping history</p><p className="mt-2">{new Date(order.createdAt).toLocaleString()} · Order created</p><p className="mt-2 text-xs text-stone-400">Carrier events will appear here as the order progresses.</p></div></section>
      <aside className="soft-card rounded-[2rem] p-6 sm:p-8"><p className="eyebrow">Order details</p><div className="mt-5 flex gap-4"><img src={order.images[0]} alt={order.name} className="h-28 w-24 rounded-2xl object-cover"/><div className="min-w-0"><h2 className="text-base font-semibold">{order.name}</h2><p className="mt-2 text-sm text-stone-500">Size {order.size} · Qty {order.quantity}</p><p className="mt-3 text-lg font-semibold">\${(order.price * order.quantity).toFixed(2)}</p></div></div><div className="mt-6 border-t border-stone-200 pt-5 text-sm text-stone-500"><p>Estimated delivery</p><p className="mt-1 font-semibold text-stone-900">{deliveryDate}</p></div><Link to="/orders" className="mt-6 block"><Button type="transparent" className="w-full">Back to orders</Button></Link></aside>
    </div></Container></main>;
};

export default TrackOrderPage;
