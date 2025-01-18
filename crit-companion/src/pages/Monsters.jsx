import { invoke } from "@tauri-apps/api/core";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles

import "./Monsters.css";

function Monsters() {
    const [monsters, setMonsters] = useState([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // Track current page
    const [totalCount, setTotalCount] = useState(0); // Track total number of monsters
    const [loading, setLoading] = useState(false);
    const limit = 10; // Define a constant limit
    const navigate = useNavigate();

    // Fetch monsters on initial render
    useEffect(() => {
        fetch_monsters();
        setCurrentPage(0);
    }, []);

    async function fetch_monsters(page = 0, filter = "") {
        const offset = page * limit;
        setLoading(true);
        try {
            const [fetchedMonsters, count] = await invoke("fetch_enemy_characters", { offset, limit, filter });
            setMonsters(fetchedMonsters); // Set the fetched monsters
            setTotalCount(count); // Set total count of monsters
            console.log(fetchedMonsters);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const nextPage = () => {
        if ((currentPage + 1) * limit < totalCount) {
            setCurrentPage((prev) => prev + 1); // Move to the next page
            fetch_monsters(currentPage + 1, name); // Fetch monsters for the next page
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1); // Move to the previous page
            fetch_monsters(currentPage - 1, name); // Fetch monsters for the previous page
        }
    };

    return (
        <main className="monster-container">
            {/* Header */}
            <header>
                <h1>Welcome to the Monster's Page</h1>
            </header>
    
            {/* Search Form */}
            <section className="monster-search">
                <form 
                    className="monster-search-form" 
                    onSubmit={(e) => {
                        e.preventDefault();
                        setCurrentPage(0); // Reset to the first page when searching
                        const filter = name.trim() ? name.trim() : ""; 
                        fetch_monsters(0, filter); // Fetch monsters
                    }}
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        placeholder="Search monsters..."
                    />
                    <button type="submit">Search</button>
                </form>
            </section>
    
            {/* monster List as a Table */}
            <section className="monster-list">
                <table>
                    <thead>
                        <tr>
                            <th width={200} >Name</th>
                            <th width={150} >Alignment</th>
                            <th width={200} >Type</th>
                            <th>CR</th>
                            <th>HP</th>
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
                        ) : monsters.length > 0 ? (
                            // Render monsters or empty rows if less than 10 monsters
                            [...monsters, ...Array(10 - monsters.length).fill(null)].map((monster, index) => (
                                <tr key={index}>
                                    {monster ? (
                                        <>
                                            <td>
                                              <a href={`/monster/${monster._id.$oid}`} className="tooltip">
                                                {monster.name}
                                                <span className="tooltip-text">Read more</span>
                                              </a>
                                            </td>
                                            <td>{monster.align}</td>
                                            <td>{monster.type}</td>
                                            <td>{monster.cr}</td>
                                            <td>{monster.hp}</td>
                                            <td>{monster.str}</td>
                                            <td>{monster.dex}</td>
                                            <td>{monster.con}</td>
                                            <td>{monster.int}</td>
                                            <td>{monster.wis}</td>
                                            <td>{monster.cha}</td>
                                        </>
                                    ) : (
                                        // Render empty cells for empty monsters
                                        Array.from({ length: 11 }).map((_, idx) => <td key={idx}></td>)
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11">No monsters found.</td>
                            </tr>
                        )}
                    </tbody>
                    </SkeletonTheme>
                </table>
            </section>
    
            {/* Pagination Controls */}
            <section className="monster-pagination-controls">
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

export default Monsters;
