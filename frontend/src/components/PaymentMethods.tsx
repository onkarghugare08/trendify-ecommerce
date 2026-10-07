import { useState } from "react";
import stripeLogo from "../assets/stripe_logo.png";
import razorpay from "../assets/razorpay_logo.png";
import { Link } from "react-router-dom";
import Button from "./Button";

const PaymentMethods = () => {
  const [method, setMethod] = useState("cod");
  const methods = [
    { id: "stripe", label: "Stripe", image: stripeLogo },
    { id: "razorpay", label: "Razorpay", image: razorpay },
    { id: "cod", label: "Cash on delivery" },
  ];

  return (
    <div>
      <p className="eyebrow">Payment method</p>
      <div className="mt-4 grid gap-3">
        {methods.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setMethod(item.id)}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${method === item.id ? "border-stone-950 bg-stone-50" : "border-stone-200 bg-white hover:border-stone-400"}`}
          >
            <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${method === item.id ? "border-stone-950" : "border-stone-300"}`}>
              {method === item.id && <span className="h-2 w-2 rounded-full bg-stone-950" />}
            </span>
            {item.image ? <img src={item.image} alt={item.label} className="h-5 w-auto" /> : <span className="text-sm font-medium capitalize">{item.label}</span>}
          </button>
        ))}
      </div>
      <Link to="/orders" className="mt-5 block">
        <Button size="large" className="w-full">Place order</Button>
      </Link>
    </div>
  );
};

export default PaymentMethods;
