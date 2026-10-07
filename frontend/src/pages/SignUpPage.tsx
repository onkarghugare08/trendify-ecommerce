import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Container from "../Container";
import Button from "../components/Button";
import Input from "../components/Input";
import API from "../utils/Api";
import { useGlobalContext } from "../../GlobalContext";

interface FormData { name: string; email: string; password: string; }

const SignUpPage = () => {
  const { togglePassword, isPasswordHidden } = useGlobalContext();
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return toast.warning("Please fill all fields.");
    setIsLoading(true);
    try {
      const response = await API.post("/api/users/signup", formData);
      toast.success(response.data.message || "Account created. You can now sign in.");
      setFormData({ name: "", email: formData.email, password: "" });
      setIsLoginOpen(true);
    } catch (error) {
      toast.error(error instanceof AxiosError ? error.response?.data?.message || "Signup failed" : "Signup failed");
    } finally { setIsLoading(false); }
  };

  const submitLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return toast.warning("Please fill all fields.");
    setIsLoading(true);
    try {
      const { data } = await API.post("/api/users/login", { email: formData.email, password: formData.password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Welcome back.");
      navigate("/");
    } catch (error) {
      toast.error(error instanceof AxiosError ? error.response?.data?.message || "Login failed" : "Login failed");
    } finally { setIsLoading(false); }
  };

  return (
    <main className="py-12 sm:py-20"><Container><div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-xl lg:grid-cols-[.9fr_1.1fr]"><div className="hidden bg-stone-950 p-10 text-white lg:flex lg:flex-col lg:justify-between"><div><p className="eyebrow !text-stone-500">Welcome to Trendify</p><h1 className="prata-regular mt-5 text-5xl leading-tight">Good style starts with a better edit.</h1><p className="mt-5 max-w-sm text-sm leading-7 text-stone-400">Create an account to keep your details close, check orders faster and shop your favorites with less friction.</p></div><p className="text-xs uppercase tracking-[0.16em] text-stone-500">Curated essentials · thoughtful design</p></div><div className="p-6 sm:p-10 md:p-14"><div className="mb-8"><p className="eyebrow">{isLoginOpen ? "Returning customer" : "New here"}</p><h2 className="prata-regular mt-3 text-4xl">{isLoginOpen ? "Welcome back." : "Create your account."}</h2><p className="mt-2 text-sm text-stone-500">{isLoginOpen ? "Sign in to continue shopping." : "It takes less than a minute."}</p></div>
      <form onSubmit={isLoginOpen ? submitLoginForm : submitForm} className="flex flex-col gap-4">
        {!isLoginOpen && <Input htmlType="text" size="medium" placeholder="Full name" name="name" onChange={inputChange} value={formData.name} required />}
        <Input htmlType="email" size="medium" placeholder="Email address" name="email" onChange={inputChange} value={formData.email} required />
        <div className="relative"><Input htmlType={isPasswordHidden ? "password" : "text"} size="medium" placeholder="Password" name="password" onChange={inputChange} value={formData.password} required inputClassName="pr-12" /><button type="button" onClick={togglePassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.1em] text-stone-400">{isPasswordHidden ? "Show" : "Hide"}</button></div>
        <div className="flex flex-wrap justify-between gap-2 text-xs text-stone-500"><Link to="/forgot-password" className="underline underline-offset-4">Forgot password?</Link><button type="button" onClick={() => setIsLoginOpen((open) => !open)} className="font-semibold text-stone-900">{isLoginOpen ? "Create a new account" : "Already have an account? Sign in"}</button></div>
        <Button loading={isLoading} size="large" buttonType="submit" className="mt-2 w-full">{isLoginOpen ? "Sign in" : "Create account"}</Button>
      </form>
    </div></div></Container></main>
  );
};

export default SignUpPage;
