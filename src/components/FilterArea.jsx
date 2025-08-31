import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function FilterArea() {
  const [areas, setAreas] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all areas for dropdown
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data.meals || []);
      })
      .catch((err) => console.error("Error fetching areas:", err));
  }, []);

  // Fetch meals when an area is selected
  useEffect(() => {
    if (selectedArea) {
      setLoading(true);
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`)
        .then((res) => res.json())
        .then((data) => {
          setMeals(data.meals || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching meals:", err);
          setLoading(false);
        });
    } else {
        setMeals([]); // Clear meals when no area is selected
    }
  }, [selectedArea]);

  return (
    <div className="container mt-5 mb-5">
      <BackButton />

      <div className="text-center my-4">
        <h2 className="fw-bold display-5 mb-3">Filter by Area</h2>
      </div>

      {/* Dropdown with enhanced styling */}
      <div className="d-flex justify-content-center mb-5">
        <select
          className="form-select form-select-lg shadow-sm w-75 rounded-pill"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">-- Select Area --</option>
          {areas.map((area) => (
            <option key={area.strArea} value={area.strArea}>
              {area.strArea}
            </option>
          ))}
        </select>
      </div>

      {/* Meals list or spinner */}
      <div className="row justify-content-center">
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : meals.length > 0 ? (
          meals.map((meal) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={meal.idMeal}>
              <div className="card h-100 shadow-lg border-0 rounded-3 meal-card-hover">
                <img
                  src={meal.strMealThumb}
                  className="card-img-top rounded-top"
                  alt={meal.strMeal}
                />
                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title fw-bold mb-3">{meal.strMeal}</h5>
                  <Link 
                    to={`/recipe/${meal.idMeal}`} 
                    className="btn btn-danger mt-auto rounded-pill fw-bold"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          selectedArea && (
            <p className="text-center text-muted fs-5 my-5">
              No meals found for this area. Please select another.
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default FilterArea;