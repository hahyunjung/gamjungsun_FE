import React, { useState, useEffect } from 'react';
import './MyPage.css';

const MyPage = () => {
  const [displayText, setDisplayText] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const numStars = 5;

  const drawStar = (ctx, x, y, size) => {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawLines = (ctx, stars) => {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(stars[0].x, stars[0].y);
    for (let i = 1; i < stars.length; i++) {
      ctx.lineTo(stars[i].x, stars[i].y);
    }
    ctx.stroke();
  };

  const placeRandomStars = (ctx, canvas, container) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let stars = [];

    for (let i = 0; i < numStars; i++) {
      let x = (Math.random() * container.offsetWidth * 0.4) + container.offsetWidth * 0.3;
      let y = container.offsetHeight * 0.05 + container.offsetHeight * i * 0.07;
      const size = Math.random() * 3 + 3;
      drawStar(ctx, x, y, size);
      stars.push({ x, y });
    }

    stars.sort(function (a, b) {
      return a.y - b.y;
    });

    drawLines(ctx, stars);
  };

  const drawConstellations = () => {
    const container = document.getElementById("star-container");
    const canvas = document.getElementById("constellations");

    if (container && canvas) {
      const ctx = canvas.getContext("2d");
      function setCanvasSize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }

      setCanvasSize();
      placeRandomStars(ctx, canvas, container);
    }
  };

  useEffect(() => {
    drawConstellations();
  }, []);

  const handleConstellationClick = () => {
    setDisplayText('');
    setActiveButton('constellation');
    drawConstellations();
  };

  const handleGalleryClick = () => {
    setDisplayText('갤러리 아이콘입니다');
    setActiveButton('gallery');
    const canvas = document.getElementById("constellations");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="mypage-container">
      <nav className="navbar">
        <div className="logo">
          감정선
        </div>
        <div className="right-menu">
          <ul>
            <li><a href="#">Write</a></li>
            <li><a href="#">Feed</a></li>
            <li><a href="#">Search</a></li>
            <li><a href="#">Login/Sign</a></li>
          </ul>
        </div>
      </nav>
      <div className="profile-section">
        <div className="profile-image"></div>
        <a className='edit-btn' href="#">수정</a>
        <div className="profile-info">
          <h2>하현정</h2>
          <p>안녕하세요. 매일 일기쓰는 사람입니다.</p>
        </div>
      </div>
      <hr className="divider-line" />
      <div className="button-container">
        <button 
          className={`icon-button ${activeButton === 'constellation' ? 'active' : ''}`} 
          onClick={handleConstellationClick}
        >
          <img src="/constellations (1).png" alt="Constellation Icon" />
        </button>
        <button 
          className={`icon-button ${activeButton === 'gallery' ? 'active' : ''}`} 
          onClick={handleGalleryClick}
        >
          <img src="/gallery (2).png" alt="Gallery Icon" />
        </button>
      </div>
      {displayText && <p>{displayText}</p>}
      <div id="star-container" className="star-container">
        {activeButton === 'constellation' && <canvas id="constellations" className="canvas"></canvas>}
      </div>
    </div>
  );
}

export default MyPage;
