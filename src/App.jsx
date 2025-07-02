import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage.jsx';
import Search from './pages/SearchPage.jsx';
import Top from './pages/TopPage.jsx';
import Favorites from './pages/FavoritesPage.jsx';
import About from './pages/AboutPage.jsx';



function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Anime Randomizer</h1>
          <p>Открой для себя новые аниме!</p>
        </header>

        <nav className="nav">
          <Link to="/" className="nav-link">Главная</Link>
           <Link to="/top" className="nav-link">Топ</Link>
          <Link to="/search" className="nav-link">Поиск</Link>
          <Link to="/favorites" className="nav-link">Избранное</Link>
          <Link to="/about" className="nav-link">О проекте</Link>
        </nav>

     
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
             <Route path="top" element={<Top />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2023 Anime Randomizer</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;