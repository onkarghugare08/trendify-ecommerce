import { Link } from "react-router-dom";
import { shippingFee } from "./constants";
import { useGlobalContext } from "../../GlobalContext";
import Button from "./Button";

const CartTotal = () => {
  const { subTotal, cartItems } = useGlobalContext();
  const total = subTotal ? subTotal + shippingFee : 0;

  return (
    <aside className="soft-card w-full rounded-[1.5rem] p-6 sm:p-8 lg:max-w-[440px]">
      <p className="eyebrow">Order summary</p>
      <h2 className="prata-regular mt-2 text-2xl">Cart total</h2>
      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between text-stone-500"><span>Subtotal</span><span className="font-semibold text-stone-900">${subTotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-stone-500"><span>Shipping</span><span className="font-semibold text-stone-900">${shippingFee.toFixed(2)}</span></div>
        <div className="border-t border-stone-200 pt-4"><div className="flex justify-between text-base font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div></div>
      </div>
      <Link to={cartItems.length ? "/checkout" : "/collection"} className="mt-6 block">
        <Button size="large" className="w-full">{cartItems.length ? "Proceed to checkout" : "Continue shopping"}</Button>
      </Link>
      <p className="mt-4 text-center text-xs leading-5 text-stone-400">Taxes are calculated at checkout. Free shipping on qualifying orders.</p>
    </aside>
  );
};

export default CartTotal;
