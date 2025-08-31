
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import SearchByLetter from './components/SearchByLetter.jsx';
import SearchByMeals from './components/SearchByMeals.jsx';
import Categories from './components/Categories.jsx';
import FilterArea from './components/FilterArea.jsx';
import CategoryMeals from './components/CategoryMeals.jsx';
import RecipeDetail from './components/RecipeDetail.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/search" element={<SearchByLetter />} />
      <Route path="/meals" element={<SearchByMeals />} />
      <Route path="/category" element={<Categories />} />
      <Route path="/areas" element={<FilterArea />} />
      <Route path="/category/:name" element={<CategoryMeals />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />

    </Routes>
  </BrowserRouter>,

)
