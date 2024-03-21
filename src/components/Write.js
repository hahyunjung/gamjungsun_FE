import React, { useState } from 'react';
import './Write.css';
import { Link, useNavigate } from 'react-router-dom'; 

const Write = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showEmotionModal, setShowEmotionModal] = useState(false);

const navigate = useNavigate(); 

  const handlePublishClick = () => {
    setSelectedEmotion("우울");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    handleGoToHome();
  };



  const handleGoToHome = () => {
    navigate('/'); 
    console.log("Go to home page");
  };

  return (
    <div className="write-container" >
      <div className="navbar">
        <div className="logo">감정선</div>
        <button className="publish-button" onClick={handlePublishClick}>발행</button>
      </div>
      <div className="content">
        {/* 모달 */}
        {showModal && (
          <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content fade-in">
              <p>{`오늘 당신의 감정은 ${selectedEmotion}이군요.`}</p>
            </div>
          </div>
        )}
        

        <div className="form-container">
        <input type="text" className="title-input" placeholder="제목" />
          <textarea className="content-input" placeholder="오늘, 당신의 감정은 어떤가요 ?"></textarea>

        </div>
      </div>
    </div>
  );
};

export default Write;
