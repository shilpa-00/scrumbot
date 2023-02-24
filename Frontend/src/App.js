import Login from './components/Login';
import Home from './components/Home';
import Retrospective from './components/Retrospective';
import React,{ useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const UserContext=React.createContext();

function App() {
  const [user,setUser]=useState();
  return (
      <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/retro' element={<Retrospective/>}/>
          </Routes>
      </Router>
  );
}

export default App;