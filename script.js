const startBtn = document.querySelector("#start-btn");
const inputUserO = document.querySelector("#userO");
const inputUserX = document.querySelector("#userX");
const gameBtns = document.querySelectorAll(".game-btns");
const gameContainer = document.querySelector(".game-container");
const winContainer = document.querySelector(".winner-container");
const homeContainer = document.querySelector(".container");
const userO = document.querySelector("#usernameO");
const userX = document.querySelector("#usernameX");
const winnerName = document.querySelector("#winner-name");
const winnerChoice = document.querySelector("#winner-choice");
const navBtn = document.querySelector("#navigateBtn");
const navBtn2 = document.querySelector("#navBtn1");
const resetBtn = document.querySelector("#reset");
const resetBtn2 = document.querySelector("#resetTwo");
const drawContainer = document.querySelector("#draw-container");
const newGameStartBtn = document.querySelectorAll("#start-new");
const line = document.querySelector("#line");
const scoreOEl = document.querySelector("#scoreO");
const scoreXEl = document.querySelector("#scoreX");
const myIntro = document.querySelector("#my-intro");
let moveCount = 0;
let isWinner = false;
let scoreO = 0;
let scoreX = 0;
let countMarquee = 0;
startBtn.addEventListener("click", (e) => {
  if (inputUserO.value && inputUserX.value) {
    countMarquee++;
    const marquee = countMarquee >= 2 ? "" : document.createElement("marquee");
    const heading = countMarquee >= 2 ? "" : document.createElement("h1");
    countMarquee >= 2
      ? ""
      : (heading.innerText = "designed by ❤️ mir murtaza bashir");
    // marquee.behavior = "scroll";
    countMarquee >= 2 ? "" : marquee.appendChild(heading);
    countMarquee >= 2 ? "" : myIntro.appendChild(marquee);
    // console.log(inputUserO.value)
    homeContainer.style.display = "none";
    gameContainer.style.display = "flex";
    userO.innerText = inputUserO.value;
    userX.innerText = inputUserX.value;
    inputUserO.value = "";
    inputUserX.value = "";
    startBtn.href = "#game-container";
    setTimeout(() => {
      navBtn2.click();
    }, 500);
  } else {
    startBtn.href = "#";
    alert("username is both required");
  }
});
let turnO = true;
const winPatterns = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 4, 2],
  [6, 7, 8],
];
gameBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    moveCount += 1;
    if (turnO) {
      e.target.innerText = "O";
      e.target.disabled = true;
      turnO = false;
    } else {
      e.target.innerText = "X";
      e.target.disabled = true;
      turnO = true;
    }
    checkWinner();
    drawFunc(moveCount);
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    pos1 = gameBtns[pattern[0]].innerHTML;
    pos2 = gameBtns[pattern[1]].innerHTML;
    pos3 = gameBtns[pattern[2]].innerHTML;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        // winContainer.style.display = 'flex'
        // homeContainer.style.display = 'none'
        // gameContainer.style.display = 'none'
        navBtn.click();
        isWinner = true;
        gameBtns.forEach((eachBtn) => {
          eachBtn.disabled = true;
        });
        winContainer.style.transform = "scale(1)";
        winnerChoice.innerText = `${pos1} is Winner`;
        if (pos1 === "O") {
          winnerName.innerText = `${userO.innerText} you win the match`;
          scoreO += 1;
          scoreOEl.innerText = `scoreO :- ${scoreO}`;
        } else if (pos1 === "X") {
          winnerName.innerText = `${userX.innerText} you win the match`;
          scoreX += 1;
          scoreXEl.innerText = `scoreX :- ${scoreX}`;
        }
        drawLine(pattern);
        break;
      }
    }
  }
};

// resetBtn.addEventListener("click",(e)=>{
//   // homeContainer.style.display = 'flex'
//   // winContainer.style.display = 'none'
//   drawContainer.style.transform = "scale(0)"
//   gameBtns.forEach((eachBtn)=>{
//     turnO = true
//     eachBtn.disabled = false;
//     eachBtn.innerText= "";
//      winnerName.innerText = "";
//      winnerChoice.innerText = "";
//   })
// })
const resetFunc = (e) => {
  // homeContainer.style.display = 'flex'
  // winContainer.style.display = 'none'
  line.style.top = 0;
  line.style.left = 0;
  moveCount = 0;
  line.style.width = "0";
  isWinner = false;
  drawContainer.style.transform = "scale(0)";
  winContainer.style.transform = "scale(0)";
  gameBtns.forEach((eachBtn) => {
    turnO = true;
    eachBtn.disabled = false;
    eachBtn.innerText = "";
    winnerName.innerText = "";
    winnerChoice.innerText = "";
  });
};
resetBtn.addEventListener("click", resetFunc);
resetBtn2.addEventListener("click", resetFunc);
newGameStartBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    scoreO = 0;
    scoreX = 0;
    scoreOEl.innerText = `scoreO :- ${scoreO}`;
    scoreXEl.innerText = `scoreX :- ${scoreX}`;
    line.style.top = 0;
    line.style.left = 0;
    moveCount = 0;
    isWinner = false;
    line.style.width = "0";
    userO.innerText = "";
    userX.innerText = "";
    homeContainer.style.display = "flex";
    drawContainer.style.transform = "scale(0)";
    winContainer.style.transform = "scale(0)";
    gameContainer.style.display = "none";
    gameBtns.forEach((eachBtn) => {
      turnO = true;
      eachBtn.disabled = false;
      eachBtn.innerText = "";
      winnerName.innerText = "";
      winnerChoice.innerText = "";
    });
  });
});
const drawFunc = (count) => {
  console.log(isWinner);
  if (count === 9 && !isWinner) {
    drawContainer.style.transform = "scale(1)";
    moveCount = 0;
  }
};
// const drawLine = (pattern) => {
//   const positions = [
//     { top: "0%", left: "0%" }, // 0 (top-left)
//     { top: "0%", left: "33.33%" }, // 1 (top-center)
//     { top: "0%", left: "66.66%" }, // 2 (top-right)
//     { top: "33.33%", left: "0%" }, // 3 (middle-left)
//     { top: "33.33%", left: "33.33%" }, // 4 (middle-center)
//     { top: "33.33%", left: "66.66%" }, // 5 (middle-right)
//     { top: "66.66%", left: "0%" }, // 6 (bottom-left)
//     { top: "66.66%", left: "33.33%" }, // 7 (bottom-center)
//     { top: "66.66%", left: "66.66%" }, // 8 (bottom-right)
//   ];

//   const posStart = positions[pattern[0]];
//   const posEnd = positions[pattern[2]];

//   const startX = parseFloat(posStart.left);
//   const startY = parseFloat(posStart.top);
//   const endX = parseFloat(posEnd.left);
//   const endY = parseFloat(posEnd.top);

//   // Calculate distance and angle
//   const deltaX = endX - startX;
//   const deltaY = endY - startY;
//   const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//   const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

//   // Set line width and position
//   console.log(distance);
//   line.style.width = `calc(${distance}% + 120px)`;
//   line.style.top = `calc(${startY} + 50px)`; // Adjust the top based on button height
//   line.style.left = `calc(${startX} + 50px)`; // Adjust the left based on button width
//   line.style.transform = `rotate(${angle}deg)`;
// };
const drawLine = (pattern) => {
  console.log(pattern);
  pattern[0] === 0
    ? ((line.style.transformOrigin = "left"),
      pattern[0] === 0 && pattern[1] === 1
        ? ((line.style.top = "15%"), (line.style.left = "-9px"))
        : pattern[0] === 0 && pattern[1] === 3
        ? ((line.style.left = "15%"), (line.style.top = "-11px"))
        : "")
    : pattern[0] === 1
    ? ((line.style.transformOrigin = "center"),
      ((line.style.top = "49%"), (line.style.right = "-10px")))
    : pattern[0] === 2
    ? ((line.style.transformOrigin = "Right"),
      (line.style.top = "100%"),
      (line.style.left = ""),
      (line.style.right = "15%"))
    : pattern[0] === 3
    ? ((line.style.top = "50%"), (line.style.left = "-9px"))
    : pattern[0] === 6
    ? ((line.style.transformOrigin = "left"),
      pattern[0] === 6 && pattern[1] === 7
        ? ((line.style.top = "83%"), (line.style.left = "-7px"))
        : (line.style.top = "100%"))
    : // (line.style.right = ""))
      (line.style.transformOrigin = "left");
  const positions = [
    { top: "0%", left: "0%" }, // 0 (top-left)
    { top: "0%", left: "33.33%" }, // 1 (top-center)
    { top: "0%", left: "66.66%" }, // 2 (top-right)
    { top: "33.33%", left: "0%" }, // 3 (middle-left)
    { top: "33.33%", left: "33.33%" }, // 4 (middle-center)
    { top: "33.33%", left: "66.66%" }, // 5 (middle-right)
    { top: "66.66%", left: "0%" }, // 6 (bottom-left)
    { top: "66.66%", left: "33.33%" }, // 7 (bottom-center)
    { top: "66.66%", left: "66.66%" }, // 8 (bottom-right)
  ];

  const posStart = positions[pattern[0]];
  const posEnd = positions[pattern[2]];

  const startX = parseFloat(posStart.left);
  const startY = parseFloat(posStart.top);
  const endX = parseFloat(posEnd.left);
  const endY = parseFloat(posEnd.top);

  // Calculate the distance and angle for the line
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  // Set line width, position, and rotation
  line.style.width = `calc(${distance}% + 120px)`; // Adjust the length of the line
  line.style.top = `calc(${startY} + 50px)`; // Adjust the vertical position
  line.style.left = `calc(${startX} + 50px)`; // Adjust the horizontal position
  line.style.transform = `rotate(${angle}deg)`; // Rotate the line based on the angle
};
