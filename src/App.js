import React, { useState, useEffect } from 'react';
import { List, Card, Button } from 'antd-mobile'; // Import components from antd-mobile

// Sample data (could be cart items, products, etc.)
const sampleData = [
  { id: 1, title: 'Product 1', description: 'Description of Product 1', price: 'R100', thumbnail: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Product 2', description: 'Description of Product 2', price: 'R200', thumbnail: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Product 3', description: 'Description of Product 3', price: 'R150', thumbnail: 'https://via.placeholder.com/150' },
];

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detect mobile view

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update state based on window size
    };

    window.addEventListener('resize', handleResize); // Listen for window resize event
    return () => window.removeEventListener('resize', handleResize); // Cleanup listener on component unmount
  }, []);

  // Render mobile version using antd-mobile List and Card components
  const renderMobileContent = () => (
    <List header="Products">
      {sampleData.map((item) => (
        <List.Item key={item.id}>
          <Card>
            <div>
              <img src={item.thumbnail} alt={item.title} style={{ width: 50, height: 50 }} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div style={{ marginTop: '8px', color: '#1890ff', fontWeight: 'bold' }}>
                Price: {item.price}
              </div>
              <Button size="small" style={{ marginTop: '10px' }}>Add to Cart</Button>
            </div>
          </Card>
        </List.Item>
      ))}
    </List>
  );

  // Render desktop version using antd List and Card components
  const renderDesktopContent = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {sampleData.map((item) => (
        <Card key={item.id} style={{ width: 200 }}>
          <img src={item.thumbnail} alt={item.title} style={{ width: '100%' }} />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div style={{ marginTop: '8px', color: '#1890ff', fontWeight: 'bold' }}>
            Price: {item.price}
          </div>
          <Button style={{ marginTop: '10px' }}>Add to Cart</Button>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="App">
      <h1>{isMobile ? 'Mobile View' : 'Desktop View'}</h1>
      {isMobile ? renderMobileContent() : renderDesktopContent()}
    </div>
  );
}

export default App;
