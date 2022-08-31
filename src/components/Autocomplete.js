import React, { useState } from "react";
import styles from "./Autocomplete.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import MoonLoader from "react-spinners/MoonLoader";
import { getData } from "../api/apiCalls";
import ResultItem from "./ResultItem";
import ErrorMessage from "./ErrorMessage";

function Autocomplete() {
  const [searchVal, setSearchVal] = useState("");
  const [elementActive, setElementActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleValueChange = async (e) => {
    setSearchVal(e.target.value);

    if (searchVal.length < 3) {
      if (error) setError(null);
      setResults(null);
    } else {
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          const data = getData(e.target.value);
          if (data) resolve(data);
          else reject();
        }, 1000)
      )
        .then((data) => setResults(data))
        .catch(() => setError("Request Error"));

      //   setLoading(true);
      //   const data =  getData(e.target.value);

      //   if (data) setResults(data);
      //   else setError("Request Error");

      //   setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    console.log(e.keyCode);

    switch (e.keyCode) {
      case 38:
        if (elementActive === 0) setElementActive(results.length - 1);
        else setElementActive(elementActive - 1);
        break;
      case 40:
        if (elementActive === results.length - 1) setElementActive(0);
        else setElementActive(elementActive + 1);
        break;
      case 13:
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
            <p>No Results Found</p>
          ) : (
            <>
              {results.map((el, index) => {
                if (index === elementActive) return <ResultItem key={index} value={el.name} active={true} />;
                else return <ResultItem key={index} value={el.name} />;
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
