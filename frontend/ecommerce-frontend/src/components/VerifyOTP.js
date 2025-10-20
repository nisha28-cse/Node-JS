import { useState } from "react";
import axios from "axios";

export default function VerifyOTP() {
  const [form, setForm] = useState({ email: "", otp: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/verify-otp", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message || "Error occurred");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="otp" placeholder="OTP" onChange={handleChange} />
        <button type="submit">Verify OTP</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
