const LoginScreen = () => {
  return (
    <>
      <div className="row justify-content-md-center">
        <div className=" col-xs-12 col-md-6">
          <h1>Sign In</h1>

          <form>
            <div className="my-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="form-control"
              ></input>
            </div>

            <div className="my-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                className="form-control"
              ></input>
            </div>

            <button type="submit" className="btn btn-secondary">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
