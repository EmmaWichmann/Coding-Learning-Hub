const progressKey = "coding-hub-study-progress";
const missedKey = "coding-hub-missed-concepts";
const reviewIntervals = [1, 3, 7, 14, 30];

const modeButtons = document.querySelectorAll("[data-mode]");
const languageButtons = document.querySelectorAll("[data-language]");
const topicLabel = document.getElementById("card-topic");
const typeLabel = document.getElementById("card-type");
const promptNode = document.getElementById("card-prompt");
const codeNode = document.getElementById("card-code");
const optionsNode = document.getElementById("answer-options");
const revealButton = document.getElementById("reveal-answer");
const answerPanel = document.getElementById("answer-panel");
const answerNode = document.getElementById("card-answer");
const explanationNode = document.getElementById("card-explanation");
const ratingButtons = document.getElementById("rating-buttons");
const ratingDateLabels = document.querySelectorAll("[data-rating-date]");
const dueCountNode = document.getElementById("due-count");
const reviewedCountNode = document.getElementById("reviewed-count");
const streakNode = document.getElementById("streak-count");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const resetButton = document.getElementById("reset-progress");

let progress = readStorage(progressKey, {});
let missedConcepts = readStorage(missedKey, []);
let currentMode = "due";
let activeLanguage = "all";
let currentCards = [];
let currentIndex = 0;
let reviewedThisSession = 0;

startMode("due");

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    startMode(button.dataset.mode);
  });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    languageButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeLanguage = button.dataset.language;
    startMode(currentMode);
  });
});

revealButton.addEventListener("click", revealAnswer);

ratingButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-rating]");
  if (!button) {
    return;
  }

  rateCard(button.dataset.rating);
});

resetButton.addEventListener("click", () => {
  const shouldReset = window.confirm(
    "Reset all card schedules and start the study deck again?"
  );

  if (!shouldReset) {
    return;
  }

  progress = {};
  localStorage.removeItem(progressKey);
  reviewedThisSession = 0;
  startMode(currentMode);
});

function startMode(mode) {
  currentMode = mode;
  currentIndex = 0;
  currentCards = getCardsForMode(mode);

  if (currentCards.length === 0 && mode === "due") {
    showFinishedState(
      "Nothing is due right now",
      "Your next reviews are scheduled. You can still choose All concepts or Find the mistake."
    );
  } else {
    showCard();
  }

  updateStats();
}

function getCardsForMode(mode) {
  let cards;

  if (mode === "all") {
    cards = [...codingConcepts];
  } else if (mode === "mistakes") {
    cards = codingConcepts.filter((card) => card.type === "find-mistake");
  } else {
    const today = startOfToday();
    cards = codingConcepts.filter((card) => {
      const cardProgress = progress[card.id];
      return !cardProgress || new Date(cardProgress.nextReview) <= today;
    });
  }

  if (activeLanguage === "all") {
    return cards;
  }

  return cards.filter((card) => getCardLanguage(card) === activeLanguage);
}

function showCard() {
  const card = currentCards[currentIndex];

  if (!card) {
    showFinishedState(
      "Set complete",
      `You reviewed ${reviewedThisSession} concept${
        reviewedThisSession === 1 ? "" : "s"
      } this session.`
    );
    return;
  }

  topicLabel.textContent = card.topic;
  typeLabel.textContent = formatType(card.type);
  promptNode.textContent = card.prompt;
  answerNode.textContent = card.answer;
  explanationNode.textContent = card.explanation;

  codeNode.hidden = !card.code;
  codeNode.textContent = card.code || "";

  optionsNode.innerHTML = "";
  if (card.options) {
    card.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button";
      button.textContent = option;
      button.addEventListener("click", () => checkOption(button, option));
      optionsNode.append(button);
    });
  }

  answerPanel.hidden = true;
  ratingButtons.hidden = true;
  revealButton.hidden = false;
  revealButton.textContent = card.options ? "Show answer instead" : "Flip card";
  updateRatingDateLabels(card);
  updateProgressDisplay();
}

function checkOption(button, option) {
  const card = currentCards[currentIndex];
  const buttons = optionsNode.querySelectorAll("button");
  buttons.forEach((item) => {
    item.disabled = true;
    if (item.textContent === card.answer) {
      item.classList.add("correct");
    }
  });

  if (option === card.answer) {
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
    logMissedConcept(card);
  }

  revealAnswer();
}

function revealAnswer() {
  answerPanel.hidden = false;
  ratingButtons.hidden = false;
  revealButton.hidden = true;
}

function rateCard(rating) {
  const card = currentCards[currentIndex];
  const oldProgress = progress[card.id] || { intervalIndex: -1 };
  let intervalIndex = oldProgress.intervalIndex;

  if (rating === "again") {
    intervalIndex = 0;
    logMissedConcept(card);
  } else if (rating === "hard") {
    intervalIndex = Math.max(0, intervalIndex);
  } else if (rating === "good") {
    intervalIndex = Math.min(intervalIndex + 1, reviewIntervals.length - 1);
  } else if (rating === "easy") {
    intervalIndex = Math.min(intervalIndex + 2, reviewIntervals.length - 1);
  }

  const days = reviewIntervals[Math.max(0, intervalIndex)];
  const nextReview = new Date();
  nextReview.setHours(0, 0, 0, 0);
  nextReview.setDate(nextReview.getDate() + days);

  progress[card.id] = {
    intervalIndex: Math.max(0, intervalIndex),
    nextReview: nextReview.toISOString(),
    lastRating: rating,
    lastReviewed: new Date().toISOString(),
  };

  localStorage.setItem(progressKey, JSON.stringify(progress));
  reviewedThisSession += 1;
  currentIndex += 1;
  showCard();
  updateStats();
}

function logMissedConcept(card) {
  const existing = missedConcepts.find((item) => item.id === card.id);

  if (existing) {
    existing.timesMissed += 1;
    existing.lastMissed = new Date().toISOString();
    existing.nextReview = addDays(1).toISOString();
  } else {
    missedConcepts.unshift({
      id: card.id,
      prompt: card.prompt,
      answer: card.answer,
      explanation: card.explanation,
      topic: card.topic,
      timesMissed: 1,
      lastMissed: new Date().toISOString(),
      nextReview: addDays(1).toISOString(),
    });
  }

  localStorage.setItem(missedKey, JSON.stringify(missedConcepts));
}

function showFinishedState(title, message) {
  topicLabel.textContent = "Study Mode";
  typeLabel.textContent = "Complete";
  promptNode.textContent = title;
  codeNode.hidden = true;
  optionsNode.innerHTML = "";
  answerPanel.hidden = false;
  answerNode.textContent = message;
  explanationNode.textContent =
    "Choose another activity above or return when your next cards are due.";
  revealButton.hidden = true;
  ratingButtons.hidden = true;
  updateProgressDisplay();
}

function updateStats() {
  const today = startOfToday();
  const dueCount = codingConcepts.filter((card) => {
    const cardProgress = progress[card.id];
    return !cardProgress || new Date(cardProgress.nextReview) <= today;
  }).length;

  dueCountNode.textContent = dueCount;
  reviewedCountNode.textContent = reviewedThisSession;
  streakNode.textContent = getStudyStreak();
}

function updateRatingDateLabels(card) {
  const oldProgress = progress[card.id] || { intervalIndex: -1 };
  const currentIndex = oldProgress.intervalIndex;
  const intervalIndexes = {
    again: 0,
    hard: Math.max(0, currentIndex),
    good: Math.min(currentIndex + 1, reviewIntervals.length - 1),
    easy: Math.min(currentIndex + 2, reviewIntervals.length - 1),
  };

  ratingDateLabels.forEach((label) => {
    const intervalIndex = intervalIndexes[label.dataset.ratingDate];
    const days = reviewIntervals[intervalIndex];
    label.textContent = formatReviewDate(days);
  });
}

function updateProgressDisplay() {
  const total = currentCards.length;
  const completed = Math.min(currentIndex, total);
  const percent = total === 0 ? 100 : Math.round((completed / total) * 100);

  progressBar.style.width = `${percent}%`;
  progressText.textContent =
    total === 0 ? "No cards in this set" : `${completed} of ${total} reviewed`;
}

function getStudyStreak() {
  const reviewDates = Object.values(progress)
    .map((item) => item.lastReviewed)
    .filter(Boolean)
    .map((date) => new Date(date).toDateString());

  return new Set(reviewDates).size;
}

function formatType(type) {
  const labels = {
    cloze: "Fill the blank",
    "multiple-choice": "Multiple choice",
    "find-mistake": "Find the mistake",
    predict: "Predict",
  };
  return labels[type] || type;
}

function getCardLanguage(card) {
  if (card.topic === "HTML") {
    return "html";
  }

  if (card.topic === "CSS" || card.topic === "Design") {
    return "css";
  }

  return "javascript";
}

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function addDays(days) {
  const date = startOfToday();
  date.setDate(date.getDate() + days);
  return date;
}

function formatReviewDate(days) {
  const dateText = addDays(days).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return days === 1 ? `tomorrow, ${dateText}` : `${dateText} (${days} days)`;
}
