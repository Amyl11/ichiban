import React, { useState } from "react";
import styles from "./EventCard.module.css";
import { PinIcon, Heart } from "lucide-react";
import { formatDate, formatPrice } from "../../../ultis/format";
import { removeFromFavorite } from "../../../services/FavoriteService";

export default function EventCard({ place, onCardClick, onRemoveFavorite, showRemoveButton = false }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (e) => {
    e.stopPropagation();
    try {
      setIsRemoving(true);
      await removeFromFavorite(place.id);
      onRemoveFavorite && onRemoveFavorite();
    } catch (err) {
      console.error('Failed to remove from favorites:', err);
    } finally {
      setIsRemoving(false);
    }
  };

  // Fallback image if no image is available
  const imageUrl = place.image || place.mainImageUrl || 'https://via.placeholder.com/200?text=No+Image';

  return (
    <div className={styles.item} onClick={onCardClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt={place.title} className={styles.itemImage} />

      <div className={styles.itemContent}>
        <h4 className={styles.itemTitle}>{place.title}</h4>
        {/* ==== Categories ==== */}
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
          📌 {place.district || place.locationCity}, {place.city || place.locationCity}
        </div>

        <div className={styles.date}>
          {formatDate(place.startDate || place.startDatetime)} - {formatDate(place.endDate)}
        </div>

        <div className={styles.desc}>{place.shortDescription || place.description}</div>
      </div>

      <div className={styles.rightBox}>
        {/* Rating */}
        {place.rating && <div className={styles.rating}>{place.rating}</div>}

        {/* Price */}
        <div className={styles.price}>
          {place.price === 0 ? "Free" : formatPrice(place.price)}
        </div>

        {/* Remove from Favorites Button */}
        {showRemoveButton && (
          <button
            className="bg-red-50 hover:bg-red-100 text-red-500 p-2 rounded transition-colors mb-2"
            onClick={handleRemove}
            disabled={isRemoving}
            title="Remove from favorites"
          >
            <Heart size={20} fill="currentColor" />
          </button>
        )}

        {/* Button */}
        <button className={styles.detailBtn} onClick={(e) => {
          e.stopPropagation();
          onCardClick && onCardClick();
        }}>Details</button>
      </div>
    </div>
  );
}
