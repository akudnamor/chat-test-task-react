import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const generateRandomName = () => {
  const names = ["lol", "kek", "cheburek", "bebra", "rin", "roman"];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

const username = generateRandomName();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
      rel="stylesheet"
    />
    <React.StrictMode>
      <App username={username}/>
    </React.StrictMode>
  </>
);
