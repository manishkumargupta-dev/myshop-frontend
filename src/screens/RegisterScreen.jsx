import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/userApiSlice";

import Message from "../components/Message";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import authSlice from "../slices/authSlice";
const RegisterScreen = () => {
  const { setCredentials } = authSlice.actions;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();
  const forward = searchParams.get("redirect") || "/";

  if (userInfo) {
    return <Navigate to={forward} />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(forward);
      } catch (err) {
        setError(err);
      }
    }
  };
  return (
    <>
      <div className="row justify-content-md-center">
        <div className=" col-xs-12 col-md-6">
          <h1>Register</h1>

          {error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : null}

          <form onSubmit={submitHandler}>
            <div className="my-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
              ></input>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-secondary"
            >
              Register
            </button>
            {isLoading && <Loader />}
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
