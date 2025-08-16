import "./app.navbar.css";

const ListProductSearch = ({ products, search }) => {
  return (
    <div className="list-product-search-main">
      {search && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="list-product-search-item">
            <img
              src={`${import.meta.env.VITE_DATABASE_URL}${product.img}`}
              alt={product.name}
            />
            <p>{product.name}</p>
            <p>{product.price.toLocaleString()} VND</p>
          </div>
        ))
      ) : search ? (
        <p className="no-result">Không tìm thấy sản phẩm nào...</p>
      ) : null}
    </div>
  );
};

export default ListProductSearch;
