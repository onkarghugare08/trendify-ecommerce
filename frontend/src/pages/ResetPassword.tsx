import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../utils/Api";
import Container from "../Container";
import Button from "../components/Button";
import Input from "../components/Input";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return setMessage("This reset link is invalid.");
    if (password !== confirmPassword) return setMessage("Passwords do not match.");
    setLoading(true);
    try { const res = await API.post("/api/users/reset-password", { resetToken: token, newPassword: password }); setMessage(res.data.message || "Password updated successfully."); setTimeout(() => navigate("/signup"), 1500); }
    catch (error: any) { setMessage(error.response?.data?.message || "Something went wrong."); }
    finally { setLoading(false); }
  };

  return <main className="py-20"><Container><div className="mx-auto max-w-xl rounded-[2rem] border border-stone-200 bg-white p-7 shadow-xl sm:p-12"><p className="eyebrow">Account recovery</p><h1 className="prata-regular mt-3 text-4xl">Choose a new password.</h1><form onSubmit={handleSubmit} className="mt-8 space-y-4"><Input htmlType="password" size="large" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required /><Input htmlType="password" size="large" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /><Button loading={loading} buttonType="submit" size="large" className="w-full">Update password</Button></form>{message && <p className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">{message}</p>}<Link to="/signup" className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 underline underline-offset-4">Back to sign in</Link></div></Container></main>;
};
export default ResetPassword;
