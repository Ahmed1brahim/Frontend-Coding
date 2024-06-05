import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SearchPage() {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({ sortBy: "stars", sortOrder: "asc" });

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${query}&sort=${filters.sortBy}&order=${filters.sortOrder}`
      );
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
      setSearchTerm(query);
      console.log('Query parameter "q" value:', query);
    }
  }, [query, filters]);

  const [searchTerm, setSearchTerm] = useState("");

  const resetData = () => {
    setFilters({ sortBy: "stars", sortOrder: "asc" });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeSelect = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="main-search">
          <h5>GitHub Search App </h5>
          <input
            type="search"
            placeholder="React"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </form>
      <hr />

      <div className="sort-order">
        <select
          className="sort-by"
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChangeSelect}
        >
          <option value="stars">stars</option>
          <option value="forks">forks</option>
        </select>
        <select
          text="sort by"
          className="order-by"
          name="sortOrder"
          value={filters.sortOrder}
          onChange={handleChangeSelect}
        >
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>

        <button onClick={resetData} className="btn">
          Reset
        </button>
      </div>

      <div className="results">
        {data?.items?.map((item) => {
          return (
            <div className="A-div" key={item.id}>
              <h5>{item.name}</h5>
              <p>{item.description}</p>
              <section className="icons">
                <label>
                  <i className="fa-regular fa-star"></i> {item.stargazers_count}
                </label>
                <label>
                  <i className="fa-solid fa-code-branch"></i> {item.forks_count}
                </label>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchPage;
