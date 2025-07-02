import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const TopAnimePage = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await axios.get(
          'https://shikimori.one/api/animes?order=popularity&limit=10',
          { headers: { 'User-Agent': 'AnimeRandomizer/1.0' } }
        );
        setTopAnime(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  return (
    <div>
      <h1>Топ аниме</h1>
      
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div>
          <div className="top-anime-page">
  <div className="anime-list">
    {topAnime.map(anime => (
      <div key={anime.id} className="anime-item">
        <h3>{anime.russian || anime.name}</h3>
              {anime.image && (
                <img 
                  src={`https://shikimori.one${anime.image.preview}`} 
                  alt={anime.russian}
                  width="200"
                />
              )}
              <p>Рейтинг: {anime.score || 'нет'}</p>
      </div>
    ))}
  </div>
</div>
          
        </div>
      )}
    </div>
  );
};

export default TopAnimePage;