document.addEventListener("DOMContentLoaded", function () {

  const numStars = 7;
  const container = document.getElementById("container");
  const canvas = document.getElementById("constellations");
  const ctx = canvas.getContext("2d");
  let stars = []; // 별 좌표 배열
  
  //canvas크기 설정
  function setCanvasSize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  // 랜덤 좌표 생성, stars배열에 추가, 좌표에 별 그리기
  function placeRandomStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas 초기화
    stars = []; // 별들의 좌표를 저장할 배열
    let j = 0.1
    for (let i = 0; i < numStars; i++) {
      let x = (Math.random() * container.offsetWidth * 0.4) + container.offsetWidth * 0.05;
      let y = (Math.random() * container.offsetHeight * 0.3) + container.offsetHeight * 0.1;

      const size = Math.random() * 3 + 3; // 크기를 랜덤하게 설정
      drawStar(x, y, size); // 별 그리기
      stars.push({ x, y }); // 별의 좌표를 배열에 추가
    }

    //stars배열 정렬
    stars.sort(function (a, b) {
      return (a.x + a.y) - (b.x + b.y);
    });

    drawLines();
  }

  // 별 그리는 함수
  function drawStar(x, y, size) {
    ctx.fillStyle = "#fff"; // 별 색상 설정
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 별들을 이어주는 선 그리는 함수
  function drawLines() {
    ctx.strokeStyle = "#fff"; // 선의 색상 설정
    ctx.beginPath();
    ctx.moveTo(stars[0].x, stars[0].y); // 첫 번째 별의 좌표로 이동

    for (let i = 1; i < stars.length; i++) {
      ctx.lineTo(stars[i].x, stars[i].y); // 다음 별의 좌표로 선 그리기
    }

    ctx.stroke(); // 선 그리기
  }

  // 페이지 로드시 별자리 배치 및 Canvas 크기 설정
  setCanvasSize();
  placeRandomStars();
});
