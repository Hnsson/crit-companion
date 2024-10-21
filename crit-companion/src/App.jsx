import { invoke } from "@tauri-apps/api/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Monsters from "./pages/Monsters";
import About from "./pages/About";

function App() {
  
  async function fetch_enemy_characters() {
    try {
      const characters = await invoke("fetch_enemy_characters");
    } catch (error) {
      console.error(error);
    }
  }

  const filter = { ac: 12 };

  async function fetch_enemy_character() {
    try {
      const characters = await invoke("fetch_enemy_character", { filter });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/monsters" element={<Monsters />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
