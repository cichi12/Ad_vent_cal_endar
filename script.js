// Data for each day's image and message
const dayData = {
  1: { image: 'images/day-1.jpeg', text: '🎅 Surprise for Day 1!' },
  2: { image: 'images/day2.jpg', text: '🎄 Scratch to reveal your surprise for Day 2!' },
  3: { image: 'images/day3.jpg', text: '❄️ Stay cozy on Day 3!' },
  // 4: { image: 'images/day-4.jpg', text: '🎁 Enjoy Day 4!' },
  5: { image: 'images/day-5.mp4', text: '🎁 Watch the video for Day 5!' },
  24: { image: 'images/day24.jpg', text: '🎁 Merry Christmas!' },
};

// Select all boxes and the popup elements
const boxes = document.querySelectorAll('.box');
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const popupText = document.getElementById('popup-text');
const closeButtons = document.querySelectorAll('.close-btn');

// Add click event listeners to boxes
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    const day = box.getAttribute('data-day');
    if (dayData[day] && day != 2 && day != 5 && day != 3) {
      popupImage.src = dayData[day].image;
      popupText.textContent = dayData[day].text;
      popup.classList.remove('hidden');
    } else if (day == 2) {
      openPopup('popup-2');
    } else if (day == 5) {
      openPopup('popup-day5');
    } else if (day == 3) {
      openPopup('popup-day3');
    } else if(day == 4) {
      openPopup('popup-day4');
    }
  });
});

// Function to open the popup
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.remove('hidden');
    if (popupId === "popup-2") {
      resetScratchableCanvas(); // Reset scratchable canvas for Day 2
      initScratchableCanvas(); // Initialize scratchable canvas for Day 2
    } else if (popupId === "popup-day3") {
      showPoemDay3(); // Display poem for Day 3
    } else if (popupId === "popup-day4") {
      loadYouTubeVideo(); // Load YouTube video for Day 4
    }
  }
}

// Show Poem for Day 3
function showPoemDay3() {
  const poem = `
    ❄️ Stay cozy on Day 3! Here's a poem for you: ❄️
    
    In winter's embrace, the cold winds blow,
    But inside, warmth begins to grow.
    A blanket, a fire, a cup of tea,
    A perfect moment for you and me.
  `;
  const popupDay3Text = document.querySelector('#popup-day3 .popup-text');
  popupDay3Text.textContent = poem;
}

// Close popup when a close button is clicked
closeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const popupToClose = btn.closest('.popup');
    if (popupToClose) {
      popupToClose.classList.add('hidden');
    }
  });
});

// Snowfall generation
const snowContainer = document.querySelector('.snow');

// Function to generate snowflakes
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');

  // Set random positions and sizes
  snowflake.style.left = `${Math.random() * 100}vw`;
  snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
  snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
  snowflake.style.opacity = Math.random() * 0.5 + 0.3;

  snowflake.textContent = '❄️';

  snowContainer.appendChild(snowflake);

  // Remove snowflake after it falls
  setTimeout(() => snowflake.remove(), 10000);
}

// Generate snowflakes every 200 milliseconds
setInterval(createSnowflake, 200);

// Day 5 Video Popup
const day5Box = document.getElementById("day-5");
const popupDay5 = document.getElementById("popup-day5");
const closeBtn5 = document.getElementById("close-popup5");

// Show the popup when Day 5 box is clicked
day5Box.addEventListener("click", () => {
  popupDay5.classList.remove("hidden");
});

// Close the popup when the close button for Day 5 is clicked
closeBtn5.addEventListener("click", () => {
  popupDay5.classList.add("hidden");
});

// Optional: Close the popup when clicking outside the content
popupDay5.addEventListener("click", (event) => {
  if (event.target === popupDay5) {
    popupDay5.classList.add("hidden");
  }
});

// Day 3 Popup
const day3Box = document.getElementById("day-3");
const popupDay3 = document.getElementById("popup-day3");
const closePopup3 = document.getElementById("close-popup3");

// Show popup for Day 3 when box is clicked
day3Box.addEventListener("click", () => {
  popupDay3.classList.remove("hidden");
});

// Close popup when close button for Day 3 is clicked
closePopup3.addEventListener("click", () => {
  popupDay3.classList.add("hidden");
});

// Optional: Close popup when clicking outside the popup content
popupDay3.addEventListener("click", (event) => {
  if (event.target === popupDay3) {
    popupDay3.classList.add("hidden");
  }
});

// Scratchable canvas for Day 2
function initScratchableCanvas() {
  const canvas = document.getElementById("scratch-canvas");
  const ctx = canvas.getContext("2d");
  const img = document.querySelector("#popup-2 .hidden-image");

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.style.display = "block";
    img.style.zIndex = 0;
  };

  img.src = "images/day-2.jpg";

  let isDrawing = false;
  let scratchedPixels = 0;

  canvas.addEventListener("mousedown", startScratching);
  canvas.addEventListener("mousemove", scratch);
  canvas.addEventListener("mouseup", stopScratching);
  canvas.addEventListener("touchstart", startScratching);
  canvas.addEventListener("touchmove", scratch);
  canvas.addEventListener("touchend", stopScratching);

  function startScratching(e) {
    isDrawing = true;
    scratch(e);
  }

  function scratch(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    scratchedPixels += Math.PI * 20 * 20;

    if (scratchedPixels / (canvas.width * canvas.height) > 0.5) {
      canvas.style.display = "none";
      img.style.zIndex = 1;
    }
  }

  function stopScratching() {
    isDrawing = false;
  }
}

function resetScratchableCanvas() {
  const canvas = document.getElementById("scratch-canvas");
  const ctx = canvas.getContext("2d");
  const img = document.querySelector("#popup-2 .hidden-image");

  canvas.style.display = "block";
  img.style.zIndex = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Popup for Day 4 (YouTube Video)
const popupDay4 = document.getElementById('popup-day4');
const closePopupDay4 = popupDay4.querySelector('.close-btn');

// Load YouTube video for Day 4
function loadYouTubeVideo() {
  const videoContainer = document.querySelector('#popup-day4 .video-container');
  videoContainer.innerHTML = `
<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;
}

// Close popup for Day 4 when close button is clicked
closePopupDay4.addEventListener('click', () => {
  popupDay4.classList.add('hidden');
  // Remove the YouTube iframe when closing
  const videoContainer = document.querySelector('#popup-day4 .video-container');
  videoContainer.innerHTML = '';
});

// Optional: Close popup when clicking outside the popup content
popupDay4.addEventListener('click', (event) => {
  if (event.target === popupDay4) {
    popupDay4.classList.add('hidden');
    const videoContainer = document.querySelector('#popup-day4 .video-container');
    videoContainer.innerHTML = ''; // Remove YouTube video when closed
  }
});