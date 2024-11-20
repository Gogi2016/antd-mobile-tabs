import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataPage() {
  const [products, setProducts] = useState([]); // State to store the products data
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);      // State for any error

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    axios.get('https://dummyjson.com/products')  // API endpoint to fetch data
      .then(response => {
        setProducts(response.data.products);  // Update state with fetched data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(err => {
        setError(err); // Set error state if something goes wrong
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  if (loading) return <p>Loading...</p>; // Show loading message while fetching data
  if (error) return <p>Error: {error.message}</p>; // Show error message if there's an error

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataPage;
