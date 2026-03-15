import { useNavigate } from "react-router-dom";
import "./scss/BackButton.scss";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate("/")}>
      ← Back
    </button>
  );
};

export default BackButton;
