import Login from './components/Login';
import Home from './components/Home';
import Retrospective from './components/Retrospective';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
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