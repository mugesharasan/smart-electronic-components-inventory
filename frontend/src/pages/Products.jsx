import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Products</h2>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>Manufacturer: {product.manufacturer}</p>
          <p>Price: ₹{product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
      <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  }}
>
  Logout
</button>

    </div>
  );
}
