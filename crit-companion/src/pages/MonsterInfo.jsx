import React from "react";
import { useParams } from "react-router-dom";

import "./MonsterInfo.css";

function MonsterInfo() {
    const { param } = useParams();

    console.log(param)

    return <h2>Welcome to the Monster info! Parmeter: {param}</h2>;
}

export default MonsterInfo;
