import React, { useState, useEffect } from 'react';
import '../index.css';

const AnimeGenerator = () => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomAnime = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://shikimori.one/api/animes?order=random&limit=50');
      if (!response.ok) throw new Error('Ошибка API');
      
      const data = await response.json();
      const filtered = data.filter(item => 
        ['tv', 'movie'].includes(item.kind) && 
        item.score > 5 &&
        !/优酷|世界杯|变态赛|独播|promo|pv|cm|реклама/i.test(`${item.name}${item.russian}`)
      );
      
      if (filtered.length === 0) throw new Error('Не найдено подходящих аниме');
      
      const selectedAnime = filtered[Math.floor(Math.random() * filtered.length)];
      const detailsResponse = await fetch(`https://shikimori.one/api/animes/${selectedAnime.id}`);
      const fullDetails = await detailsResponse.json();
      
      setAnime({
        ...selectedAnime,
        description: fullDetails.description,
        description_html: fullDetails.description_html,
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRandomAnime(); }, []);

  return (
    <div className="home-page">
      <h1>Нажми на кнопку чтобы получить аниме</h1>
      
      <button 
        onClick={fetchRandomAnime}
        disabled={loading}
        className="generate-btn"
      >
        {loading ? 'Ищем аниме...' : 'Сгенерировать Аниме'}
      </button>

      {error ? (
        <div className="error-message">
          Ошибка: {error}. <button onClick={fetchRandomAnime}>Попробовать снова</button>
        </div>
      ) : loading ? (
        <div className="loading">Загрузка...</div>
      ) : anime ? (
        <div className="anime-card">
          <h2>{anime.russian || anime.name}</h2>
          {anime.image && (
            <img 
              src={`https://shikimori.one${anime.image.original}`} 
              alt={anime.russian || anime.name}
              className="anime-poster"
            />
          )}
          <div className="anime-details">
            <p><strong>Рейтинг:</strong> {anime.score || 'нет данных'}</p>
            <p><strong>Год:</strong> {anime.aired_on?.split('-')[0] || 'неизвестно'}</p>
            <p><strong>Эпизоды:</strong> {anime.episodes || '?'}</p>
            <p><strong>Статус:</strong> {anime.status === 'released' ? 'Завершено' : 'Выходит'}</p>
          </div>
          
          <div className="anime-description">
            <h3>Описание:</h3>
            {anime.description_html ? (
              <div dangerouslySetInnerHTML={{ __html: anime.description_html }} />
            ) : (
              <p>{anime.description || 'Описание отсутствует.'}</p>
            )}
          </div>
          
      
        </div>
      ) : (
        <p>Не удалось загрузить аниме</p>
      )}
    </div>
  );
};

export default AnimeGenerator;