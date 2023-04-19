import React, {useState} from "react";
import "./App.css";
import Header from "./Components/Header/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Body/Home";
import DetailsPage from "./Components/Body/Details Page/DetailsPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
