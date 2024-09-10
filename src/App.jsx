import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <Header />
    </>
  );
}

function Header() {
  return (
    <div className="header">
      <Logo />
      <p className="letterHeader">APOD NASA NEWS </p>
    </div>
  );
}

function Logo() {
  return (
    <div>
      <img src="src/assets/temp-logo.png" alt="" className="logoImage"/>
    </div>
  );
}

function SearchBar(){
  return (
    <div>
      
    </div>
  )
}

export default App;
