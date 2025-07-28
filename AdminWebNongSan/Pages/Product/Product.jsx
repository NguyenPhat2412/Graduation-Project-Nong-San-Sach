import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/navbar";
import "../../components/Dashboard/Dashboard.css";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchProduct, setSearchProduct] = useState("");
  const ProductPerPage = 7;

  // Get info of Product
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, []);

  // Search product
  useEffect(() => {
    if (searchProduct) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
          console.log(data);
        })
        .catch((err) => console.error("Lỗi lấy user:", err));
    }
  }, [searchProduct]);

  // Delete product
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/admin/product/delete-product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      alert("Product deleted successfully");
      navigator("/");
    } catch (err) {
      console.error("Error when delete product", err);
    }
  };

  // Phân trang
  const indexOfLastProduct = currentPage * ProductPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / ProductPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginateRange = 1;
  const startPage = Math.max(1, currentPage - Math.floor(paginateRange / 2));
  const endPage = Math.min(totalPages, startPage + paginateRange - 1);
  return (
    <div className="dashboard-container-main min-h-screen flex bg-white ">
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>

      <div
        className="col-span-1 md:col-span-4 p-6 dashboard-container"
        style={{ width: "100%" }}
      >
        <div
          className="transactions bg-white shadow-md rounded-lg p-7 shadow-md mt-6"
          style={{ width: "100%", height: "75vh" }}
        >
          <h1 className="text-2xl font-bold mb-4">Product List</h1>
          <div className="flex justify-between items-center mb-4">
            <input
              placeholder="Enter product"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-1/3"
              style={{
                width: "30%",
                height: "40px",
                marginBottom: "10px",
                paddingLeft: "10px",
              }}
            ></input>
          </div>
          {loading ? (
            <p className="text-gray-500">Loading products</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No product found.</p>
          ) : (
            <div className="transactions-list overflow-x-auto ">
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-200 text-gray-700 text-xl">
                  <tr>
                    <th className="py-2 px-3 border">STT</th>
                    <th className="py-2 px-3 border">ID</th>
                    <th className="py-2 px-3 border">Name</th>
                    <th className="py-2 px-3 border">Price</th>
                    <th className="py-2 px-3 border">Image</th>
                    <th className="py-2 px-3 border">Category</th>
                    <th className="py-2 px-3 border">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((b, idx) => (
                    <tr key={b._id} className="border-t">
                      <td className="py-2 px-3 border">{idx + 1}</td>
                      <td className="py-2 px-3 border">{b._id}</td>
                      <td className="py-2 px-3 border">{b.name || "N/A"}</td>
                      <td className="py-2 px-3 border">{b.price}</td>
                      <td className="py-2 px-3 border">
                        {
                          <img
                            src={b.img1 || `http://localhost:5000${b.img}`}
                            alt={b.name}
                            className="w-10 h-10 object-cover"
                          />
                        }
                      </td>
                      <td className="py-2 px-3 border">
                        {b.category || "N/A"}
                      </td>
                      <td className="py-2 px-3 border ">
                        <Link
                          className="bg-blue-500 text-white rounded"
                          style={{
                            padding: "0.5rem 1rem",
                            marginRight: "0.5rem",
                          }}
                          to={`/edit-product/${b._id}`}
                        >
                          Update
                        </Link>
                        <button
                          className="bg-red-500 text-white rounded ml-2"
                          style={{ padding: "0.5rem 1rem" }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this product?"
                              )
                            ) {
                              handleDelete(b._id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="dashboard-page flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => paginate(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-blue-500"
                  }`}
                >
                  <i className="fa-solid fa-square-caret-left w-10 "></i>
                </button>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                  const pageNumber = startPage + i;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`px-3 py-1 rounded border w-10 ${
                        currentPage === pageNumber
                          ? "bg-blue-500 text-white"
                          : "bg-white text-blue-500"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    paginate(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border w-10 ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-blue-500"
                  }`}
                >
                  <i className="fa-solid fa-square-caret-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
