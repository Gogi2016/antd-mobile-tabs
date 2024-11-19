
import React, { useState } from 'react';
import './App.css';
import { TabBar, Button } from 'antd-mobile';

function App() {
  const [selectedTab, setSelectedTab] = useState('home');
  const [showButton1Content, setShowButton1Content] = useState(false);
  const [showButton2Content, setShowButton2Content] = useState(false);

  const handleButton1Click = () => {
    setShowButton1Content(true);  // Show Button 1 content
    setShowButton2Content(false); // Hide Button 2 content
  };

  const handleButton2Click = () => {
    setShowButton2Content(true);  // Show Button 2 content
    setShowButton1Content(false); // Hide Button 1 content
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setShowButton1Content(false);  // Reset Button 1 content when any tab is clicked
    setShowButton2Content(false);  // Reset Button 2 content when any tab is clicked
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
            <p>Home Content</p>
            <Button onClick={handleButton1Click}>Button 1</Button>
            <Button onClick={handleButton2Click}>Button 2</Button>
          </div>
        );
      case 'profile':
        return (
          <div className="container">
            <p>Profile Content</p>
            <Button onClick={handleButton1Click}>Button 1</Button>
            <Button onClick={handleButton2Click}>Button 2</Button>
          </div>
        );
      case 'settings':
        return (
          <div className="container">
            <p>Settings Content</p>
            <Button onClick={handleButton1Click}>Button 1</Button>
            <Button onClick={handleButton2Click}>Button 2</Button>
          </div>
        );
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
      </TabBar>
    </div>
  );
}

export default App;