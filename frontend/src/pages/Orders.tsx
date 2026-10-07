import Container from "../Container";
import { useGlobalContext } from "../../GlobalContext";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Orders = () => {
  const { cartItems } = useGlobalContext();

  return (
    <main className="pb-12"><Container><section className="border-b border-stone-200 py-10"><p className="eyebrow">Your account</p><h1 className="prata-regular mt-3 text-4xl sm:text-5xl">Orders & tracking</h1><p className="mt-3 text-sm text-stone-500">A simple view of the orders currently stored in this demo account.</p></section>{cartItems.length === 0 ? <div className="py-24 text-center"><p className="prata-regular text-3xl">No orders yet.</p><p className="mt-2 text-sm text-stone-500">Your completed orders will appear here.</p><Link to="/collection" className="mt-6 inline-block"><Button>Start shopping</Button></Link></div> : <div className="space-y-3 py-10">{cartItems.map((item) => <article key={`${item._id}-${item.size}`} className="soft-card rounded-[1.5rem] p-5 sm:p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-4"><img src={item.images[0]} alt={item.name} className="h-24 w-20 rounded-2xl object-cover" /><div><p className="eyebrow">Ready for shipping</p><h2 className="mt-1 text-base font-semibold">{item.name}</h2><p className="mt-2 text-sm text-stone-500">Size {item.size} · Quantity {item.quantity} · ${item.price.toFixed(2)}</p><p className="mt-1 text-xs text-stone-400">Placed {new Date(item.createdAt).toLocaleDateString()}</p></div></div><Link to={`/trackorder/${item._id}`}><Button type="transparent" size="small">Track order</Button></Link></div></article>)}</div>}</Container></main>
  );
};

export default Orders;
