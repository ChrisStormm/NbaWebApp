import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import FindGamesFromDate from './pages/FindGamesFromDate'
import GamePage from './pages/GamePage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/games"
              element={<FindGamesFromDate/>}
            />
            <Route
              path="/games/game/:gameID"
              element={<GamePage/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
