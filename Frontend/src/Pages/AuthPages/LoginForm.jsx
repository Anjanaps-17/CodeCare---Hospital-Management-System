const LoginForm = ({
  formData,
  changeHandler,
  submitHandler,
}) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">

            <div className="card-header text-center">
              <h3>Login</h3>
            </div>

            <div className="card-body">
              <form onSubmit={submitHandler}>

                {/* Username */}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Username"
                    value={formData.Username}
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
                    name="Password"
                    value={formData.Password}
                    onChange={changeHandler}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;