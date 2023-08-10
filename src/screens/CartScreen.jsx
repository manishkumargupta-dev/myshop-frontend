import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "./../components/Message";
import { FaTrash } from "react-icons/fa";
import cartSlice from "../slices/cartSlice";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { removeFromCart } = cartSlice.actions;
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  return (
    <>
      <h1 className="mb-3">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <div className="row">
          <div className="col-md-8 ">
            <ul className="list-group list-group-flush">
              {cartItems.map((item) => (
                <li className="list-group-item" key={item._id}>
                  <div className="row">
                    <div className="col-md-2 ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-4 ">
                      <Link to={`/product/${item._id}`} className="text-dark">
                        {item.name}
                      </Link>
                    </div>
                    <div className="col-md-2 ">${item.price}</div>
                    <div className="col-md-2 ">qty</div>
                    <div className="col-md-2 ">
                      <button
                        className="btn btn-light"
                        type="button"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <ul className="list-group shadow">
              <li className="list-group-item ">
                <div className="row my-3">
                  <div className="col-6">Total item quantity </div>
                  <div className="col-6">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-6">Total item price </div>
                  <div className="col-6">${cart.itemsPrice}</div>
                </div>
              </li>
              <li className="list-group-item">checkout</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CartScreen;
