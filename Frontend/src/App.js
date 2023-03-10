import Login from './components/Login';
import Home from './components/Home';
import Retrospective from './components/Retrospective';
import React,{ useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const UserContext=React.createContext();
const TeamContext=React.createContext();
const TokenContext=React.createContext();

function App() {
  const [user,setUser]=useState(null);
  const [team,setTeam]=useState(null);
  const [token,setToken]=useState(null);
  // setUser('Admin');
  return (
    <UserContext.Provider value={[user,setUser]}>
      <TeamContext.Provider value={[team,setTeam]}>
        <TokenContext.Provider value={[token,setToken]}>
        <Router>
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/retro' element={<Retrospective/>}/>
            </Routes>
        </Router>
        </TokenContext.Provider>
      </TeamContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
export {UserContext};
export {TeamContext};
export {TokenContext};