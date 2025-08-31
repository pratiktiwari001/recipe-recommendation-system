import React, { useState } from "react";
import Home from "./Home";
import Categories from "./components/Categories";
import FilterArea from "./components/FilterArea";
import SearchByLetter from "./components/SearchByLetter";
import SearchByMeals from "./components/SearchByMeals";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home" && <Home navigateTo={setPage} />}
      {page === "categories" && <Categories />}
      {page === "filterArea" && <FilterArea />}
      {page === "letter" && <SearchByLetter />}
      {page === "meals" && <SearchByMeals />}
    </>
  );
}

export default App;
