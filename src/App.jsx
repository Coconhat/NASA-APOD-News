import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getAPI() {
      const key = "ENih9eDN948LbnogKhIOWaAWAI4ernkzAsnfc1y5";

      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${key}`
        );

        if (!response.ok) {
          throw new Error("Error in fetching data...");
        }
        const dataa = await response.json();

        setData(dataa);
      } catch (error) {
        console.error("There was a problem with fetching data...", error);
      }
    }

    getAPI();
  }, []); 

  return (
    <>
      <Header />
      <SearchBar />
      <Trending data={data} />
    </>
  );
}

function Header() {
  return (
    <div className="header">
      <Logo />
      <p className="letterHeader">APOD NASA NEWS</p>
    </div>
  );
}

function Logo() {
  return (
    <div>
      <img src="src/assets/temp-logo.png" alt="logo" className="logoImage" />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="searchBar">
      <button>Home</button>
      <button>About</button>
      <button>Latest News</button>
      <button>Contact</button>
    </div>
  );
}

function Trending({ data }) {
  if (!data) return null;

  const [click, setClick] = useState(false);

  function handleClick() {
    setClick(!click);
  }

  return (
    <div>
      <p className="trending-p">Trending Now </p>
      <div className="trending-container">
        <div className="image-container">
          <img className="trending-image" src={data.url} alt={data.title} />
          <div className="title-overlay">
            <h2>{data.title}</h2>
          </div>
          <Button onClick={handleClick}>Learn more</Button>
        </div>
        {click && <p>{data.explanation}</p>}
      </div>
    </div>
  );
}



export default App;
