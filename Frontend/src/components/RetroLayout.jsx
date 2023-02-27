import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../App";
import { TeamContext } from "../App";
import { VscEdit } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RetroLayout = () => {
    const [user] = useContext(UserContext);
    const [checked, setChecked] = useState([]);
    const [team] = useContext(TeamContext)
    // console.log(user + " " + team.name);
    const [questions, setQuestions] = useState([]);
    const questionRef = useRef();
    // Return classes based on whether item is checked
    const isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";
    const handleSubmit = () => {
        if (questionRef.current.value !== "") {
            setQuestions([...questions, questionRef.current.value]);
            // console.log(questions);
            questionRef.current.value = "";
        } else {
            toast.warn("Empty question!", {
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
    };
    const handleEdit = (question) => {
        setQuestions(questions.filter((item) => item !== question));
        questionRef.current.value = question;
        questionRef.current.focus();
    };
    function uncheckElements() {
        var uncheck = document.querySelectorAll("input[type=checkbox]");
        for (var i = 0; i < uncheck.length; i++) {
            uncheck[i].checked = false;
        }
    }
    const handleDelete = () => {
        if (checked.length !== 0) {
            setQuestions(questions.filter((item) => checked.indexOf(item) === -1));
            setChecked([]);
            uncheckElements();
            // console.log(checked);
        } else {
            toast.warn("Question(s) are Not Selected!", {
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
    };
    // Add/Remove checked item from list
    const handleCheck = (event) => {
        // console.log("Handle", checked);
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };
    return (
        <div className="flex flex-col m-10 w-screen gap-10">
            <div className="flex justify-center text-4xl text-primary font-extrabold">Scrumbot</div>
            <div className="flex justify-between">
                <div className="flex flex-col gap-4 text-primary">
                    <h1 className="text-2xl font-extrabold">Kickass Scrumtool</h1>
                    <h2 className="text-xl font-bold">{(team)?team.name:''}</h2>
                </div>
                <ToastContainer />
                <button className="h-8 bg-primary text-white rounded-xl w-28 hover:font-bold">Schedule</button>
            </div>
            <div className="flex flex-col gap-4 mt-6">
                <label className="text-lg">Write your question?</label>
                <div className="flex gap-10 place-items-center">
                    <input type="text" className="h-14 w-1/4 rounded-xl border border-gray-300 pl-4 outline-none focus:border-gray-600 hover:border-gray-600" ref={questionRef} placeholder="Enter new question" />
                    <button className="btn"
                        onClick={handleSubmit}>
                        Create
                    </button>
                </div>
            </div>
            <div>
                {questions.length>0 && (<button onClick={() => handleDelete()}>
                    <AiOutlineDelete />
                </button>)}

            </div>
            <div className={questions.length > 0 ? "flex flex-col p-10 gap-2 bg-gray-200 rounded-xl text-xl" : ""}>
                {questions.map((question, idx) => (
                    <div className="flex gap-4" key={idx}>
                        <input value={question} type="checkbox" onChange={handleCheck} />
                        <p className={isChecked(question)}>{question}</p>
                        <button onClick={() => handleEdit(question)}>
                            <VscEdit />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RetroLayout;