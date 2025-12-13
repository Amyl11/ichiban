import React, { useState, useEffect, useCallback } from "react";
import styles from "./EventCard.module.css";
import { formatDate, formatPrice } from "../../../ultis/format";

export default function EventCard({ place }) {
  const [showDialog, setShowDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Close dialog when press ESC
  const handleEsc = useCallback((e) => {
    if (e.key === "Escape") setShowDialog(false);
  }, []);

  useEffect(() => {
    if (showDialog) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showDialog, handleEsc]);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Hãy chọn số sao!");
      return;
    }

    console.log("Rating:", rating);
    console.log("Comment:", comment);

    setShowDialog(false);
    setRating(0);
    setComment("");
  };

  return (
    <>
      <div className={styles.item}>
        <img src={place.image} alt={place.name} className={styles.itemImage} />

        <div className={styles.itemContent}>
          <h4 className={styles.itemTitle}>{place.title}</h4>

          {place.categories?.length > 0 && (
            <div className={styles.categories}>
              {place.categories.map((cat, index) => (
                <span key={index} className={styles.categoryTag}>
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className={styles.location}>
            📌 {place.district}, {place.city}
          </div>

          <div className={styles.date}>
            {formatDate(place.startDate)} - {formatDate(place.endDate)}
          </div>

          <div className={styles.desc}>{place.shortDescription}</div>
        </div>

        <div className={styles.rightBox}>
          <div
            className={styles.rating}
            onClick={() => setShowDialog(true)}
            style={{ cursor: "pointer" }}
          >
            {place.rating}
          </div>

          <div className={styles.price}>
            {place.price === 0 ? "Miễn phí" : formatPrice(place.price)}
          </div>

          <button className={styles.detailBtn}>Chi tiết</button>
        </div>
      </div>

      {/* =====================================
            MODAL DIALOG
      ===================================== */}
      {showDialog && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowDialog(false)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>Đánh giá sự kiện</h3>

            <div className={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`${styles.star} ${rating >= num ? styles.activeStar : ""
                    }`}
                  onClick={() => setRating(num)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className={styles.textarea}
              placeholder="Viết cảm nhận của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowDialog(false)}
              >
                Hủy
              </button>

              <button className={styles.submitBtn} onClick={handleSubmit}>
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
