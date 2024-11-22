import React, { useState, useEffect } from 'react';
import { List as AntdMobileList } from 'antd-mobile'; // For mobile
import { List as AntdList } from 'antd'; // For web
import axios from 'axios';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Mobile List from antd-mobile
  if (isMobile) {
    return (
      <AntdMobileList header="Products">
        {products.map((product) => (
          <AntdMobileList.Item key={product.id} description={product.description}>
             <img src={product.thumbnail} alt={product.title} style={{ width: 100, height: 100 }} />
            {product.title}
            <div style={{ marginTop: '8px', color: '#1890ff', fontWeight: 'bold' }}>
              Price: R{product.price}
            </div>
          </AntdMobileList.Item>
        ))}
      </AntdMobileList>
    );
  }

  // Web List from antd
  return (
    <div>
      <h1>Products</h1>
      <AntdList
        header="Products List"
        bordered
        dataSource={products}
        renderItem={(product) => (
          <AntdList.Item key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <img src={product.thumbnail} alt={product.title} style={{ width: 100, height: 100 }} />
            <div>Price: R{product.price}</div>
          </AntdList.Item>
        )}
      />
    </div>
  );
}

export default ProductPage;
