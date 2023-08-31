import React, { useState, useEffect } from 'react';
import './style.css';
import Stack from '@mui/material/Stack';
import ProductCard from './ProductCard';

export default function App() {
  const [products, setProduct] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const url = 'https://62d92de95d893b27b2dfeae8.mockapi.io/products/all';

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.products);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [filter, products]);


  return (
    <Stack spacing={4} alignItems="center">
      <h1>Product list</h1>
      <input
        type="text"
        placeholder="Enter product name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Stack spacing={2} direction={'column'}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.asin} product={product} />
        ))}
      </Stack>
    </Stack>
  );
}
