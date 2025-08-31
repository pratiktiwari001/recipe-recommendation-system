// src/components/Categories.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import 'bootstrap/dist/css/bootstrap.min.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5 mb-5">
      {/* ⬅️ BackButton added here */}
      <BackButton />

      <div className="text-center my-4">
        <h1 className="fw-bold display-5 mb-3">Browse by Category</h1>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          {categories.map(cat => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={cat.idCategory}>
              <div className="card h-100 shadow-lg border-0 rounded-3 meal-card-hover">
                <Link 
                  to={`/category/${cat.strCategory}`} 
                  
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={cat.strCategoryThumb}
                    className="card-img-top rounded-top"
                    alt={cat.strCategory}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{cat.strCategory}</h5>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;


