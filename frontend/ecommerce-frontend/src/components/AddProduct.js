import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", stock: "", image: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // JWT token
      const res = await axios.post("http://localhost:5000/api/products/add", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message || "Error occurred");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <input name="stock" placeholder="Stock" onChange={handleChange} />
        <input name="image" placeholder="Image URL" onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
