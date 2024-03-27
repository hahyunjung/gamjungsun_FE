import React, { useState, useEffect } from 'react';
import './MyPage.css';

const MyPage = () => {
  const [displayText, setDisplayText] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingModalOpen, setFollowingModalOpen] = useState(false); 
  const numStars = 5;
  const numFollowers = 100;
  const numFollowings = 200;
  const [following, setFollowing] = useState([
    { id: 1, name: '이름 1' },
    { id: 2, name: '이름 2' },
    { id: 3, name: '이름 3' },
    { id: 4, name: '이름 4' },
    { id: 5, name: '이름 5' },
    { id: 6, name: '이름 6' },
    { id: 7, name: '이름 7' },
    { id: 8, name: '이름 8' },
    { id: 9, name: '이름 9' },
    // 여기에 추가적인 팔로잉 목록 데이터를 추가할 수 있습니다.
  ]);


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

  const handleFollowersClick = () => {
    setFollowersModalOpen(true);
   
  };

  const handleFollowersModalClose = () => {
    setFollowersModalOpen(false);
  };

  const handleFollowingClick = () => {
    setFollowingModalOpen(true); 
  };


  const handleFollowingModalClose = () => {
    setFollowingModalOpen(false);
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
    if (canvas) { // 수정: canvas 요소의 존재 여부 확인
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const generateGalleryItems = () => {
    const items = [];
    const numGalleryItems = 32;
    for (let i = 0; i < numGalleryItems; i++){
      items.push(
        <div key={i} className="gallery-item">
          <div className="header">
            <p className="date">{getDate()}</p>
            <p className="feeling">행복</p>
          </div>
          <div className="content">
            <p>글 {i + 1}입니다.
            오늘의 기분은 정말 행복합니다.</p>
          </div>
        </div>
      );
    }
    return items;
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
      <div className="profile-info">
          <h2>하현정의 공간</h2>
   
        </div>
      <div className="profile-section">
        <div className="profile-image-follower">
          <div className="profile-image-edit">
        <img src="김수현3.jpeg" className="profile-image"/>
        <a className='edit-btn' href="#">수정</a>
        </div>
        
        <div className="numitem">게시물 5</div>
        <div className="followers-info">
           
            <button className="followers-button" onClick={handleFollowersClick}>팔로우 {numFollowers}</button>
            <button className="following-button" onClick={handleFollowingClick}>팔로워  {numFollowings}</button> 
        </div>
        </div>
       
      </div>

         {/* 팔로워 목록 모달 */}
         {followersModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleFollowersModalClose}>&times;</span>
            <h2 className="modal-title">팔로워</h2>
            <hr className="friend-divider" />
            <div className="friend-list">
              {following.map((followed, index) => (
                <div key={index} className="friend-item">
                  <img src="/김수현1.jpeg" alt="프로필 사진" className="friend-profile" />
                  <p className="friend-name">{followed.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 팔로잉 목록 모달 */}
      {followingModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleFollowingModalClose}>&times;</span>
            <h2 className="modal-title">팔로워</h2>
            <hr className="friend-divider" />
            <div className="friend-list">
              {following.map((followed, index) => (
                <div key={index} className="friend-item">
                  <img src="/김수현1.jpeg" alt="프로필 사진" className="friend-profile" />
                  <p className="friend-name">{followed.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
      <div className="gallery-container">
        {activeButton === 'gallery' && (
          <div className="gallery-grid">
            {generateGalleryItems()}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;