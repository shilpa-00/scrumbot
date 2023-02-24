import React, { useState } from "react";

const layout = (WrappedComponent, teams) => {
  const Layout = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [activeButton, setActiveButton] = useState(null);

    const handleTeamClick = (team) => {
      setSelectedTeam(team);
      setActiveButton(team.name);
    };

    return (
      <div className="flex flex-col w-screen gap-10 m-10">
        <div className="flex justify-center text-4xl text-primary font-extrabold">Scrumbot</div>
        <div className="text-2xl text-primary font-bold">Kickass Scrumtool</div>
        <div className="text-lg text-primary font-bold">{selectedTeam===null?"Organization Level Metrics":selectedTeam.name}</div>
        <div className="h-2/3 bg-gray-100 rounded-3xl">
            {selectedTeam===null?<WrappedComponent name="All teams"/> :<WrappedComponent name={selectedTeam.name}/>}
        </div>   
        <div className="text-lg text-primary font-bold">Teams</div>
        <div className="w-3/5">
            <div className="grid grid-cols-6 gap-y-4 gap-x-12">
            {teams.map((team) => (
                <button className="navbtn" style={{backgroundColor:team.name===activeButton?"#00005a":"",color:team.name===activeButton?"white":""}} key={team.name} onClick={() => handleTeamClick(team)}>
                {team.name}
                </button>
            ))}
            </div>
        </div>
      </div>
    );
  };

  return Layout;
};

export default layout;