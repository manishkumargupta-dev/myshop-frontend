const CartScreen = () => {
  return (
    <>
      <h1 className="mb-3">Shopping Cart</h1>
      <div className="row">
        <div className="col-md-8 ">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="row">
                <div className="col-md-2 ">image</div>
                <div className="col-md-4 ">name</div>
                <div className="col-md-2 ">price</div>
                <div className="col-md-2 ">qty</div>
                <div className="col-md-2 ">delete</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-md-2 ">image</div>
                <div className="col-md-4 ">name</div>
                <div className="col-md-2 ">price</div>
                <div className="col-md-2 ">qty</div>
                <div className="col-md-2 ">delete</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <ul className="list-group shadow">
            <li className="list-group-item">total</li>
            <li className="list-group-item">checkout</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
