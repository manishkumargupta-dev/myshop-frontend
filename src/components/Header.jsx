import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} width={60} height={30} alt="Myshop" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navContent"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <FaShoppingCart /> Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <FaUser /> Sign In
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
