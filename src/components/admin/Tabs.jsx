import { useState } from "react";
import styles from "./Admin.module.css";

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div>
      <div className={styles.tabHeader}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`${styles.tabButton} ${
              activeTab === tab.label ? styles.active : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.label === activeTab)?.content}</div>
    </div>
  );
}
