import React from "react";
import {BsFillPersonFill,BsKeyFill} from 'react-icons/bs';
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login=()=>{
    const email=useRef('')
    const password=useRef('')
    const navigate=useNavigate();
    const handleSubmit=()=>{
        axios.post("http://localhost:5000/users/login",
                    {email:email.current.value,password:password.current.value}
                ).then((data)=>{
                    console.log(data.data.user)
                    navigate('/home');
                    email.current.value=''
                    password.current.value=''
                }).catch((error)=>{
                    console.log(error);
                    toast.error('Invalid credentials!', {
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
    return(
        <div className="flex items-center justify-center bg-primary h-screen font-serif">
            <div className="flex flex-col justify-center items-center gap-4 bg-white h-1/3 w-1/4 rounded-lg">
                <div className="flex justify-center text-brand text-4xl w-96 font-bold">Login</div>
                <div className="flex border border-gray-300 h-10 w-4/5 mt-4 rounded-xl overflow-hidden shadow-md shadow-brand hover:border-gray-400">
                    <BsFillPersonFill size={20} className="m-2"/>
                    <input type="email" placeholder="Email" ref={email} className="text-lg pl-2 w-80 outline-none"/>
                </div>
                <div className="flex border border-gray-300 h-10 w-4/5 rounded-xl overflow-hidden shadow-md shadow-brand hover:border-gray-400">
                    <BsKeyFill size={20} className="m-2"/>
                    <input type="password" placeholder="Password" ref={password} className="text-lg pl-2 w-80 outline-none"/>
                </div>
                <div className="flex justify-center mt-4 w-4/5 bg-brand rounded-xl hover:font-extrabold hover:text-md" onClick={handleSubmit}>
                    <button className="py-1 text-lg text-white">
                        LOGIN
                    </button>
                </div>
            </div>
            <ToastContainer/>
        </div> 
    )
}

export default Login;