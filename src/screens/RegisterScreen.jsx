const RegisterScreen = () => {
  return (
    <>
      <div className="row justify-content-md-center">
        <div className=" col-xs-12 col-md-6">
          <h1>Register</h1>

          <form>
            <div className="my-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                className="form-control"
              ></input>
            </div>

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

            <div className="my-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="form-control"
              ></input>
            </div>

            <button type="submit" className="btn btn-secondary">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
