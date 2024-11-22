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
      return <p>{selectedTab === 'home' ? 'Home Tab Button 1 Content Here' : 
                 selectedTab === 'settings' ? 'Settings Tab Button 1 Content Here' :
                 'Profile Tab Button 1 Content Here'}</p>;
    }

    if (showButton2Content) {
      return <p>{selectedTab === 'home' ? 'Home Tab Button 2 Content Here' : 
                 selectedTab === 'settings' ? 'Settings Tab Button 2 Content Here' :
                 'Profile Tab Button 2 Content Here'}</p>;
    }

    switch (selectedTab) {
      case 'home':
        return (
          <>
            <p>Home Content Here</p>
            <Button onClick={handleButton1Click}>Button 1</Button>
            <Button onClick={handleButton2Click}>Button 2</Button>
          </>
        );
      case 'profile':
        return (
          <>
            <p>Profile Content Here</p>
            <Button onClick={handleButton1Click}>Button 1</Button>
            <Button onClick={handleButton2Click}>Button 2</Button>
          </>
        );
      case 'settings':
        return (
          <>
            <p>Settings Content Here</p>
            <Button onClick={handleButton1Click}>Button 1</Button>
            <Button onClick={handleButton2Click}>Button 2</Button>
          </>
        );
      case 'product':
        return <ProductPage />;
      case 'cart':
        return <CartPage />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="content">
        {renderTabContent()}
      </div>
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
          selected={selectedTab === 'product'}
          onClick={() => handleTabChange('product')}
        />
        <TabBar.Item
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
