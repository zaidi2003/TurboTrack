import React from "react";
import "./TabBar.css"; 

const TabBar = ({ tabs, activeTab, onTabChange }) => {
  // Function to get the proper display name for each tab
  const getTabLabel = (tabKey) => {
    switch(tabKey) {
      case "discover":
        return "Discover";
      case "current":
        return "Current Bookings";
      case "history":
        return "History";
      default:
        return tabKey.charAt(0).toUpperCase() + tabKey.slice(1);
    }
  };

  return (
    <div className="tabs">
      {tabs.map((tabKey) => (
        <div
          key={tabKey}
          onClick={() => onTabChange(tabKey)}
          className={`tab ${activeTab === tabKey ? "tab-active" : "tab-inactive"}`}
        >
          {getTabLabel(tabKey)}
          {activeTab === tabKey && <div className="tab-indicator" />}
        </div>
      ))}
    </div>
  );
};

export default TabBar;