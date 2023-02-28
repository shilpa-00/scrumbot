import React, { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../App";
import { TeamContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenContext } from '../App'

const layout = (WrappedComponent) => {
  const Layout = ({ teams, setTeams }) => {
    const [activeButton, setActiveButton] = useState(null);
    const [createTeam, setCreateTeam] = useState(false);
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const [team, setTeam] = useContext(TeamContext);
    const [token] = useContext(TokenContext);
    // console.log(token);
    const nameRef = useRef();
    const sizeRef = useRef();

    const handleTeamClick = (team) => {
      setActiveButton(team.name);
      setTeam(team);
    };

    const handleVisibility = () => {
      setCreateTeam(true);
      // console.log(createTeam);
    }
    useEffect(() => {
      axios.get("http://localhost:5000/team/findAll")
        .then((data) => {
          console.log(data.data)
          setTeams(data.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }, []);
    const handleCreate = () => {
      if (nameRef.current.value !== '' && sizeRef.current.value !== '') {
        axios.post("http://localhost:5000/team/create",
          JSON.stringify({
            TeamName: nameRef.current.value,
            Count: sizeRef.current.value
          }),
          {
            headers:
            {
              'Content-Type': 'Application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
        ).then((data) => {
          setTeams([...teams, { _id:data.data.id,TeamName: nameRef.current.value, Count: sizeRef.current.value }]);
          nameRef.current.value = "";
          sizeRef.current.value = "";
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
        }).catch((error) => {
          console.log(error.message);
          toast.error(`${error.message}!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
      }
      else {
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

    const handleChange = () => {
      navigate('/retro');
    }

    return (
      <div className="w-screen m-10">
        <ToastContainer />
        {createTeam === true ?
          (<div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-6 items-center">
              <h1 className="text-4xl text-primary font-bold">Team</h1>
              <input type="text" ref={nameRef} className="inp" placeholder="Team Name" />
              <input type="number" ref={sizeRef} className="inp" placeholder="Team Size" />
              <button onClick={handleCreate} className="btn">
                Create
              </button>
            </div>
          </div>) :
          (<div className="flex flex-col gap-4 h-full">
            <div className="flex justify-center text-4xl text-primary font-extrabold">Scrumbot</div>
            <div className="flex justify-between mt-6">
              <h1 className="text-2xl text-primary font-bold">Kickass Scrumtool</h1>
              <button className="bg-primary text-white w-28 rounded-xl hover:font-bold" onClick={handleVisibility}>
                Create Team
              </button>
            </div>
            <div className="flex justify-between text-xl text-primary font-bold">
              {team === null ? "Organization Level Metrics" : team.TeamName}
              {team === null ?
                "" :
                <button className="border border-primary px-4 rounded-xl font-normal hover:bg-primary hover:text-white" onClick={handleChange}>
                  Retro
                </button>}
            </div>
            <div className="h-2/3 bg-gray-100 rounded-3xl">
              {team === null ? <WrappedComponent name="All teams" /> : <WrappedComponent name={team.TeamName} />}
            </div>
            {teams.length > 0 ? (
              <div>
                <div className="text-lg text-primary font-bold">Teams</div>
                <div className="w-3/5">
                  <div className="grid grid-cols-6 gap-y-4 gap-x-12">
                    {teams.map((team) => (
                      <button className="btn" style={{ backgroundColor: team.TeamName === activeButton ? "#00005a" : "", color: team.TeamName === activeButton ? "white" : "" }} key={team._id} onClick={() => handleTeamClick(team)}>
                        {team.TeamName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>) : (<div></div>)
            }
          </div>)
        }
      </div>
    );
  };

  return Layout;
};

export default layout;