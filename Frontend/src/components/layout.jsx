import React, { useState,useRef,useContext } from "react";
import { UserContext } from "../App";
import { TeamContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const layout = (WrappedComponent) => {
  const Layout = ({teams,setTeams}) => {
    const [activeButton, setActiveButton] = useState(null);
    const [createTeam, setCreateTeam] = useState(false);
    const navigate=useNavigate();
    const [user]=useContext(UserContext);
    const [team,setTeam]=useContext(TeamContext);
    console.log(user);
    const nameRef=useRef();
    const sizeRef=useRef();

    const handleTeamClick = (team) => {
      setActiveButton(team.name);
      setTeam(team);
    };

    const handleVisibility=()=>{
      setCreateTeam(true);
      // console.log(createTeam);
    }

    const handleCreate=()=>{
      if(nameRef.current.value!=='' && sizeRef.current.value!==''){
        setTeams([...teams,{id:teams.length+1,name:nameRef.current.value,size:sizeRef.current.value}]);
        nameRef.current.value="";
        sizeRef.current.value="";
        setCreateTeam(false);
        toast.success('Team created successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
      }
      else{
        toast.warn('All fields are mandatory!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
      }
    }

    const handleChange=()=>{
      navigate('/retro');
    }

    return (
      <div className="w-screen m-10">
        <ToastContainer/>
      {createTeam===true?
      (<div className="flex justify-center items-center h-full">
        <div className="flex flex-col gap-6 items-center">
          <h1 className="text-4xl text-primary font-bold">Team</h1>
          <input type="text" ref={nameRef} className="inp" placeholder="Team Name"/>
          <input type="number" ref={sizeRef} className="inp" placeholder="Team Size"/>
          <button onClick={handleCreate} className="btn">
            Create
          </button>
        </div>
      </div>):
      (<div className="flex flex-col gap-10 h-full">
        <div className="flex justify-center text-4xl text-primary font-extrabold">Scrumbot</div>
        <div className="flex justify-between">
          <h1 className="text-2xl text-primary font-bold">Kickass Scrumtool</h1>
          <button className="bg-primary text-white w-28 rounded-xl hover:font-bold" onClick={handleVisibility}>
            Create Team
          </button>
        </div>
        <div className="flex justify-between text-xl text-primary font-bold">
          {team===null?"Organization Level Metrics":team.name}
          {team===null?
            "":
            <button className="border border-primary px-4 rounded-xl font-normal hover:bg-primary hover:text-white" onClick={handleChange}>
              Retro
            </button>}
        </div>
        <div className="h-2/3 bg-gray-100 rounded-3xl">
            {team===null?<WrappedComponent name="All teams"/> :<WrappedComponent name={team.name}/>}
        </div>
        {teams.length>0?(   
          <div>
          <div className="text-lg text-primary font-bold">Teams</div>
          <div className="w-3/5">
              <div className="grid grid-cols-6 gap-y-4 gap-x-12">
              {teams.map((team) => (
                  <button className="btn" style={{backgroundColor:team.name===activeButton?"#00005a":"",color:team.name===activeButton?"white":""}} key={team.name} onClick={() => handleTeamClick(team)}>
                  {team.name}
                  </button>
              ))}
              </div>
          </div>
          </div>):(<div></div>)
        }
      </div>)
    }
    </div>
    );
  };

  return Layout;
};

export default layout;