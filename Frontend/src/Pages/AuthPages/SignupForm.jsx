const SignupForm = ({
  formData,
  changeHandler,
  submitHandler,
}) => {
  return (
    <div className="signup-container">
      <div className="card auth-card shadow col-md-4">
        <div className="auth-header">
          <h3>Register User</h3>
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

            {/* Role */}
            <div className="mb-3">
              <label className="form-label">
                Select Role
              </label>

              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={changeHandler}
                required
              >
                <option value="">
                  SELECT ROLE
                </option>
                <option value="Admin">
                  Admin
                </option>
                <option value="Doctor">
                  Doctor
                </option>
                <option value="Receptionist">
                  Receptionist
                </option>
                <option value="Lab Technician">
                  Lab Technician
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-theme w-100"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;