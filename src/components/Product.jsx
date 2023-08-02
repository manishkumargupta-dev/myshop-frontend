import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="card my-3">
      <Link to={`/product/${product._id}`}>
        <img
          className="card-img-top"
          src={product.image}
          alt={product.description}
        />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <div className="card-title product-title">
            <strong>{product.name}</strong>
          </div>{" "}
        </Link>
        <h3 className="card-text">${product.price}</h3>
      </div>
    </div>
  );
};

export default Product;
