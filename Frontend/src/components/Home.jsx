import React from "react";
import Sidebar from "./Sidebar";
import layout from "./layout";
import TeamDetails from "./TeamDetails";

const teams = [
    {
        name: "Team 1"
    },
    {
        name: "Team 2"
    },
    {
        name: "Team 3"
    },
    {
        name: "Team 4"
    },
    {
        name: "Team 5"
    },
    {
        name: "Team 6"
    },
    {
        name: "Team 7"
    },
    {
        name: "Team 8"
    },
    {
        name: "Team 9"
    },
    {
        name: "Team 10"
    },
    {
        name: "Team 11"
    },
    {
        name: "Team 12"
    },
];

const LayoutHOC=layout(TeamDetails, teams);

const Home=()=>{
    return(
        <div className="flex">
            <Sidebar/>
            <LayoutHOC/>
        </div>
    )
}

export default Home;