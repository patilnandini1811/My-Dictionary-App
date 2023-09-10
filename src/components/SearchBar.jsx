import React, { useRef } from 'react';
import styles from './SearchBar.module.css';
function SearchBar ({ setWord, fetchWordInfo })
{
  
   const ref = useRef(null);
  const handleInputChange = (e) => {
    setWord(e.target.value);
  };
 

  const handleSearch = () => {
    fetchWordInfo();
    setWord("");
    if (ref.current)
    {
      ref.current.value = "";
    }
  };

  return (
    <div className={styles.SearchBarContainer}>
      <input
      ref={ref}
        type="text" onChange={handleInputChange}
        placeholder={"Search for a word.."}
      />
       
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
