import React, { useState, useEffect } from 'react';
import { List } from 'antd-mobile';
import axios from 'axios';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '10px' }}>
      <h1>Products</h1>
      <List header="Product List">
        {products.map((product) => (
         <List.Item
         key={product.id}
         description={product.description}
         extra={<img src={product.thumbnail} alt={product.title} style={{ width: 50, height: 50 }} />}
       >
         {product.title}
         <div style={{ marginTop: '8px', color: '#1890ff', fontWeight: 'bold' }}>
           Price: R{product.price}
         </div>
       </List.Item>
        ))}
      </List>
    </div>
  );
}

export default ProductPage;
