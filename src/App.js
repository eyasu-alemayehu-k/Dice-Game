import Game from './components/Game';
import Home from './components/Home';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/play'} element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
