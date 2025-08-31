// src/components/CategoryMeals.jsx

import { useParams, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CategoryMeals() {
  const { name } = useParams(); // category name
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
      .then(res => res.json())
      .then(data => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching meals:", err);
        setLoading(false);
      });
  }, [name]);

  return (
    <div className="container mt-5 mb-5">
      {/* Back button is now at the top */}
      <BackButton />
      
      <div className="text-center my-4">
        <h1 className="fw-bold display-5 mb-3">Meals in {name} Category</h1>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : meals.length > 0 ? (
        <div className="row justify-content-center">
          {meals.map(meal => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={meal.idMeal}>
              <div className="card h-100 shadow-lg border-0 rounded-3 meal-card-hover">
                <Link 
                  to={`/recipe/${meal.idMeal}`} 
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
        <p className="text-center text-muted fs-5 my-5">
          No meals found in this category.
        </p>
      )}
    </div>
  );
}

export default CategoryMeals;