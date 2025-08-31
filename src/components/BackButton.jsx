// src/components/BackButton.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    // Check if the previous location was passed and it's not a detail page
    if (location.state && location.state.from && !location.state.from.includes('/recipe')) {
      navigate(location.state.from);
    } else {
      // Otherwise, go back one step in the history stack
      navigate(-1);
    }
  };

  return (
    <div className="text-start my-4 ms-4">
      <Button 
        variant="light" 
        onClick={handleBackClick} 
        className="px-4 py-2 fw-bold rounded-pill shadow-sm border"
        style={{
          backgroundColor: '#fff',
          borderColor: '#ddd',
          color: '#333'
        }}
      >
        <i className="bi bi-arrow-left-circle-fill me-2"></i> Back
      </Button>
    </div>
  );
}

export default BackButton;