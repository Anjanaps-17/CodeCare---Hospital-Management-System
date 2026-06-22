const SignupForm = ({
  formData,
  roles,
  changeHandler,
  submitHandler,
}) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-center">
              <h3>Register User</h3>
            </div>

            <div className="card-body">
              <form onSubmit={submitHandler}>
                {/* username */}
                <div className="mb-3">
                  <label className="form-label">username</label>

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
                  <label className="form-label">Password</label>

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
                  <label className="form-label">Select Role</label>

                  <select
                    className="form-select"
                    name="RoleId"
                    value={formData.RoleId}
                    onChange={changeHandler}
                    required
                  >
                    <option value="">SELECT ROLE</option>

                    {roles.map((role) => (
                      <option
                        key={role._id}
                        value={role._id}
                      >
                        {role.RoleName}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;