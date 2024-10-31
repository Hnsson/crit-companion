import { invoke } from "@tauri-apps/api/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Monsters from "./pages/Monsters";
import About from "./pages/About";
import CreateCharacter from "./pages/CreateCharacter";
import MonsterInfo from "./pages/MonsterInfo";

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
      <main>
      <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/create-character" element={<CreateCharacter />} />
            <Route path="/monsters" element={<Monsters />} />
            <Route path="/monster/:param" element={<MonsterInfo />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
