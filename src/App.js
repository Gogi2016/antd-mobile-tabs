import React, { useState } from 'react';
import './App.css';
import { TabBar, Button } from 'antd-mobile';
import CartPage from './cartPage'; 
import ProductPage from './ProductPage';

function App() {
  const [selectedTab, setSelectedTab] = useState('home');
  const [showButton1Content, setShowButton1Content] = useState(false);
  const [showButton2Content, setShowButton2Content] = useState(false);

  const handleButton1Click = () => {
    setShowButton1Content(true);
    setShowButton2Content(false);
  };

  const handleButton2Click = () => {
    setShowButton2Content(true);
    setShowButton1Content(false);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setShowButton1Content(false);
    setShowButton2Content(false);
  };

  const renderTabContent = () => {
    if (showButton1Content) {
      return (
        <div className="container">
          <p>{selectedTab === 'home' ? 'Home Tab Button 1 Content Here' :
             selectedTab === 'settings' ? 'Settings Tab Button 1 Content Here' :
             'Profile Tab Button 1 Content Here'}</p>
        </div>
      );
    }

    if (showButton2Content) {
      return (
        <div className="container">
          <p>{selectedTab === 'home' ? 'Home Tab Button 2 Content Here' : 
             selectedTab === 'settings' ? 'Settings Tab Button 2 Content Here' :
             'Profile Tab Button 2 Content Here'}</p>
        </div>
      );
    }

    switch (selectedTab) {
      case 'home':
        return (
          <div className="container">
            <p>Home Content Here</p>
            <Button onClick={handleButton1Click}>Button 1</Button>
            <Button onClick={handleButton2Click}>Button 2</Button>
          </div>
        );
      case 'profile':
        return (
          <div className="container">
            <p>Profile Content here</p>
            <Button onClick={handleButton1Click}>Button 1</Button>
            <Button onClick={handleButton2Click}>Button 2</Button>
          </div>
        );
      case 'settings':
        return (
          <div className="container">
            <p>Settings Content here</p>
            <Button onClick={handleButton1Click}>Button 1</Button>
            <Button onClick={handleButton2Click}>Button 2</Button>
          </div>
        );
      case 'product':
        return <ProductPage />;
      case 'cart':  // Add this case to render CartPage
        return <CartPage />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Working on TabBar</h1>
      {renderTabContent()}
      <TabBar>
        <TabBar.Item
          title="Home"
          key="home"
          selected={selectedTab === 'home'}
          onClick={() => handleTabChange('home')}
        />
        <TabBar.Item
          title="Profile"
          key="profile"
          selected={selectedTab === 'profile'}
          onClick={() => handleTabChange('profile')}
        />
        <TabBar.Item
          title="Settings"
          key="settings"
          selected={selectedTab === 'settings'}
          onClick={() => handleTabChange('settings')}
        />
        <TabBar.Item
          title="Product"
          key="product"
          selected={selectedTab === 'data'}
          onClick={() => handleTabChange('data')}
        />
        <TabBar.Item  // Add Cart tab to the TabBar
          title="Cart"
          key="cart"
          selected={selectedTab === 'cart'}
          onClick={() => handleTabChange('cart')}
        />
      </TabBar>
    </div>
  );
}

export default App;
