import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-theme shadow sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <i className="bi bi-heart-pulse-fill me-2"></i>
          CodeCare HMS
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/services">
                Services
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/doctors">
                Doctors
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/departments">
                Departments
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/contact">
                Contact
              </Link>
            </li>

          </ul>

          {/* Buttons */}
          <div className="d-flex gap-2">

            <Link
              to="/login"
              className="btn btn-light fw-semibold"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="btn btn-outline-light fw-semibold"
            >
              Signup
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;