// ============== Cấu hình ==============
const CONFIG = {
  title: "Gửi em bé đáng yêu của anh 💌",
  messages: [
    "Anh yêu em rất nhiều!",
    "Em là người đặc biệt nhất với anh ❤️",
    "Mỗi ngày bên em là một món quà ngọt ngào",
    "Dù em có dễ thương, khó chiều hay hơi bướng...",
    "Thì anh vẫn luôn thương em nhất! 🥰",
    "Em là mặt trời của đời anh 🌞",
    "Anh muốn cùng em đi đến cuối con đường",
    "Tình yêu của anh dành cho em là vô điều kiện",
    "Em làm cuộc sống của anh trọn vẹn hơn",
    "Anh sẽ luôn ở bên em, dù bất cứ chuyện gì xảy ra",
    "Nụ cười của em là động lực của anh",
    "Anh không thể tưởng tượng cuộc sống thiếu em",
    "Em là điều tuyệt vời nhất từng xảy đến với anh 💕"
  ],
  colors: {
    primary: "#ff66a3",
    secondary: "#ff4d88",
    text: "#555",
    background1: "#ffe6f0",
    background2: "#ffe0f7"
  },
  timings: {
    messageChange: 3000,
    heartAnimation: 1.2,
    floatAnimation: [2, 5]
  }
};

// ============== Khởi tạo ==============
document.head.innerHTML = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gửi em 💖</title>
`;

// Thêm CSS
const style = document.createElement('style');
style.textContent = `
  body {
    background: linear-gradient(135deg, ${CONFIG.colors.background1}, ${CONFIG.colors.background2});
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    overflow: hidden;
  }
  .card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    text-align: center;
    animation: fadeIn 1s ease;
    position: relative;
    overflow: hidden;
  }
  h1 {
    color: ${CONFIG.colors.primary};
    font-size: 28px;
    margin-bottom: 20px;
  }
  .message-container {
    height: 300px;
    position: relative;
  }
  .message {
    position: absolute;
    width: 100%;
    color: ${CONFIG.colors.text};
    font-size: 18px;
    line-height: 1.6;
    opacity: 0;
    transition: all 1s ease;
    transform: translateY(20px);
  }
  .message.active {
    opacity: 1;
    transform: translateY(0);
  }
  .heart {
    font-size: 32px;
    animation: pulse ${CONFIG.timings.heartAnimation}s infinite;
    color: ${CONFIG.colors.secondary};
    margin-top: 20px;
  }
  .floating-hearts {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  .floating-heart {
    position: absolute;
    font-size: 20px;
    color: ${CONFIG.colors.secondary};
    animation: float linear;
    pointer-events: none;
  }
  @keyframes fadeIn {
    from {opacity: 0; transform: translateY(20px);}
to {opacity: 1; transform: translateY(0);}
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  @keyframes float {
    to {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============== Tạo giao diện ==============
const body = document.body;
const card = document.createElement('div');
card.className = 'card';

card.innerHTML = `
  <h1>${CONFIG.title}</h1>
  <div class="message-container"></div>
  <div class="heart">❤</div>
  <div class="floating-hearts"></div>
`;

body.appendChild(card);

// Thêm DOCTYPE
const docType = document.implementation.createDocumentType('html', '', '');
document.insertBefore(docType, document.firstChild);

// ============== Xử lý logic ==============
const messageContainer = document.querySelector('.message-container');
const floatingHearts = document.querySelector('.floating-hearts');

// Tạo các message
CONFIG.messages.forEach((msg) => {
  const messageElement = document.createElement('p');
  messageElement.className = 'message';
  messageElement.textContent = msg;
  messageContainer.appendChild(messageElement);
});

// Hiệu ứng chuyển đổi message
let currentIndex = 0;
const allMessages = document.querySelectorAll('.message');

function showNextMessage() {
  allMessages.forEach(msg => msg.classList.remove('active'));
  allMessages[currentIndex].classList.add('active');
  currentIndex = (currentIndex + 1) % CONFIG.messages.length;
  createFloatingHeart();
}

// Tạo trái tim bay
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.innerHTML = '❤';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = (Math.random() * 
    (CONFIG.timings.floatAnimation[1] - CONFIG.timings.floatAnimation[0]) + 
    CONFIG.timings.floatAnimation[0]) + 's';
  floatingHearts.appendChild(heart);
  
  setTimeout(() => heart.remove(), CONFIG.timings.floatAnimation[1] * 1000);
}

// Bắt đầu hiển thị
showNextMessage();
setInterval(showNextMessage, CONFIG.timings.messageChange);

// Tương tác khi di chuột
card.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.7) {
    createFloatingHeart();
  }
});

// Tự động tạo trái tim bay ngẫu nhiên
setInterval(() => {
  if (Math.random() > 0.5) {
    createFloatingHeart();
  }
}, 1000);