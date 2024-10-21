import { invoke } from "@tauri-apps/api/core";
import React from "react";
import { useState } from "react";


function Characters() {
    const [characters, setCharacters] = useState([]); // State to store fetched characters
    const [name, setName] = useState(""); // State to store input value

    async function create_character() {
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        await invoke("create_character", { name: CharacterInputEl.value, alignment: "good", height: 6 });
    }

    async function fetch_characters() {
        try {
            const characters = await invoke("fetch_characters");
            setCharacters(characters); // Store characters in state
            console.log(characters);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetch_character(filter) 
    {
        try {
            const characters = await invoke("fetch_character", { filter });
            setCharacters(characters); // Store characters in state
            console.log(characters);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <main className="container">
            <h1>Welcome to the Crit-Companion Character Page!</h1>

            <form
                className="row"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (name.trim() === "") {
                        fetch_characters();
                    } else {
                        const filter = { name };
                        fetch_character(filter);
                    }
                }}
            >
                <input
                id="greet-input"
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Enter a name..."
                />
                <button type="submit">Fetch Characters</button>
            </form>

            {/* Render list of characters */}
            <div className="character-list">
                {characters.length > 0 ? (
                <ul>
                    {characters.map((character, index) => (
                    <li key={index}>
                        {character.name} - {character.alignment} - Height: {character.height}
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No characters found.</p>
                )}
            </div>
        </main>
    );
}

export default Characters;
