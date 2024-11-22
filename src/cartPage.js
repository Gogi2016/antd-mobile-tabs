import React, { useState, useEffect } from 'react';
import { List as AntdMobileList } from 'antd-mobile'; // For mobile
import { List as AntdList } from 'antd'; // For web
import axios from 'axios';

function CartPage() {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    axios.get('https://dummyjson.com/carts')
      .then(response => {
        setCartData(response.data.carts);
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
      <AntdMobileList header="Cart List">
        {cartData.map((cart) => (
          <AntdMobileList.Item key={cart.id}>
            <h3>Cart ID: {cart.id}</h3>
            <AntdMobileList>
              {cart.products.map((product) => (
                <AntdMobileList.Item
                  key={product.id}
                  description={product.description}
                  extra={<img src={product.thumbnail} alt={product.title} style={{ width: 50, height: 50 }} />}
                >
                  {product.title}
                  <div style={{ marginTop: '8px', color: '#1890ff', fontWeight: 'bold' }}>
                    Price: R{product.price}
                  </div>
                </AntdMobileList.Item>
              ))}
            </AntdMobileList>
          </AntdMobileList.Item>
        ))}
      </AntdMobileList>
    );
  }

  // Web List from antd
  return (
    <div>
      <h1>Cart Details</h1>
      <AntdList
        header="Cart List"
        bordered
        dataSource={cartData}
        renderItem={(cart) => (
          <AntdList.Item key={cart.id}>
            <div>
              <h3>Cart ID: {cart.id}</h3>
              {cart.products.map((product) => (
                <div key={product.id}>
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  <img src={product.thumbnail} alt={product.title} style={{ width: 50, height: 50 }} />
                  <div>Price: R{product.price}</div>
                </div>
              ))}
            </div>
          </AntdList.Item>
        )}
      />
    </div>
  );
}

export default CartPage;
