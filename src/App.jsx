import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Top from './pages/Top.jsx';
import Favorites from './pages/Favorites.jsx';
import About from './pages/About.jsx';

function App() {
  return (
    <Router>
      <div>
        {/* Навигационное меню (аналог твоих кнопок в HTML) */}
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/search">Поиск</Link>
          <Link to="/top">Топ аниме</Link>
          <Link to="/favorites">Избранное</Link>
          <Link to="/about">О проекте</Link>
        </nav>

        {/* Определяем маршруты */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/top" element={<Top />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
