import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useParams } from "react-router-dom";

import BackButton from "../components/BackButton";

import "./MonsterInfo.css";

function MonsterInfo() {
    const { param } = useParams();
    const [monster, setMonster] = useState();

    useEffect(() => {
        fetch_monster(param);
    }, [param]);

    async function fetch_monster(id) {
        try {
            const fetchedMonster = await invoke("fetch_enemy_character_by_id", { id });
            setMonster(fetchedMonster); // Set the fetched monster data
        } catch (error) {
            console.error(error);
        }
    }

    if (!monster) return <h2>Loading...</h2>;

    return (
        <div className="monster-info-container">
            <BackButton />
            <h1>{monster.name || "Unknown Monster"}</h1> {/* Show a default name if not available */}
            
            <div className="monster-info-basic">
                <div>
                    <h4>Type</h4>
                    <p>{monster.type || "Not found"}</p>
                </div>
                <div>
                    <h4>Size</h4>
                    <p>{monster.size || "Who knows..."}</p>
                </div>
                <div>
                    <h4>Armor Class (AC)</h4>
                    <p>{monster.ac || "Not found"}</p>
                </div>
                <div>
                    <h4>Hit Points (HP)</h4>
                    <p>{monster.hp || "You'll have to guess!"}</p>
                </div>
            </div>

            <div className="monster-info-attributes">
                <div>
                    <h4>Strength</h4>
                    <p>{monster.str || "-"}</p>
                </div>
                <div>
                    <h4>Dexterity</h4>
                    <p>{monster.dex || "-"}</p>
                </div>
                <div>
                    <h4>Constitution</h4>
                    <p>{monster.con || "-"}</p>
                </div>
                <div>
                    <h4>Intelligence</h4>
                    <p>{monster.int || "-"}</p>
                </div>
                <div>
                    <h4>Wisdom</h4>
                    <p>{monster.wis || "-"}</p>
                </div>
                <div>
                    <h4>Charisma</h4>
                    <p>{monster.cha || "-"}</p>
                </div>
            </div>

            <div className="monster-info-stats">
                <h3>Additional Info</h3>
                <div className="stat">
                    <span className="stat-name">CR</span>
                    <span className="stat-value">{monster.cr || "Unknown"}</span>
                </div>
                <div className="stat">
                    <span className="stat-name">Speed</span>
                    <span className="stat-value">{monster.speed || "Unknown"}</span>
                </div>
                <div className="stat">
                    <span className="stat-name">Alignment</span>
                    <span className="stat-value">{monster.align || "Unknown"}</span>
                </div>
                <div className="stat">
                    <span className="stat-name">Source</span>
                    <span className="stat-value">{monster.source || "Unknown"}</span>
                </div>
            </div>
        </div>
    );
}

export default MonsterInfo;
