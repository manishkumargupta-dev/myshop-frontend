import { useState } from "react";
import Message from "../components/Message";
import Loader from "./../components/Loader";
import { useLoginMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import authSlice from "./../slices/authSlice";
const LoginScreen = () => {
  const { setCredentials } = authSlice.actions;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const forward = searchParams.get("redirect") || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(forward);
    } catch (err) {
      setError(err);
    }
  };

  if (userInfo) {
    return <Navigate to={forward} />;
  }

  return (
    <>
      <div className="row justify-content-md-center">
        <div className=" col-xs-12 col-md-6">
          <h1>Sign In</h1>

          {error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : null}

          <form onSubmit={submitHandler}>
            <div className="my-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-secondary"
            >
              Sign In
            </button>
            {isLoading && <Loader />}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
