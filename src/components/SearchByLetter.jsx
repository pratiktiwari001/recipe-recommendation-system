import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SearchByLetter() {
  const [letter, setLetter] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const searchMeals = () => {
    if (!letter) {
      setMeals([]);
      return;
    }
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="container mt-5 mb-5">
      <BackButton />

      <div className="text-center my-4">
        <h2 className="fw-bold display-5 mb-3">Search Meals by First Letter</h2>
      </div>

      <div className="d-flex justify-content-center mb-5">
        <div className="input-group" style={{ maxWidth: '400px' }}>
          <input
            type="text"
            maxLength="1"
            className="form-control form-control-lg rounded-pill"
            placeholder="Enter a letter (A-Z)"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            style={{ borderTopRightRadius: '0 !important', borderBottomRightRadius: '0 !important' }}
          />
          <button 
            className="btn btn-primary rounded-pill px-4" 
            onClick={searchMeals}
            style={{ borderTopLeftRadius: '0 !important', borderBottomLeftRadius: '0 !important' }}
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : meals.length > 0 ? (
        <div className="row justify-content-center">
          {meals.map((meal) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={meal.idMeal}>
              <div className="card h-100 shadow-lg border-0 rounded-3 meal-card-hover">
                <Link
                  to={`/recipe/${meal.idMeal}`}
                  state={{ from: location.pathname }}
                >
                  <img
                    src={meal.strMealThumb}
                    className="card-img-top rounded-top"
                    alt={meal.strMeal}
                  />
                </Link>
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
          ))}
        </div>
      ) : (
        letter && (
          <p className="text-center text-muted fs-5 my-5">
            No meals found starting with this letter.
          </p>
        )
      )}
    </div>
  );
}

export default SearchByLetter;