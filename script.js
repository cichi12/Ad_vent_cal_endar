// Data for each day's image and message
const dayData = {
  1: { image: 'images/day-1.jpeg', text: '🎅 Merry Christmas, pookie!'},
  2: { image: 'images/day2.jpg', text: '🎄 Scratch to reveal your surprise for Day 2!' },
  3: { image: 'images/day3.jpg', text: '❄️ Stay cozy on Day 3!' },
  5: { image: 'images/day-5.mp4', text: '🎁 Watch the video for Day 5!' },
  10: { image: 'images/noptatic.jpeg', text: 'Our first Noptatic post! \
    MA FACI SA MI PIERD LIMITELE SI MINTILE CU FIECARE PRIVIRE! 🥺'},
  11: { image: 'images/noi.mp4', text: 'De la inceputuri pana la adanci batraneti! 🥺'},
  12: { image: 'images/day-12.jpeg', text: '🎄 Merry Christmas, pookie!'},

  24: { image: 'images/day24.jpg', text: '🎁 Merry Christmas!' },
};

// Select all boxes and the popup elements
const boxes = document.querySelectorAll('.box');
const closeButtons = document.querySelectorAll('.close-btn');
const popups = document.querySelectorAll('.popup');
let isSpinning = true;

// Add click event listeners to boxes
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    const day = box.getAttribute('data-day');
    if (day == 2) {
      openPopup('popup-2');
    } else if (day == 5) {
      openPopup('popup-day5');
    } else if (day == 3) {
      openPopup('popup-day3');
    } else if (day == 4) {
      openPopup('popup-day4');
    } else if (day == 6) {
      openPopup('popup-day6');
    } else if (day == 7) {
      openPopup('popup-day7');
    } else if(day == 8) {
      openPopup('popup-day8');
      addCrackerHoverEffect(); // Add hover effect for Day 8's cracker
    } else if (day == 9) {
      openPopup('popup-day9');
    } else if (day == 11) {
      openPopup('popup-day11');
    }
    else if (day == 12) {
      openPopup('popup-day12');
    }
    else {
      openStandardPopup(day);
    }
  });
});

// Function to open the standard popup with image and text
function openStandardPopup(day) {
  const popup = document.getElementById('popup');
  const popupImage = document.getElementById('popup-image');
  const popupText = document.getElementById('popup-text');
  popupImage.src = dayData[day].image;
  popupText.textContent = dayData[day].text;
  popup.classList.remove('hidden');

  // for day 10, make the image smaller
  if (day == 10) {
    popupImage.style.width = "70%";
  }
}

// Function to open specific popup for Day 2, Day 3, Day 4, etc.
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.remove('hidden');
    if (popupId === "popup-2") {
      resetScratchableCanvas(); // Reset scratchable canvas for Day 2
      initScratchableCanvas(); // Initialize scratchable canvas for Day 2
    } else if (popupId === "popup-day3") {
      showPoemDay3(); // Display poem for Day 3
    } else if (popupId === "popup-day7") {
      isSpinning = false;
      const wheel = document.getElementById("wheel-inner");
      wheel.style.transition = "none";
      wheel.style.transform = "rotate(0deg)";
      setTimeout(() => {
        wheel.style.transition = "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)";
      }, 100);

      const spinButton = document.getElementById("spin-button");
      spinButton.removeEventListener("click", spinWheel); // Prevent duplicate listeners
      spinButton.addEventListener("click", spinWheel);
    } else if (popupId === "popup-day8") {
      addCrackerHoverEffect(); // Add hover effect for Day 8's cracker
    } else if (popupId === "popup-day12") {
      showPoemDay9(); // Display poem for Day 9
    }
  }
}

// Show Poem for Day 3
function showPoemDay3() {
  const popupDay3Text = document.querySelector('#popup-day3 .popup-text');
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

  snowflake.style.left = `${Math.random() * 100}vw`;
  snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
  snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
  snowflake.style.opacity = Math.random() * 0.5 + 0.3;

  snowflake.textContent = '❄️';

  snowContainer.appendChild(snowflake);

  setTimeout(() => snowflake.remove(), 10000);
}

setInterval(createSnowflake, 200);

// Day 5 Video Popup
const day5Box = document.getElementById("day-5");
const popupDay5 = document.getElementById("popup-day5");
const closeBtn5 = popupDay5.querySelector(".close-btn");
videoElement = document.getElementById("popup-video5");

day5Box.addEventListener("click", () => {
  popupDay5.classList.remove("hidden");
});

closeBtn5.addEventListener("click", () => {
  popupDay5.classList.add("hidden");

  videoElement.pause();
  videoElement.currentTime = 0;
});

// Day 11 Video Popup
document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript is running!");

  const day11Box = document.getElementById("day-11");
  const popupDay11 = document.getElementById("popup-day11");
  const closeBtn11 = popupDay11?.querySelector(".close-btn");
  const videoElement = document.getElementById("popup-video11");

  console.log({ day11Box, popupDay11, closeBtn11, videoElement });

  if (day11Box && popupDay11 && closeBtn11 && videoElement) {
    day11Box.addEventListener("click", () => {
      console.log("Popup opened!");
      popupDay11.classList.remove("hidden");
    });

    closeBtn11.addEventListener("click", () => {
      console.log("Popup closed!");
      popupDay11.classList.add("hidden");

      videoElement.pause();
      videoElement.currentTime = 0;
      console.log("Video stopped and reset.");
    });
  } else {
    console.error("One or more elements could not be found.");
  }
});

// Day 3 Popup
const day3Box = document.getElementById("day-3");
const popupDay3 = document.getElementById("popup-day3");
const closePopup3 = document.getElementById("close-popup3");

day3Box.addEventListener("click", () => {
  popupDay3.classList.remove("hidden");
});

closePopup3.addEventListener("click", () => {
  popupDay3.classList.add("hidden");
});

// Day 4 Popup
const popupDay4 = document.getElementById('popup-day4');
const closePopupDay4 = popupDay4.querySelector('.close-btn');

// Function to close the popup
const closePopup = () => {
  popupDay4.classList.add('hidden');
};

// Close popup when the close button is clicked
closePopupDay4.addEventListener('click', closePopup);

// Optional: Close popup when clicking outside the popup content
popupDay4.addEventListener('click', (event) => {
  if (event.target === popupDay4) {
    closePopup();
  }
});


// Day 7 Spin Wheel

function spinWheel() {
  if (isSpinning) return; // Prevent the wheel from spinning multiple times at once

  isSpinning = true;

  // Get the wheel element and define a random number of rotations
  const wheel = document.getElementById("wheel-inner");
  const randomSpin = Math.floor(Math.random() * 3600) + 1440; // Randomize the rotation angle (from 1440 to 5040 degrees)
  
  // Apply the transformation (spin the wheel)
  wheel.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
  wheel.style.transform = `rotate(${randomSpin}deg)`;

  // After the animation ends, stop spinning and display the result
  setTimeout(() => {
    isSpinning = false;
    const result = calculateResult(randomSpin % 360); // Get the result based on the final rotation
    alert(`The wheel stopped at: ${result}`); // Show the result
  }, 4000); // Timeout to match the animation duration (4s)
}

function calculateResult(degrees) {
  // Define the segments of the roulette wheel (adjust as needed)
  const segments = [
    "Random Restaurant Challenge",
    "Bowling",
    "Movie Night",
    "Cooking your favorite meal",
    "Board Games",
    "Live Music",
    "Picnic",
    "Litlle Walk",
    "Therme Date <3"
  ];

  // Calculate the index based on the rotation degrees (each segment represents 45 degrees)
  const index = Math.floor(degrees / 45); // 360 degrees / 8 segments
  return segments[index];
}

// Set up the event listener for the "Spin" button
document.getElementById("spin-button").addEventListener("click", spinWheel);

document.getElementById('day-7').addEventListener('click', function () {
  openPopup('popup-day7');
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

// // Cracker hover animation for Day 8
function addCrackerHoverEffect() {
  // Ensure jQuery is available for the hover effect
  $('#cracker').hover(function() {
    // On hover in
    $('.hover-me-text').stop(true, true).fadeToggle(300, "linear");
  });
}

// Ensure the cracker hover effect is applied when Day 8 popup is opened
document.getElementById('day-8').addEventListener('click', function () {
  openPopup('popup-day8');
});

// day 9 popup
const day9Box = document.getElementById("day-9");
const popupDay9 = document.getElementById("popup-day9");
const closePopup9 = document.getElementById("close-popup9");

day9Box.addEventListener("click", () => {
  openPopup('popup-day9');
});

closePopup9.addEventListener("click", () => {
  popupDay9.classList.add("hidden");
});

// Day 12 Popup
// Show Poem for Day 3
function showPoemDay3() {
  const popupDay3Text = document.querySelector('#popup-day3 .popup-text');
}

const day12Box = document.getElementById("day-12");
const popupDay12 = document.getElementById("popup-day12");
const closePopup12 = document.getElementById("close-popup12");

day12Box.addEventListener("click", () => {
  popupDay12.classList.remove("hidden");
});

closePopup12.addEventListener("click", () => {
  popupDay12.classList.add("hidden");
});