import React, { useState } from "react";
import styles from "./Autocomplete.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import ResultItem from "./ResultItem";

const results = ["result1", "result2", "result3"];

function Autocomplete() {
  const [searchVal, setSearchVal] = useState("");
  const [elementActive, setElementActive] = useState(0);

  const handleValueChange = (e) => {
    setSearchVal(e.target.value);
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
    }
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
      </div>
      <div className={styles.container__suggestionBox}>
        <h4>Results:</h4>
        <ul className={styles.container__suggestionBox__list}>
          {results.map((el, index) => {
            if (index === elementActive) return <ResultItem key={index} value={el} active={true} />;
            else return <ResultItem key={index} value={el} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Autocomplete;
