import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* Logo */}
        <div className={styles.left}>
          <div className={styles.logo}>LOGO</div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <a href="#" className={styles.link}>Trang chủ</a>
          <a href="#" className={styles.link}>Địa điểm</a>
          <a href="#" className={styles.link}>Giới thiệu</a>
          <a href="#" className={styles.loginBtn}>Đăng nhập</a>
          <a href="#" className={styles.loginBtn}>Đăng ký</a>
        </nav>

      </div>
    </header>
  );
}
