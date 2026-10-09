import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Marketplace() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) { console.error(err); }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-6 text-primaryGreen text-center">Fresh Local Produce</h2>
      {products.length === 0 ? <p className="text-center text-gray-500">No products available right now.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <div key={p._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="h-32 bg-green-100 rounded flex items-center justify-center mb-4 text-4xl">
                {p.name.toLowerCase().includes('tomato') ? '🍅' : 
                 p.name.toLowerCase().includes('potato') ? '🥔' : 
                 p.name.toLowerCase().includes('onion') ? '🧅' : 
                 p.name.toLowerCase().includes('rice') ? '🌾' : '🥬'}
              </div>
              <h3 className="text-xl font-bold capitalize">{p.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Farmer: {p.farmerName}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-secondaryGreen">₹{p.price} / {p.unit}</span>
                <button className="bg-primaryGreen text-white px-3 py-1 rounded text-sm hover:bg-secondaryGreen transition">
                  Contact
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">Stock: {p.quantityInStock} {p.unit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
