import { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Container from "../Container";
import Button from "../components/Button";
import Input from "../components/Input";
import API from "../utils/Api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault(); setIsLoading(true);
    try { const res = await API.post("/api/users/forgot-password", { email }); setMessage(res.data.message); toast.success("Reset instructions sent."); }
    catch (error) { const text = error instanceof AxiosError ? error.response?.data?.message || "Something went wrong" : "Something went wrong"; setMessage(text); toast.error(text); }
    finally { setIsLoading(false); }
  };
  return <main className="py-20"><Container><div className="mx-auto max-w-xl rounded-[2rem] border border-stone-200 bg-white p-7 shadow-xl sm:p-12"><p className="eyebrow">Account recovery</p><h1 className="prata-regular mt-3 text-4xl">Forgot your password?</h1><p className="mt-3 text-sm leading-6 text-stone-500">Enter the email attached to your account and we'll send the next step.</p><form onSubmit={submitForm} className="mt-8 space-y-4"><Input htmlType="email" size="large" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required /><Button loading={isLoading} buttonType="submit" size="large" className="w-full">{isLoading ? "Sending" : "Send reset link"}</Button></form>{message && <p className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">{message}</p>}<Link to="/signup" className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 underline underline-offset-4">Back to sign in</Link></div></Container></main>;
};
export default ForgotPassword;
