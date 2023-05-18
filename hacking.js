const words = [
  "ABANDON", "CADENCE", "JUSTICE", "WRECKED",
  "HOAXERS", "GALLIUM", "MILITIA", "JUSTICE",
  "PAINFUL", "CINEMAS", "LAYOFFS", "SECURITY"
];

const correctPassword = "JUSTICE"; // Replace with dynamically generated password
let selectedWord = null;

function initializeGrid() {
  const wordGrid = document.getElementById("word-grid");
  words.forEach(word => {
    const wordElement = document.createElement("div");
    wordElement.textContent = word;
    wordElement.addEventListener("click", () => selectWord(word));
    wordGrid.appendChild(wordElement);
  });
}

function selectWord(word) {
  selectedWord = word;
  const feedback = document.getElementById("feedback");
  feedback.innerHTML = "";

  if (word === correctPassword) {
    feedback.textContent = "Hacking successful!";
    setTimeout(() => {
      window.location.href = "ABM2.html"; // Replace with the URL of the next page
    }, 2000);
  } else {
    const likeness = calculateLikeness(word);
    const feedbackRow = document.createElement("div");
    feedbackRow.className = "feedback-row";

    for (let i = 0; i < correctPassword.length; i++) {
      const symbol = document.createElement("span");
      symbol.style.backgroundColor = i < likeness ? "green" : "gray";
      feedbackRow.appendChild(symbol);
    }

    feedback.appendChild(feedbackRow);
  }
}

function calculateLikeness(word) {
  let likeness = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === correctPassword[i]) {
      likeness++;
    }
  }

  return likeness;
}

// Initialize the game
initializeGrid();
