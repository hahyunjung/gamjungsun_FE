import React, { useState, useEffect } from 'react';
import './MyPage.css';

const stars = [
  { id: 1, top: '130%', left: '20%' },
  { id: 2, top: '190%', left: '60%' },
  { id: 3, top: '250%', left: '80%' },
  { id: 4, top: '310%', left: '30%' },
  { id: 5, top: '400%', left: '50%' },
];

const MyPage = () => {
  const [activeStar, setActiveStar] = useState(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > prevScrollPos) {
        // 스크롤을 내릴 때 모달을 열고 활성화할 별을 설정
        const starsInView = stars.filter(star => {
          const starElement = document.getElementById(`star-${star.id}`);
          const rect = starElement.getBoundingClientRect();
          return rect.top >= 0 && rect.bottom <= window.innerHeight;
        });
        if (starsInView.length > 0) {
          setActiveStar(starsInView[0].id);
        } else {
          setActiveStar(null);
        }
      }
      setPrevScrollPos(currentScrollPos);
      
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCloseModal = () => {
    setActiveStar(null);
  };

  const renderStars = () => {
    return stars.map(star => (
      <div
        key={star.id}
        id={`star-${star.id}`}
        className="star"
        style={{ top: star.top, left: star.left }}
      />
    ));
  };

  const renderModal = () => {
    if (activeStar !== null) {
      return (
        <div className="modal">
          <p> {activeStar}번째 이야기입니다.</p>
          <button onClick={handleCloseModal}>닫기</button>
        </div>
      );
    }
    return null;
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
        <div className="profile-info">
          <h2>하현정</h2>
          <p>안녕하세요. 매일 일기쓰는 사람입니다.</p>
        </div>
      </div>
      <hr className="divider-line" />
      <div className="star-container">
        {renderStars()}
        {renderModal()}
      </div>
    </div>
  );
}

export default MyPage;
