import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchAnime = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://shikimori.one/api/animes?search=${encodeURIComponent(query)}&limit=12`,
        { headers: { 'User-Agent': 'AnimeRandomizer/1.0' } }
      );
      setResults(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Поиск аниме</h1>
      
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Название аниме"
        />
        <button 
          className="search-button" 
          onClick={searchAnime} 
          disabled={loading}
        >
          {loading ? '...' : 'Найти'}
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="anime-grid">
          {results.map(anime => (
            <div key={anime.id} className="anime-card">
              <h3>{anime.russian || anime.name}</h3>
              {anime.image && (
                <img 
                  src={`https://shikimori.one${anime.image.preview}`} 
                  alt={anime.russian}
                  className="anime-image"
                />
              )}
              <p>Рейтинг: {anime.score || 'нет'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;