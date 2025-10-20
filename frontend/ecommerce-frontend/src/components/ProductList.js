import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ₹{p.price} - {p.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
