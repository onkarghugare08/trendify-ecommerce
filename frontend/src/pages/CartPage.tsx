import Container from "../Container";
import CartTotal from "../components/CartTotal";
import { useGlobalContext } from "../../GlobalContext";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, setCartItems } = useGlobalContext();

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((items) => items.map((item) => item._id === id && item.size === size ? { ...item, quantity } : item));
  };

  const removeItem = (id: string, size: string) => {
    setCartItems((items) => items.filter((item) => !(item._id === id && item.size === size)));
    toast.success("Item removed from cart.");
  };

  return (
    <main className="pb-10">
      <Container>
        <section className="border-b border-stone-200 py-10">
          <p className="eyebrow">Your bag</p>
          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><h1 className="prata-regular text-4xl sm:text-5xl">Shopping cart</h1><p className="text-sm text-stone-500">{cartItems.length} {cartItems.length === 1 ? "item" : "items"}</p></div>
        </section>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-3xl">✦</div>
            <h2 className="prata-regular mt-6 text-3xl">Your cart is waiting.</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500">Browse the collection and save the pieces you can see yourself wearing.</p>
            <Link to="/collection" className="mt-7"><Button>Explore collection</Button></Link>
          </div>
        ) : (
          <div className="grid gap-10 py-10 lg:grid-cols-[1fr_440px] lg:items-start">
            <div className="space-y-3">
              {cartItems.map((item) => (
                <article key={`${item._id}-${item.size}`} className="soft-card rounded-[1.5rem] p-4 sm:p-5">
                  <div className="grid grid-cols-[88px_1fr] gap-4 sm:grid-cols-[112px_1fr_auto] sm:gap-6">
                    <Link to={`/product/${item._id}`} className="overflow-hidden rounded-2xl bg-stone-100"><img src={item.images[0]} alt={item.name} className="aspect-[4/5] w-full object-cover" /></Link>
                    <div className="flex min-w-0 flex-col justify-between">
                      <div><p className="eyebrow">{item.subCategory}</p><h2 className="mt-1 text-base font-semibold sm:text-lg">{item.name}</h2><div className="mt-2 flex flex-wrap gap-2 text-xs text-stone-500"><span className="rounded-full bg-stone-100 px-3 py-1">Size {item.size}</span><span className="rounded-full bg-stone-100 px-3 py-1">${item.price.toFixed(2)}</span></div></div>
                      <div className="mt-5 flex items-center justify-between gap-4 sm:mt-8">
                        <div className="flex items-center rounded-full border border-stone-200 bg-stone-50"><button type="button" className="h-9 w-9 text-stone-500 hover:text-stone-950" onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}>-</button><span className="w-7 text-center text-sm font-semibold">{item.quantity}</span><button type="button" className="h-9 w-9 text-stone-500 hover:text-stone-950" onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}>+</button></div>
                        <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <button type="button" className="hidden self-start rounded-full border border-stone-200 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-stone-500 hover:border-stone-950 hover:text-stone-950 sm:block" onClick={() => removeItem(item._id, item.size)}>Remove</button>
                  </div>
                  <button type="button" className="mt-4 text-xs font-semibold text-stone-500 underline underline-offset-4 sm:hidden" onClick={() => removeItem(item._id, item.size)}>Remove item</button>
                </article>
              ))}
            </div>
            <CartTotal />
          </div>
        )}
      </Container>
    </main>
  );
};

export default CartPage;
