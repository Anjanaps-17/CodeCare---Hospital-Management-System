import { useNavigate } from "react-router-dom";

const PageHeader = ({
  title,
  subtitle = "CodeCare Hospital Management System",
  icon = "bi bi-file-earmark",
  backPath,
}) => {
  const navigate = useNavigate();

  return (
    <div className="ap-header">

      <button
        type="button"
        className="ap-back-btn"
        onClick={() =>
          backPath ? navigate(backPath) : navigate(-1)
        }
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      <div className="ap-header-icon">
        <i className={icon}></i>
      </div>

      <div>
        <h2 className="ap-title">{title}</h2>
        <p className="ap-subtitle">{subtitle}</p>
      </div>

    </div>
  );
};

export default PageHeader;