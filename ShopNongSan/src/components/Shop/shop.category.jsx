import { useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import "./shop.category.css";
import { useCategory } from "../../UseContext/CategoryContext";
import { useTranslation } from "react-i18next";
const CategoryProduct = () => {
  const [category, setCategory] = useState([]);
  const {
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setSelectedRating,
  } = useCategory();
  const [products, setProducts] = useState([]);
  const [sale, setSale] = useState(false);
  const { t } = useTranslation();

  const [showAll, setShowAll] = useState(true);
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [showRatingFilter, setShowRatingFilter] = useState(true);

  // Handle sale toggle
  const handleSaleToggle = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  // Handle price toggle
  const handlePriceToggle = () => {
    setShowPriceFilter((prevShowPriceFilter) => !prevShowPriceFilter);
  };

  // Handle rating toggle
  const handleRatingToggle = () => {
    setShowRatingFilter((prevShowRatingFilter) => !prevShowRatingFilter);
  };

  // Fetch Promise all
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_DATABASE_URL}/api/client/categories`),
          fetch(`${import.meta.env.VITE_DATABASE_URL}/api/client/products`),
        ]);

        const categoryData = await categoryResponse.json();
        const productData = await productResponse.json();

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        setCategory(categoryData);
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAll();
  }, [selectedCategory]);

  // Filter products have discount
  const displayedProducts = products.filter((product) => {
    const ProductsDiscount = product.discount > 0;
    return ProductsDiscount;
  });

  const ProductSale = sale ? displayedProducts : displayedProducts.slice(0, 3);

  return (
    <div className="category-product">
      <div>
        <div className="category-header">
          <h3>{t("all_category")}</h3>
          <button onClick={handleSaleToggle}>
            {showAll ? (
              <i class="fa-solid fa-angle-down"></i>
            ) : (
              <i class="fa-solid fa-angle-up"></i>
            )}
          </button>
        </div>
        <div
          className="category-list"
          style={{ display: showAll ? "block" : "none" }}
        >
          {category.map((cat) => (
            <div key={cat.id} className="category-item">
              <input
                type="radio"
                name="category"
                value={cat._id}
                checked={selectedCategory === cat.category}
                onChange={() => setSelectedCategory(cat.category)}
              />

              <div>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="category-header">
          <h3>{t("price")}</h3>
          <button onClick={handlePriceToggle}>
            {showPriceFilter ? (
              <i class="fa-solid fa-angle-down"></i>
            ) : (
              <i class="fa-solid fa-angle-up"></i>
            )}
          </button>
        </div>
        <div
          className="price-filter"
          style={{ display: showPriceFilter ? "block" : "none" }}
        >
          <input
            type="text"
            value={minPrice}
            min="0"
            max="100"
            placeholder="Giá tối thiểu"
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="text"
            value={maxPrice}
            min="0"
            max="100"
            placeholder="Giá tối đa"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="rating-filter">
        <div className="category-header">
          <h3>{t("evaluate")}</h3>
          <button onClick={handleRatingToggle}>
            {showRatingFilter ? (
              <i class="fa-solid fa-angle-down"></i>
            ) : (
              <i class="fa-solid fa-angle-up"></i>
            )}
          </button>
        </div>
        <div
          className="rating-list"
          style={{ display: showRatingFilter ? "block" : "none" }}
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="rating-item">
              <input
                type="radio"
                name="rating"
                value={star}
                onChange={() => setSelectedRating(star)}
              />
              {"★".repeat(star)}
              {star < 5 && (
                <span className="gray-stars">{"☆".repeat(5 - star)}</span>
              )}
            </label>
          ))}
        </div>
      </div>

      <div className="banner">
        <img
          src={`${import.meta.env.VITE_DATABASE_URL}/public/ShopDiscount/Bannar.png`}
          alt="Description"
        />
      </div>

      {/* Sale */}
      <div>
        <h3>{t("discount")}</h3>
        <div className="sale-filter">
          {ProductSale.length > 0 &&
            ProductSale.map((product) => (
              <div key={product.id} className="sale-product-item">
                <div>
                  <img
                    src={`${import.meta.env.VITE_DATABASE_URL}${product.img}`}
                    alt={product.name}
                  />
                </div>
                <div className="sale-product-details">
                  <div className="product-name">{product.name}</div>
                  <div>
                    <span className="current-price">{product.price} VND</span>
                    <span className="old-price">{product.price_old} VND</span>
                  </div>
                  <div>
                    {Array.from({ length: product.rating }).map((_, index) => (
                      <span key={index}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
