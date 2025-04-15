// components/Tabs.jsx
import { useState } from "react";

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: activeTab === tab.label ? "#007bff" : "#f0f0f0",
              color: activeTab === tab.label ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map(
          (tab) =>
            activeTab === tab.label && <div key={tab.label}>{tab.content}</div>
        )}
      </div>
    </div>
  );
}
