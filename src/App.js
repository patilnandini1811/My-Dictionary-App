// import React, { useState } from 'react';
// import SearchBar from './components/SearchBar'; 
// import "./App.css";

// function App() {
//   const [word, setWord] = useState("");
//   const [wordInfo, setWordInfo] = useState(null);
//   const [error, setError] = useState("");

//   const fetchWordInfo = async () => {
//     setError("");  // Resetting error message
//     if (word === "") {
//       setError("Search field is empty.");
//       return;
//     }
//     if (word.length === 1)
//     {
//       setError("Please enter whole word!")
//       return;
//     }
    

//     try {
//       const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
//       const data = await response.json();
      
//       if (data.title === "No Definitions Found") {
//         setError("No Definitions Found");
//       } else {
//         setWordInfo(data);
//       }

//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="App">
//       <div className ="container">
//       <h1>My Dictionary App</h1>
//       <img src={process.env.PUBLIC_URL + '/dictionary.png'} alt="Description" />
//       </div>

//       <SearchBar setWord={setWord} fetchWordInfo={fetchWordInfo} />

//       {wordInfo && (
//         <div className="result-container">
//           <h2>{word}</h2>
//     {wordInfo.map((entry) => (
//       entry.meanings.map((meaning) => (
//         meaning.definitions.map((definition) => (
//           <p key={definition.definition}>{definition.definition}</p>
//         ))
//       ))
//     ))}
//   </div>
// )}

//       {error && <div className='error-container'><p>{error}</p></div>}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import SearchBar from './components/SearchBar'; 
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [wordInfo, setWordInfo] = useState(null);
  const [ error, setError ] = useState("");
  const [ searchWord, setSearchWord ] = useState("");

  const fetchWordInfo = async () => {
    setError("");  // Resetting error message
    if (word === "") {
      setError("Search field is empty.");
      return;
    }
    if (word.length === 1) {
      setError("Please enter a whole word!");
      return;
    }

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
      const data = await response.json();
      
      if (data.title === "No Definitions Found") {
        setError("No Definitions Found");
      } else {
        setWordInfo(data);
        setSearchWord(word);
      }

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>My Dictionary App</h1>
        <img src={process.env.PUBLIC_URL + '/dictionary.png'} alt="Description" />
      </div>

      <SearchBar setWord={setWord} fetchWordInfo={fetchWordInfo} />

      {wordInfo && (
        <div className="result-container">
          <h2>{searchWord}</h2>
          {wordInfo.map((entry) => (
            entry.meanings.map((meaning) => (
              meaning.definitions.map((definition) => (
                <p key={definition.definition}>{definition.definition}</p>
              ))
            ))
          ))}
        </div>
      )}

      {error && <div className="error-container"><p>{error}</p></div>}
    </div>
  );
}

export default App;
