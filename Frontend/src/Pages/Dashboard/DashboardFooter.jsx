const DashboardFooter = () => {
  return (
    <div className="dashboard-footer mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-body py-3 text-center">

          <div className="mb-2">
            <i
              className="bi bi-heart-pulse-fill"
              style={{
                fontSize: "1.5rem",
                color: "#008b8b",
              }}
            ></i>
          </div>

          <h6 className="fw-bold mb-1">
            CodeCare HMS
          </h6>

          <small className="text-muted">
            Secure • Efficient • Modern Healthcare Management
          </small>

          <hr className="my-2" />

          <small className="text-muted">
            © 2026 CodeCare HMS | All Rights Reserved
          </small>

        </div>
      </div>
    </div>
  );
};

export default DashboardFooter;