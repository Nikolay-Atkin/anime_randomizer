import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>О проекте</h1>
      <p>Anime Randomizer — приложение для поиска случайных аниме</p>
      <p>Использует API Shikimori.one</p>
    </div>
  );
};

export default About;