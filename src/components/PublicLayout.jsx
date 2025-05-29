// src/components/PublicLayout.jsx
import Navbar from "./Navbar";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function PublicLayout() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <>
      <Navbar onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
      <div className={styles.layout}>
        <div
          className={`${styles.sidebarWrapper} ${
            sidebarVisible ? styles.sidebarOpen : styles.sidebarClosed
          }`}
        >
          <Sidebar visible={sidebarVisible} />
        </div>
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
