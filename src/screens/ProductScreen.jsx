import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const { addToCart, removeFromCart } = cartSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const foundInCart = cartItems.find((item) => item._id === productId);

  const [qty, setQty] = useState(foundInCart ? foundInCart.qty : 1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(productId));
    navigate("/cart");
  };

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
              <div className="card shadow">
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

                  {product.countInStock > 0 && (
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col">Qty</div>
                        <div className="col">
                          <select
                            className="form-select shadow-none border-secondary"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {Array(product.countInStock)
                              .fill()
                              .map((v, i) => i + 1)
                              .map((x) => (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </li>
                  )}

                  <li className="list-group-item">
                    <div className="d-grid my-2">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </button>
                    </div>
                    {foundInCart && (
                      <div className="d-grid">
                        <button
                          className="btn btn-danger"
                          type="button"
                          disabled={product.countInStock === 0}
                          onClick={removeFromCartHandler}
                        >
                          Remove From Cart
                        </button>
                      </div>
                    )}
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
