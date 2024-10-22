import { invoke } from "@tauri-apps/api/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateCharacter.css";

function CreateCharacter() {
    const [newName, setNewName] = useState("");
    const [newRace, setNewRace] = useState("Human");
    const [newClass, setNewClass] = useState("Fighter");
    const [newAlignment, setNewAlignment] = useState("Neutral Good");
    const [newHeight, setNewHeight] = useState(180);
    const [attributes, setAttributes] = useState({
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
    });

    const navigate = useNavigate();

    async function create_character() {
        try {
            await invoke("create_character", {
                name: newName,
                race: newRace,
                class: newClass,
                alignment: newAlignment,
                height: newHeight,
                attributes
            });
            navigate("/characters");
        } catch (error) {
            console.error(error);
        }
    }

    const handleAttributeChange = (e) => {
        const { name, value } = e.target;
        setAttributes((prev) => ({
            ...prev,
            [name]: parseInt(value)
        }));
    };

    return (
        <main className="container">
            <h1>Create a New Character</h1>

            <form
                className="character-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (newName.trim() !== "") {
                        create_character();
                    }
                }}
            >
                <div className="row form-group">
                    <label>Character Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.currentTarget.value)}
                        placeholder="Character Name"
                    />
                </div>

                <div className="row form-group">
                    <label>Race</label>
                    <select
                        value={newRace}
                        onChange={(e) => setNewRace(e.target.value)}
                    >
                        <option value="Human">Human</option>
                        <option value="Elf">Elf</option>
                        <option value="Dwarf">Dwarf</option>
                        <option value="Halfling">Halfling</option>
                        <option value="Dragonborn">Dragonborn</option>
                        <option value="Gnome">Gnome</option>
                        <option value="Half-Elf">Half-Elf</option>
                        <option value="Half-Orc">Half-Orc</option>
                        <option value="Tiefling">Tiefling</option>
                    </select>
                </div>

                <div className="row form-group">
                    <label>Class</label>
                    <select
                        value={newClass}
                        onChange={(e) => setNewClass(e.target.value)}
                    >
                        <option value="Fighter">Fighter</option>
                        <option value="Wizard">Wizard</option>
                        <option value="Rogue">Rogue</option>
                        <option value="Cleric">Cleric</option>
                        <option value="Ranger">Ranger</option>
                        <option value="Paladin">Paladin</option>
                        <option value="Barbarian">Barbarian</option>
                        <option value="Bard">Bard</option>
                        <option value="Druid">Druid</option>
                        <option value="Monk">Monk</option>
                        <option value="Sorcerer">Sorcerer</option>
                        <option value="Warlock">Warlock</option>
                    </select>
                </div>

                <div className="row form-group">
                    <label>Alignment</label>
                    <select
                        value={newAlignment}
                        onChange={(e) => setNewAlignment(e.target.value)}
                    >
                        <option value="Lawful Good">Lawful Good</option>
                        <option value="Neutral Good">Neutral Good</option>
                        <option value="Chaotic Good">Chaotic Good</option>
                        <option value="Lawful Neutral">Lawful Neutral</option>
                        <option value="True Neutral">True Neutral</option>
                        <option value="Chaotic Neutral">Chaotic Neutral</option>
                        <option value="Lawful Evil">Lawful Evil</option>
                        <option value="Neutral Evil">Neutral Evil</option>
                        <option value="Chaotic Evil">Chaotic Evil</option>
                    </select>
                </div>

                <div className="row form-group">
                    <label>Height (in cm)</label>
                    <input
                        type="number"
                        value={newHeight}
                        onChange={(e) => setNewHeight(parseInt(e.currentTarget.value))}
                        placeholder="Height"
                    />
                </div>

                {/* Character Attributes */}
                <h3>Attributes</h3>
                <div className="attributes-container">
                    {Object.entries(attributes).map(([key, value]) => (
                        <div key={key} className="row form-group">
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            <input
                                type="number"
                                name={key}
                                value={value}
                                onChange={handleAttributeChange}
                            />
                        </div>
                    ))}
                </div>

                <div className="row">
                    <button type="submit">Create Character</button>
                </div>
            </form>
        </main>
    );
}

export default CreateCharacter;
