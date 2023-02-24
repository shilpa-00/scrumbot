import React, { useState } from "react";
import Sidebar from "./Sidebar";
import layout from "./layout";
import TeamDetails from "./TeamDetails";

const LayoutHOC=layout(TeamDetails);

const Home=()=>{
    const [teams,setTeams]=useState([]);
    return(
        <div className="flex">
            <Sidebar/>
            <LayoutHOC teams={teams} setTeams={setTeams}/>
        </div>
    )
}

export default Home;