import React, { useState, useEffect } from "react";
import styles from "./Autocomplete.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import MoonLoader from "react-spinners/MoonLoader";
import { getData } from "../api/apiCalls";
import ResultItem from "./ResultItem";
import ErrorMessage from "./ErrorMessage";

function Autocomplete() {
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [results, setResults] = useState(null);
  const [elementActive, setElementActive] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    //fetching after .5 seconds when user stops typing
    const fetchData = async () => {
      setLoading(true);

      const data = await getData(searchVal);
      if (data) {
        setError(null);
        setResults(data);
      } else setError("Request failed");

      setLoading(false);
    };

    let timer = setTimeout(() => {
      if (searchVal.length > 2) fetchData();
      else {
        setResults(null);
        setError(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchVal]);

  const handleValueChange = async (e) => {
    setSearchVal(e.target.value);
  };

  const handleKeyDown = (e) => {
    // console.log(e.keyCode);

    switch (e.keyCode) {
      case 38: //up
        if (elementActive === 0) setElementActive(results.length - 1);
        else setElementActive(elementActive - 1);
        break;
      case 40: //down
        if (elementActive === results.length - 1) setElementActive(0);
        else setElementActive(elementActive + 1);
        break;
      case 13: //enter
        window.open(results[elementActive].url, "_blank");
        break;
    }
  };

  const Results = () => {
    return (
      <div className={styles.container__suggestionBox}>
        <h4>Results:</h4>
        <ul className={styles.container__suggestionBox__list}>
          {results.length === 0 ? (
            <p className={styles.container__suggestionBox__list__message} data-testid="noresults-message">
              No Results Found
            </p>
          ) : (
            <>
              {results.map((el, index) => {
                return (
                  <ResultItem
                    key={index}
                    value={el.name}
                    active={index === elementActive ? true : false}
                    onMouseEnter={() => setElementActive(index)}
                    url={el.url}
                    type={el.type}
                  />
                );
              })}
            </>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__inputContainer}>
        <AiOutlineSearch className={styles.container__inputContainer__icon} />
        <input
          data-testid="input-search"
          type="text"
          onChange={handleValueChange}
          value={searchVal}
          placeholder="Search..."
          onKeyDown={handleKeyDown}
        />
        {loading && <MoonLoader color="#BEBEBE" size={18} />}
      </div>
      {error && <ErrorMessage message={error} />}
      {results && !error && <Results />}
    </div>
  );
}

export default Autocomplete;
