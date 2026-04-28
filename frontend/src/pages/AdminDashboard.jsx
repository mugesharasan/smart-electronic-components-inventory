import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { FaBoxes } from "react-icons/fa";


export default function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    manufacturer: "",
    price: "",
    stock: "",
    description: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editId) {
        await API.put(`/products/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Product updated successfully");
        setEditId(null);
      } else {
        await API.post("/products", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Product added successfully");
      }

      setFormData({
        name: "",
        category: "",
        manufacturer: "",
        price: "",
        stock: "",
        description: "",
      });

      fetchProducts();
      setActiveTab("products");
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({
      name: product.name,
      category: product.category,
      manufacturer: product.manufacturer,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
    setActiveTab("add");
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchProducts();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const chartData = [
    { name: "Total", value: products.length },
    { name: "Low Stock", value: products.filter((p) => p.stock <= 5).length },
    { name: "Out of Stock", value: products.filter((p) => p.stock === 0).length },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 h-screen bg-gradient-to-b from-indigo-900 to-purple-800 text-white p-6 flex flex-col">

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white p-3 rounded-xl shadow-md">
            <FaBoxes className="text-indigo-700 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Inventory</h1>
            <p className="text-sm text-indigo-200">Admin Panel</p>
          </div>
        </div>


        <div className="flex flex-col gap-3">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`p-3 rounded-lg text-left ${activeTab === "dashboard"
                ? "bg-white text-indigo-700"
                : "hover:bg-indigo-700"
              }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`p-3 rounded-lg text-left ${activeTab === "products"
                ? "bg-white text-indigo-700"
                : "hover:bg-indigo-700"
              }`}
          >
            Products
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`p-3 rounded-lg text-left ${activeTab === "add"
                ? "bg-white text-indigo-700"
                : "hover:bg-indigo-700"
              }`}
          >
            Add Product
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 p-3 rounded-lg text-left"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-500">Total Products</p>
                <h3 className="text-3xl font-bold">{products.length}</h3>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-500">Low Stock</p>
                <h3 className="text-3xl font-bold">
                  {products.filter((p) => p.stock <= 5).length}
                </h3>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-500">Out of Stock</p>
                <h3 className="text-3xl font-bold">
                  {products.filter((p) => p.stock === 0).length}
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <BarChart width={600} height={300} data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </div>
          </>
        )}

        {/* PRODUCTS */}
        {activeTab === "products" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Products</h2>

            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-3 rounded-lg w-1/2"
              />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border p-3 rounded-lg w-1/2"
              >
                <option value="">All Categories</option>
                <option value="Sensor">Sensor</option>
                <option value="Module">Module</option>
                <option value="Microcontroller">Microcontroller</option>
              </select>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white p-5 rounded-xl shadow">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.category}</p>
                  <p className="text-gray-600">₹{product.price}</p>
                  <p className="text-gray-600">Stock: {product.stock}</p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-400 px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ADD PRODUCT */}
        {activeTab === "add" && (
          <>
            <h2 className="text-3xl font-bold mb-6">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-3 rounded-lg" />
              <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-3 rounded-lg" />
              <input name="manufacturer" placeholder="Manufacturer" value={formData.manufacturer} onChange={handleChange} className="border p-3 rounded-lg" />
              <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-3 rounded-lg" />
              <input name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="border p-3 rounded-lg" />
              <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-3 rounded-lg" />
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg"
            >
              Save Product
            </button>
          </>
        )}
      </div>
    </div>
  );
}
