import { useEffect } from "react";

const RecentlyViewedProducts = () => {
  useEffect(() => {
    // Fetch recently viewed products from the server
    const fetchRecentlyViewed = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/recently-viewed/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recently viewed products");
        }
        const data = await response.json();
        console.log("Recently viewed products:", data);
      } catch (error) {
        console.error("Error fetching recently viewed products:", error);
      }
    };
    fetchRecentlyViewed();
  }, []);
  return (
    <div>
      <h2>Đã xem gần đây</h2>
    </div>
  );
};

export default RecentlyViewedProducts;
