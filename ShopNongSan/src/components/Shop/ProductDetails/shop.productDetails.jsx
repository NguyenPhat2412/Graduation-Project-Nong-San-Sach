import Modal from "react-bootstrap/Modal";
import "./shop.productDetails.css";
import { Button } from "react-bootstrap";
import { useUser } from "../../../UseContext/UserContext";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  fetchCart,
} from "../../Home/Redux/redux.controllerDatabase";

const ProductDetails = (props) => {
  const { ProductDetails } = props;
  const { userInfo, loading } = useUser();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // set localStorage
  const recentlyViewedProducts = JSON.parse(
    localStorage.getItem("recentlyViewed") || "[]"
  );
  const addRecentlyViewed = (product) => {
    if (!product) return;
    const productExists = recentlyViewedProducts.some(
      (item) => item._id === product._id
    );
    if (!productExists) {
      recentlyViewedProducts.push(product);
      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(recentlyViewedProducts)
      );
    }
  };

  // Add product to recently viewed
  if (ProductDetails) {
    addRecentlyViewed(ProductDetails);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const userId = userInfo?._id;

  // // Post data to Cart API
  // const handleAddToCart = () => {
  //   const cartItem = {
  //     userId: userInfo._id,
  //     products: [
  //       {
  //         productId: ProductDetails._id,
  //         name: ProductDetails.name,
  //         price: ProductDetails.price,
  //         img: ProductDetails.img,
  //         stock: ProductDetails.stock,
  //         category: ProductDetails.category,
  //         tag: ProductDetails.tag,
  //         brand: ProductDetails.brand,
  //         description: ProductDetails.description,
  //         rating: ProductDetails.rating,
  //         quantity: quantity,
  //       },
  //     ],
  //   };
  //   fetch(`${import.meta.env.VITE_DATABASE_URL}/api/client/cart`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cartItem),
  //   })
  //     .then((response) => response.json())
  //     .catch((error) => {
  //       console.error("Error adding item to cart:", error);
  //     });
  // };

  const handleAddToCart = () => {
    if (!userId) {
      alert("You need to be logged in to add items to the cart.");
      return;
    }
    const productId = ProductDetails._id;
    dispatch(addToCart({ userId, productId, quantity })).then(() => {
      dispatch(fetchCart(userId));
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="product-title">
            <div>{ProductDetails?.name}</div>
            <div>{ProductDetails?.stock ? " In Stock" : " Out of Stock"}</div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-modal-body">
          <div className="product-modal-image">
            <img
              src={`${import.meta.env.VITE_DATABASE_URL}${ProductDetails?.img}`}
              alt={ProductDetails?.name}
            />
          </div>
          <div className="product-info">
            <p>{ProductDetails?.description}</p>
            {Array.from({ length: ProductDetails?.rating }).map((_, index) => (
              <span key={index}>⭐</span>
            ))}
            <p>
              <strong>Brand: </strong>
              <img
                src={`${import.meta.env.VITE_DATABASE_URL}${ProductDetails?.brand}`}
                alt={ProductDetails?.name}
              />
            </p>
            <p>
              <strong>Price: </strong>${ProductDetails?.price.toFixed(2)}
            </p>
            <p>
              <strong>Category: </strong>
              {Array.from({ length: ProductDetails?.category.length }).map(
                (_, index) => (
                  <span key={index}>{ProductDetails?.category[index]}, </span>
                )
              )}
            </p>
            <p>
              <strong>Tag: </strong>
              {Array.from({ length: ProductDetails?.tag.length }).map(
                (_, index) => (
                  <span key={index}>{ProductDetails?.tag[index]}, </span>
                )
              )}
            </p>
            <div className="add-to-cart-product">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button onClick={handleAddToCart}>Add To Cart</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetails;
