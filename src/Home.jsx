import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react'; // React is needed for JSX

function Home() {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center text-center p-4 custom-bg-gradient">
      <div className="hero-section">
        <h1 className="display-4 fw-bold mb-4">
          <span className="text-primary">🍲</span> Welcome to Food Explorer
        </h1>
        <p className="lead text-muted mb-5">
          Discover meals, categories, and cuisines from around the world!
        </p>
      </div>

      <div className="row g-4 w-100 justify-content-center">
        <div className="col-md-3 col-sm-6">
          <Link to="/category" className="custom-card-link">
            <div className="card h-100 shadow-lg border-0 rounded-4 custom-card custom-card-primary">
              <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
                <i className="bi bi-tag-fill display-4 mb-3"></i>
                <span className="h5 fw-bold">Browse by Category</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6">
          <Link to="/areas" className="custom-card-link">
            <div className="card h-100 shadow-lg border-0 rounded-4 custom-card custom-card-success">
              <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
                <i className="bi bi-geo-alt-fill display-4 mb-3"></i>
                <span className="h5 fw-bold">Browse by Area</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6">
          {/* Changed from custom-card-warning to custom-card-info */}
          <Link to="/search" className="custom-card-link">
            <div className="card h-100 shadow-lg border-0 rounded-4 custom-card custom-card-info"> 
              <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
                <i className="bi bi-search display-4 mb-3"></i>
                <span className="h5 fw-bold">Search by First Letter</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6">
          <Link to="/meals" className="custom-card-link">
            <div className="card h-100 shadow-lg border-0 rounded-4 custom-card custom-card-danger">
              <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
                <i className="bi bi-egg-fried display-4 mb-3"></i>
                <span className="h5 fw-bold">Search by Meals</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

