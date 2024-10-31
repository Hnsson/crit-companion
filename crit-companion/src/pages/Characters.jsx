import { invoke } from "@tauri-apps/api/core";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles

import "./Characters.css";

import BackButton from "../components/BackButton";

function Characters() {
    const [characters, setCharacters] = useState([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // Track current page
    const [totalCount, setTotalCount] = useState(0); // Track total number of characters
    const [loading, setLoading] = useState(false);
    const limit = 10; // Define a constant limit
    const navigate = useNavigate();

    // Fetch characters on initial render
    useEffect(() => {
        fetch_characters();
        setCurrentPage(0);
    }, []);

    async function fetch_characters(page = 0, filter = "") {
        const offset = page * limit;
        setLoading(true);
        try {
            const [fetchedCharacters, count] = await invoke("fetch_characters", { offset, limit, filter });
            setCharacters(fetchedCharacters); // Set the fetched characters
            setTotalCount(count); // Set total count of characters
            console.log(fetchedCharacters);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const nextPage = () => {
        if ((currentPage + 1) * limit < totalCount) {
            setCurrentPage((prev) => prev + 1); // Move to the next page
            fetch_characters(currentPage + 1, name); // Fetch characters for the next page
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1); // Move to the previous page
            fetch_characters(currentPage - 1, name); // Fetch characters for the previous page
        }
    };

    return (
        <main className="character-container">
            {/* Header */}
            <header>
                <h1>Crit-Companion Character Page</h1>
            </header>
    
            {/* Search Form */}
            <section className="character-search">
                <form 
                    className="character-search-form" 
                    onSubmit={(e) => {
                        e.preventDefault();
                        setCurrentPage(0); // Reset to the first page when searching
                        const filter = name.trim() ? name.trim() : ""; 
                        fetch_characters(0, filter); // Fetch characters
                    }}
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        placeholder="Search characters..."
                    />
                    <button type="submit">Search</button>
                </form>
    
                {/* Button to navigate to Create Character Page */}
                <p className="character-create-btn-p">
                    Don't have a character yet? <a className="character-create-btn" href="/create-character">
                        Create it here!
                    </a>
                </p>

            </section>
    
            {/* Character List as a Table */}
            <section className="character-list">
                <table>
                    <thead>
                        <tr>
                            <th width={200} >Name</th>
                            <th width={150} >Alignment</th>
                            <th>Height (cm)</th>
                            <th width={100} >Race</th>
                            <th width={130} >Class</th>
                            <th>STR</th>
                            <th>DEX</th>
                            <th>CON</th>
                            <th>INT</th>
                            <th>WIS</th>
                            <th>CHA</th>
                        </tr>
                    </thead>
                    <SkeletonTheme baseColor="#333333" highlightColor="#6d6d6d">
                    <tbody>
                        {loading ? (                           
                            // Render skeletons when loading
                            Array.from({ length: 10 }).map((_, index) => (
                                <tr key={index}>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                </tr>
                            ))
                        ) : characters.length > 0 ? (
                            // Render characters or empty rows if less than 10 characters
                            [...characters, ...Array(10 - characters.length).fill(null)].map((character, index) => (
                                <tr key={index}>
                                    {character ? (
                                        <>
                                            <td>{character.name}</td>
                                            <td>{character.alignment}</td>
                                            <td>{character.height}</td>
                                            <td>{character.race}</td>
                                            <td>{character.class}</td>
                                            <td>{character.attributes.strength}</td>
                                            <td>{character.attributes.dexterity}</td>
                                            <td>{character.attributes.constitution}</td>
                                            <td>{character.attributes.intelligence}</td>
                                            <td>{character.attributes.wisdom}</td>
                                            <td>{character.attributes.charisma}</td>
                                        </>
                                    ) : (
                                        // Render empty cells for empty characters
                                        Array.from({ length: 11 }).map((_, idx) => <td key={idx}></td>)
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11">No characters found.</td>
                            </tr>
                        )}
                    </tbody>
                    </SkeletonTheme>
                </table>
            </section>
    
            {/* Pagination Controls */}
            <section className="character-pagination-controls">
                <button 
                    onClick={prevPage} 
                    disabled={currentPage === 0 || loading} 
                    className={(currentPage === 0 || loading) ? 'disabled' : ''}
                >
                    Previous
                </button>
                <p>{currentPage + 1} - {Math.ceil(totalCount / limit)}</p> {/* Display current page and total pages */}
                <button 
                    onClick={nextPage} 
                    disabled={(currentPage + 1) * limit >= totalCount || loading} 
                    className={((currentPage + 1) * limit >= totalCount || loading) ? 'disabled' : ''}
                >
                    Next
                </button>
            </section>
        </main>
    );
}

export default Characters;
