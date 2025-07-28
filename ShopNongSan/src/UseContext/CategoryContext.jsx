import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedRating, setSelectedRating] = useState(null);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        selectedRating,
        setSelectedRating,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
