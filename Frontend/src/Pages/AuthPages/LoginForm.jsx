import Clinic1 from "../../assets/Clinic1.png";

const LoginForm = ({
  formData,
  changeHandler,
  submitHandler,
}) => {
  return (
    <div className="login-page">

      {/* Left Side */}
      <div
        className="login-left"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0,139,139,0.75),
            rgba(17,94,89,0.85)
          ), url(${Clinic1})`,
        }}
      >
        <div className="overlay">
          <i
            className="bi bi-heart-pulse-fill"
            style={{ fontSize: "4rem" }}
          ></i>

          <h1 className="mt-3">CodeCare HMS</h1>

          <p className="mt-4">
            Compassionate Care, Advanced Technology,
            Healthier Tomorrow.
          </p>

          <div className="mt-4">
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right">

        <div className="card auth-card">

          <div className="auth-header">
            <h3>
              <i className="bi bi-shield-lock-fill me-2"></i>
              CodeCare Login
            </h3>
          </div>

          <div className="card-body p-4">

            <div className="text-center mb-4">
              <i
                className="bi bi-person-circle"
                style={{
                  fontSize: "4rem",
                  color: "#008b8b",
                }}
              ></i>
            </div>

            <form onSubmit={submitHandler}>

              {/* Username */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Username
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={changeHandler}
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Password
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-theme w-100 py-2 fw-semibold"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginForm;