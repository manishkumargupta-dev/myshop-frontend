import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>
          {" "}
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        </div>
      ) : (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <div className="row">
            <div className="col-md-5">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h3>{product.name}</h3>
                </li>

                <li className="list-group-item">Price: ${product.price}</li>
                <li className="list-group-item">
                  Description: {product.description}
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <div className="card">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Price:</div>
                      <div className="col">
                        <strong>${product.price}</strong>
                      </div>
                    </div>
                  </li>

                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Status:</div>
                      <div className="col">
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </div>
                    </div>
                  </li>

                  <li className="list-group-item">
                    <div className="d-grid">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
