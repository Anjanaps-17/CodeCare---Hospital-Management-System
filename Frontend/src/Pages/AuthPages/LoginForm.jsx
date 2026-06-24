const LoginForm = ({
  formData,
  changeHandler,
  submitHandler,
}) => {
  return (
    <div className="login-container">
      <div className="card auth-card shadow col-md-4">

        <div className="auth-header">
          <h3>CodeCare Login</h3>
        </div>

        <div className="card-body">
          <form onSubmit={submitHandler}>

            {/* Username */}
            <div className="mb-3">
              <label className="form-label">
                Username
              </label>

              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={changeHandler}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-theme w-100"
            >
              Login
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;