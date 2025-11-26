import { useState, useEffect } from "react";
import styles from "./SearchBox.module.css";

function SearchBox({ filters, setFilters, onSearch }) {
  const [keyword, setKeyword] = useState(filters.keyword || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 0);
  const [sortOption, setSortOption] = useState(filters.sortOption || "none");
  const [rangeOption, setRangeOption] = useState(filters.rangeOption || "all");

  useEffect(() => {
    setKeyword(filters.keyword || "");
    setSortOption(filters.sortOption || "none");
    setRangeOption(filters.rangeOption || "all");
    setMaxPrice(filters.maxPrice || 500000);
  }, [filters]);

  const apply = () => {
    setFilters({ keyword, sortOption, rangeOption, maxPrice });
    onSearch();
  };

  const reset = () => {
    const resetData = {
      keyword: "",
      sortOption: "none",
      rangeOption: "all",
      maxPrice: 500000,
    };
    setKeyword("");
    setSortOption("none");
    setRangeOption("all");
    setMaxPrice(500000);
    setFilters(resetData);
  };

  return (
    <div className={styles.box}>
        <h2 className={styles.header}>Tìm kiếm sự kiện</h2>
        
      {/* Hàng 1 */}
      <div className={styles.row}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          placeholder="Nhập từ khóa..."
          className={styles.input}
        />

        <button onClick={apply} className={styles.buttonPrimary}>
          Tìm
        </button>

        <button onClick={reset} className={styles.buttonSecondary}>
          Reset
        </button>
      </div>

      {/* Hàng 2 */}
      <div className={styles.grid}>
        {/* Range */}
        <div className={styles.field}>
          <label>Khoảng cách</label>
          <select
            value={rangeOption}
            onChange={(e) => setRangeOption(e.target.value)}
            className={styles.input}
          >
            <option value="district">Cùng quận</option>
            <option value="city">Cùng thành phố</option>
            <option value="all">Không lọc</option>
          </select>
        </div>

        {/* Sort */}
        <div className={styles.field}>
          <label>Sắp xếp</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.input}
          >
            <option value="none">Không sắp xếp</option>
            <option value="ratingAsc">Rating thấp → cao</option>
            <option value="ratingDesc">Rating cao → thấp</option>
            <option value="priceAsc">Giá thấp → cao</option>
            <option value="priceDesc">Giá cao → thấp</option>
            <option value="priceFreeFirst">Miễn phí trước</option>
          </select>
        </div>

        {/* Max Price */}
        <div className={styles.field}>
          <label>Giá tối đa</label>
          <input
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className={styles.input}
            placeholder="Giá tối đa"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
