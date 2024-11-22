import React, { useState, useEffect } from 'react';
import { List as AntdMobileList, Card, Button, Toast } from 'antd-mobile'; // Import components from antd-mobile
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

    // Fetch products data
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

  const handleAddToCart = (product) => {
    Toast.show({
      content: `${product.title} added to cart!`,
      position: 'bottom',
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Mobile List from antd-mobile
  if (isMobile) {
    return (
      <AntdMobileList header="Products">
        {products.map((product) => (
          <AntdMobileList.Item key={product.id} description={product.description}>
            <Card style={{ padding: 16, marginBottom: 10 }}>
              <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: 'auto' }} />
              <h3>{product.title}</h3>
              <div>{product.description}</div>
              <div style={{ marginTop: '8px', color: '#1890ff', fontWeight: 'bold' }}>
                Price: R{product.price}
              </div>
              <Button style={{ marginTop: '10px' }} onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </Card>
          </AntdMobileList.Item>
        ))}
      </AntdMobileList>
    );
  }

  // Web List from antd
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <Card key={product.id} style={{ marginBottom: 16, padding: 16, width: '300px', display: 'inline-block' }}>
          <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: 'auto' }} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div style={{ marginTop: '8px', color: '#1890ff', fontWeight: 'bold' }}>
            Price: R{product.price}
          </div>
          <Button style={{ marginTop: '10px' }} onClick={() => handleAddToCart(product)}>
            Add to Cart
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default ProductPage;
