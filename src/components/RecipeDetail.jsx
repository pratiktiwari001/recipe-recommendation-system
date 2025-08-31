// src/components/RecipeDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data.meals[0]))
      .catch(err => console.error("Error fetching recipe:", err));
  }, [id]);

  if (!recipe) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="container-fluid p-0">
      <BackButton />

      {/* Hero Image Section with Overlay */}
      <div className="recipe-hero-image-container mb-5">
        <img
          src={recipe.strMealThumb}
          className="recipe-hero-image"
          alt={recipe.strMeal}
        />
        <div className="recipe-hero-overlay d-flex flex-column justify-content-end p-5 text-white">
          <h1 className="fw-bold display-3 text-shadow">{recipe.strMeal}</h1>
          <p className="fs-5 text-shadow">
            <span className="badge bg-secondary me-2">
              <i className="bi bi-tag-fill me-1"></i> {recipe.strCategory}
            </span>
            <span className="badge bg-secondary">
              <i className="bi bi-geo-alt-fill me-1"></i> {recipe.strArea}
            </span>
          </p>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row g-5">
          {/* Ingredients Section */}
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <h3 className="fw-bold mb-4 text-center">Ingredients</h3>
              <div className="row">
                {ingredients.map((item, idx) => (
                  <div className="col-6 mb-3" key={idx}>
                    <p className="mb-0 text-muted">
                      <i className="bi bi-check-circle-fill me-2 text-success"></i>
                      <strong className="text-dark">{item.ingredient}</strong> - {item.measure}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <h3 className="fw-bold mb-4 text-center">Instructions</h3>
              <p className="text-secondary" style={{ whiteSpace: "pre-line" }}>
                {recipe.strInstructions}
              </p>
            </div>
          </div>
        </div>

        {/* YouTube Video Section */}
        {recipe.strYoutube && (
          <div className="mt-5 text-center">
            <h4 className="mb-3 fw-bold">Watch a Video Tutorial</h4>
            <div className="d-flex justify-content-center">
              <div className="ratio ratio-16x9 rounded-4 shadow-lg video-hover-effect" style={{ maxWidth: '800px' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${recipe.strYoutube.split("=")[1]}`}
                  title="Recipe Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-4"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;