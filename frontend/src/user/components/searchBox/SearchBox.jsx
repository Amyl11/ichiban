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
        <h2 className={styles.header}>Search Events</h2>
        
      {/* Row 1 */}
      <div className={styles.row}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          placeholder="Enter keyword..."
          className={styles.input}
        />

        <button onClick={apply} className={styles.buttonPrimary}>
          Search
        </button>

        <button onClick={reset} className={styles.buttonSecondary}>
          Reset
        </button>
      </div>

      {/* Row 2 */}
      <div className={styles.grid}>
        {/* Range */}
        <div className={styles.field}>
          <label>Distance</label>
          <select
            value={rangeOption}
            onChange={(e) => setRangeOption(e.target.value)}
            className={styles.input}
          >
            <option value="district">Same District</option>
            <option value="city">Same City</option>
            <option value="all">No Filter</option>
          </select>
        </div>

        {/* Sort */}
        <div className={styles.field}>
          <label>Sort</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.input}
          >
            <option value="none">No Sort</option>
            <option value="ratingAsc">Rating Low → High</option>
            <option value="ratingDesc">Rating High → Low</option>
            <option value="priceAsc">Price Low → High</option>
            <option value="priceDesc">Price High → Low</option>
            <option value="priceFreeFirst">Free First</option>
          </select>
        </div>

        {/* Max Price */}
        <div className={styles.field}>
          <label>Max Price</label>
          <input
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className={styles.input}
            placeholder="Max price"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
