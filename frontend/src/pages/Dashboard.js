import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard({ token }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', unit: 'kg', quantityInStock: '' });

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/farmer', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchMyProducts(); }, []);

  const addProduct = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMyProducts();
      setForm({ name: '', price: '', unit: 'kg', quantityInStock: '' });
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-primaryGreen">Add New Produce</h2>
        <form onSubmit={addProduct} className="flex flex-col gap-3">
          <input type="text" placeholder="Product Name (e.g., Tomatoes)" className="border p-2 rounded" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <div className="flex gap-2">
            <input type="number" placeholder="Price (₹)" className="border p-2 rounded w-1/2" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
            <select className="border p-2 rounded w-1/2" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}>
              <option value="kg">per kg</option>
              <option value="dozen">per dozen</option>
              <option value="piece">per piece</option>
            </select>
          </div>
          <input type="number" placeholder="Quantity in Stock" className="border p-2 rounded" required value={form.quantityInStock} onChange={e => setForm({...form, quantityInStock: e.target.value})} />
          <button type="submit" className="bg-primaryGreen text-white p-2 rounded font-bold">Add Product</button>
        </form>
      </div>
      
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-primaryGreen">My Active Listings</h2>
        {products.length === 0 ? <p>No products listed yet.</p> : (
          <ul className="divide-y">
            {products.map(p => (
              <li key={p._id} className="py-2 flex justify-between">
                <div>
                  <p className="font-bold">{p.name}</p>
                  <p className="text-sm text-gray-500">Stock: {p.quantityInStock} {p.unit}</p>
                </div>
                <p className="text-secondaryGreen font-bold">₹{p.price}/{p.unit}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
