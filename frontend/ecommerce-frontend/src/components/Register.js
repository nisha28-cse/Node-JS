import React, { useState } from "react"; // ✅ import React and useState
import axios from "axios"; // ✅ import axios

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", contact: "" }); // ✅ define form
  const [message, setMessage] = useState(""); // ✅ define message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/register", form);
      setMessage(res.data.message);
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Server not reachable or some other error");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="contact" placeholder="Contact" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
