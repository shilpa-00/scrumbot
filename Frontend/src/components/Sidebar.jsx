import React,{useState} from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar=()=>{
    const [display, setDisplay]=useState(false);
    const navigate=useNavigate()
    const name="Shilpa Reddy"
    const arr=name.split(" ")
    const avatarname=arr[0].split("")[0]+arr[arr.length-1].split("")[0]
    const handleSubmit=()=>{
        navigate('/');
    }
    const handleVisibility=()=>{
        setDisplay(!display);
    }
    return(
        <div className="flex flex-col justify-end items-center pb-10 gap-4 bg-primary h-screen w-32">
            <div className={display?"text-red-500 px-2 py-1 rounded-md visible bg-white hover:font-bold":"invisible"}>
                <button onClick={handleSubmit}>Logout</button>
            </div>
            <button onClick={handleVisibility}>
                <Avatar sx={{bgcolor: "white",color:"#00005a",height:"60px",width:"60px",fontSize:"38px",fontWeight:"bold"}}>{avatarname}</Avatar>
            </button>
        </div>
    )
}

export default Sidebar;