import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartPage() {
  const [cartData, setCartData] = useState([]); // State to store cart data
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);      // State for any error

  // useEffect hook to fetch cart data when the component mounts
  useEffect(() => {
    axios.get('https://dummyjson.com/carts')  // API endpoint to fetch cart data
      .then(response => {
        setCartData(response.data.carts);  // Update state with fetched cart data
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
      <h1>Cart Details</h1>
      <ul>
        {cartData.map((cart) => (
          <li key={cart.id}>
            <h3>Cart ID: {cart.id}</h3>
            <p>Total Price: ${cart.totalPrice}</p>
            <ul>
              {cart.products.map((product) => (
                <li key={product.id}>
                  <h4>{product.name}</h4>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartPage;
