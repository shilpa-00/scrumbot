import React,{useState,useRef} from "react";
import {VscEdit} from "react-icons/vsc";
import {AiOutlineDelete} from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RetroLayout=()=>{
    const [questions,setQuestions]=useState([]);
    const questionRef=useRef();
    const handleSubmit=()=>{
        if(questionRef.current.value!==''){
            setQuestions([...questions,{id:questions.length+1,content:questionRef.current.value}])
            // console.log(questions);
            questionRef.current.value="";
        }
        else{
            toast.warn('Empty question!', {
                position: "top-center",
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
    const handleEdit=(question)=>{
        setQuestions(questions.filter(item=>item.content!==question.content));
        questionRef.current.value=question.content;
        questionRef.current.focus();
    }
    const handleDelete=(question)=>{
        setQuestions(questions.filter(item=>item.content!==question.content));
    }
    return(
        <div className="flex flex-col m-10 w-screen justify-between">
            <div className="flex justify-between">
                <div className="flex flex-col gap-4 text-primary">
                    <h1 className="text-xl font-extrabold">Kickass Scrumtool</h1>
                    <h2 className="font-bold">Team Infinity</h2>
                </div>
                <ToastContainer/>
                <button className="h-8 bg-primary text-white rounded-xl w-28 hover:font-bold">Schedule</button>
            </div>
            <div className="flex gap-10 place-items-center">
                <input type="text" className="h-14 w-1/4 rounded-xl border border-gray-300 pl-4 outline-none focus:border-gray-600 hover:border-gray-600" ref={questionRef} placeholder="Enter new question"/>
                <button className="btn" 
                onClick={handleSubmit}>
                    Create
                </button>
            </div>
            <div className={questions.length>0?"flex flex-col h-96 p-10 bg-gray-200 rounded-xl text-xl":""}>
                {questions.map(question=>{
                    return(
                        <div className="flex gap-4" key={question.id}>
                            <p>{question.content}</p>
                            <button onClick={()=>handleEdit(question)}><VscEdit/></button>
                            <button onClick={()=>handleDelete(question)}><AiOutlineDelete/></button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RetroLayout;