import { useState, useEffect } from 'react'
import './App.css'

const facts = [
  'Во всех приложениях у меня стоит темная тема',
  'Когда я работаю, я всегда слушаю музыку',
  'Мой основной рабочий инструмент — Arch linux с тайловым менеджером Hyprland',
  'В свободное время я летаю в X-Plane 11',
  '67',
  'Этот факт меняется каждый раз когда ты переключаешь слайдер сверху!'
];

const DJ_START_DATE = new Date(2025, 1, 20); // 20 февраля 2025

const plural = (n, forms) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
};

const getDjDuration = () => {
  const now = new Date();
  let years = now.getFullYear() - DJ_START_DATE.getFullYear();
  let months = now.getMonth() - DJ_START_DATE.getMonth();
  let days = now.getDate() - DJ_START_DATE.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} ${plural(years, ['год', 'года', 'лет'])}`);
  if (months > 0) parts.push(`${months} ${plural(months, ['месяц', 'месяца', 'месяцев'])}`);
  if (days > 0) parts.push(`${days} ${plural(days, ['день', 'дня', 'дней'])}`);
  if (parts.length === 0) return 'Сегодня первый день!';
  return parts.join(' ');
};

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mode, setMode] = useState('developer');
  const [displayMode, setDisplayMode] = useState('developer');
  const [isExiting, setIsExiting] = useState(false);
  const [djDuration, setDjDuration] = useState(getDjDuration);

  const pickRandom = () => {
    const randIndex = Math.floor(Math.random() * facts.length);
    setSelectedItem(facts[randIndex])
  }

  useEffect(() => {
    pickRandom();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setDjDuration(getDjDuration()), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (mode === displayMode) return;
    setIsExiting(true);
    const id = setTimeout(() => {
      if (mode === 'developer') pickRandom();
      setDisplayMode(mode);
      setIsExiting(false);
    }, 300);
    return () => clearTimeout(id);
  }, [mode, displayMode]);

  return (
    <>
      <div className="container jetbrains-mono">
        <nav>
          <div className="logo"></div>
          <ul>
            <li className='switch'>
              <div className={`switch-pill${mode === 'dj' ? ' switch-pill--right' : ''}`} />
              <span
                className={mode === 'developer' ? 'active' : ''}
                onClick={() => setMode('developer')}
              >Developer</span>
              <span
                className={mode === 'dj' ? 'active' : ''}
                onClick={() => setMode('dj')}
              >DJ</span>
            </li>
          </ul>
        </nav>

        <main>
          <div className="cards">
            {displayMode === 'developer' ? (
              <div className={`cards_windowstyle_container${isExiting ? ' is-exiting' : ''}`} key="developer">
                <div className="card big-card">
                  <div className="photo">
                    <img src="" alt="" />
                    <p>lilcodder</p>
                    <p>Frontend разработчик, работаю с различными языками, которые описаны в соседней карточке.</p>
                  </div>
                </div>
                <div className="card">
                  <p>Stack</p>
                  <div className="carousel">
                    <p>тут будут очень крутые карточки</p>
                  </div>
                </div>
                <div className="card">
                  <p>Contacts</p>
                  <div className="contact__info">
                    <p>@lilcodder_official</p>
                    <p>@lilcodder</p>
                  </div>
                </div>
                <div className="card">
                  <p>GitHub</p>
                  <a href="https://github.com/lilcodder">github.com/lilcodder</a>
                </div>
                <div className="card">
                  <p>Случайный факт обо мне:</p>
                  <div className="fact">
                    <p>{selectedItem}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`cards_windowstyle_container${isExiting ? ' is-exiting' : ''}`} key="dj">
                <div className="card big-card">
                  <p>lilcodder</p>
                  <p>DJ из Челябинска, играю на различных площадках города. От маркетов до спортивных мероприятий.</p>
                </div>
                <div className="card">
                  <p>Последний записанный сет</p>
                  <p></p>
                </div>
                <div className="card">
                  <p>Мои стили</p>
                </div>
                <div className="card">
                  <p>Следующий ивент</p>
                </div>
                <div className="card">
                  <p>Сколько я уже в диджеинге?</p>
                  <div className="fact">
                    <p>{djDuration}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer>
          <p className='policy'>2026 Все права защищены.</p>
        </footer>
      </div>
    </>
  )
}

export default App
