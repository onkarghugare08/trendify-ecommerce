import { useState } from "react";
import Container from "../Container";
import Input from "../components/Input";
import PaymentMethods from "../components/PaymentMethods";
import { shippingFee } from "../components/constants";
import { useGlobalContext } from "../../GlobalContext";

interface DeliveryData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  mobile: string;
}

const fields: Array<keyof DeliveryData> = ["firstName", "lastName", "emailAddress", "street", "city", "state", "zipCode", "country", "mobile"];
const labels: Record<keyof DeliveryData, string> = {
  firstName: "First name",
  lastName: "Last name",
  emailAddress: "Email address",
  street: "Street address",
  city: "City",
  state: "State",
  zipCode: "ZIP code",
  country: "Country",
  mobile: "Mobile number",
};

const Checkout = () => {
  const { subTotal, cartItems } = useGlobalContext();
  const [formData, setFormData] = useState<DeliveryData>({ firstName: "", lastName: "", emailAddress: "", street: "", city: "", state: "", zipCode: "", country: "", mobile: "" });

  const setField = (field: keyof DeliveryData, value: string) => setFormData((current) => ({ ...current, [field]: value }));
  const total = subTotal + shippingFee;

  return (
    <main className="pb-12">
      <Container>
        <section className="border-b border-stone-200 py-10"><p className="eyebrow">Secure checkout</p><h1 className="prata-regular mt-3 text-4xl sm:text-5xl">Finish your order.</h1><p className="mt-3 text-sm text-stone-500">Your details stay focused here so checkout feels quick and calm.</p></section>
        {cartItems.length === 0 ? <div className="py-24 text-center text-sm text-stone-500">Your cart is empty. Add a product before checking out.</div> : <form className="grid gap-10 py-10 lg:grid-cols-[1fr_420px]" onSubmit={(e) => e.preventDefault()}>
          <section className="soft-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Step 01</p><h2 className="prata-regular mt-2 text-2xl">Delivery information</h2></div><span className="text-xs text-stone-400">All fields secure</span></div>
            <div className="mt-7 grid grid-cols-2 gap-4">
              {fields.map((field) => <Input key={field} htmlType={field === "emailAddress" ? "email" : "text"} size="medium" required={field === "firstName" || field === "emailAddress" || field === "street"} placeholder={labels[field]} value={formData[field]} onChange={(e) => setField(field, e.target.value)} wrapperClassName={field === "emailAddress" || field === "street" || field === "mobile" ? "col-span-2" : ""} />)}
            </div>
            <div className="mt-8 rounded-2xl bg-stone-50 p-4 text-xs leading-5 text-stone-500">By continuing, you agree to Trendify's delivery and returns terms. Orders are created from the cart items shown here.</div>
          </section>

          <aside className="space-y-4">
            <div className="soft-card rounded-[2rem] p-6 sm:p-7">
              <p className="eyebrow">Step 02</p><h2 className="prata-regular mt-2 text-2xl">Your order</h2>
              <div className="mt-6 space-y-4">{cartItems.map((item) => <div key={`${item._id}-${item.size}`} className="flex gap-3"><img src={item.images[0]} alt={item.name} className="h-16 w-14 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.name}</p><p className="mt-1 text-xs text-stone-500">Size {item.size} · Qty {item.quantity}</p></div><p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p></div>)}</div>
              <div className="mt-6 space-y-3 border-t border-stone-200 pt-5 text-sm"><div className="flex justify-between text-stone-500"><span>Subtotal</span><span>${subTotal.toFixed(2)}</span></div><div className="flex justify-between text-stone-500"><span>Shipping</span><span>${shippingFee.toFixed(2)}</span></div><div className="flex justify-between border-t border-stone-200 pt-3 font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div></div>
            </div>
            <div className="soft-card rounded-[2rem] p-6 sm:p-7"><PaymentMethods /></div>
          </aside>
        </form>}
      </Container>
    </main>
  );
};

export default Checkout;
