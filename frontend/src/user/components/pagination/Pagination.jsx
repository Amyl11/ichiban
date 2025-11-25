import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ page, totalPages, setPage }) {

  return (
    <div className={styles.pagination}>
      {/* Previous */}
      <button
        className={styles.navBtn}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        ←
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`${styles.pageBtn} ${page === i + 1 ? styles.active : ""}`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      {/* Next */}
      <button
        className={styles.navBtn}
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        →
      </button>
    </div>
  );
}
