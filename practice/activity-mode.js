(function () {
  const bestPointsKey = "coding-hub-activity-best-points-v1";
  const longestStreakKey = "coding-hub-activity-longest-streak-v1";
  const dailyTaskKey = "coding-hub-daily-task-streak-v1";

  const activityButtons = document.querySelectorAll("[data-activity]");
  const languageButtons = document.querySelectorAll("[data-language]");
  const flashcardCard = document.getElementById("flashcard-card");
  const flashcardProgress = document.getElementById("flashcard-progress-card");
  const activityCard = document.getElementById("activity-card");
  const activityResult = document.getElementById("activity-result");
  const activityTopic = document.getElementById("activity-topic");
  const activityType = document.getElementById("activity-type");
  const activityPrompt = document.getElementById("activity-prompt");
  const activityCode = document.getElementById("activity-code");
  const activityAnswers = document.getElementById("activity-answers");
  const activityFeedback = document.getElementById("activity-feedback");
  const activitySubmit = document.getElementById("activity-submit");
  const activityNext = document.getElementById("activity-next");
  const activityExit = document.getElementById("activity-exit");
  const activityProgress = document.getElementById("activity-progress");
  const activityProgressText = document.getElementById("activity-progress-text");
  const activityPoints = document.getElementById("activity-points");
  const activityStreak = document.getElementById("activity-streak");
  const dailyStreak = document.getElementById("daily-streak");
  const bestPointsNode = document.getElementById("best-points");
  const longestStreakNode = document.getElementById("longest-activity-streak");
  const resultTitle = document.getElementById("activity-result-title");
  const resultSummary = document.getElementById("activity-result-summary");
  const resultAgain = document.getElementById("activity-result-again");
  const resultDone = document.getElementById("activity-result-done");

  let sessionMode = "";
  let sessionQuestions = [];
  let questionIndex = 0;
  let selectedAnswer = "";
  let answered = false;
  let points = 0;
  let streak = 0;
  let correct = 0;

  updateSavedStats();

  activityButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      startActivity(button.dataset.activity);
    });
  });

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      updateActivityAvailability();
    });
  });

  activitySubmit.addEventListener("click", checkAnswer);
  activityNext.addEventListener("click", nextQuestion);
  activityExit.addEventListener("click", showFlashcards);
  resultAgain.addEventListener("click", function () {
    startActivity(sessionMode);
  });
  resultDone.addEventListener("click", showFlashcards);

  function startActivity(mode) {
    sessionMode = mode;
    const language = getSelectedLanguage();
    const pool = getQuestionPool(language, mode);
    const count = mode === "daily" ? Math.min(9, pool.length) : Math.min(10, pool.length);

    sessionQuestions =
      mode === "daily" && language === "all"
        ? buildMixedDailyQuestions()
        : seededShuffle(pool, todayKey() + "-" + mode + "-" + language).slice(
            0,
            count
          );
    questionIndex = 0;
    points = 0;
    streak = 0;
    correct = 0;
    flashcardCard.hidden = true;
    flashcardProgress.hidden = true;
    activityResult.hidden = true;
    activityCard.hidden = false;
    renderActivity();
  }

  function getQuestionPool(language, mode) {
    const languages =
      language === "all" ? ["html", "css", "javascript"] : [language];
    const all = languages.flatMap(function (name) {
      return window.codingActivities[name];
    });

    if (mode === "daily") {
      return all;
    }

    return all.filter(function (question) {
      return question.type === mode;
    });
  }

  function buildMixedDailyQuestions() {
    const types = ["fill", "choice", "bug"];
    const languages = ["html", "css", "javascript"];

    return languages.flatMap(function (language, languageIndex) {
      return types.map(function (type, typeIndex) {
        const matching = window.codingActivities[language].filter(function (question) {
          return question.type === type;
        });
        const shuffled = seededShuffle(
          matching,
          todayKey() + "-" + language + "-" + type
        );
        return shuffled[(languageIndex + typeIndex) % shuffled.length];
      });
    });
  }

  function renderActivity() {
    const question = sessionQuestions[questionIndex];
    selectedAnswer = "";
    answered = false;
    activityAnswers.innerHTML = "";
    activityFeedback.textContent = "Answer one small question at a time.";
    activityFeedback.className = "activity-feedback";
    activitySubmit.disabled = false;
    activityNext.disabled = true;
    activityTopic.textContent = question.languageName + ": " + question.topic;
    activityType.textContent = formatType(question.type);
    activityPrompt.textContent = question.prompt;
    activityCode.hidden = !question.code;
    activityCode.textContent = question.code || "";
    activityProgress.style.width =
      Math.round((questionIndex / sessionQuestions.length) * 100) + "%";
    activityProgressText.textContent =
      questionIndex + " of " + sessionQuestions.length + " complete";
    activityPoints.textContent = points;
    activityStreak.textContent = streak;

    if (question.type === "choice") {
      question.options.forEach(function (option) {
        const button = document.createElement("button");
        button.className = "option-button activity-option";
        button.type = "button";
        button.textContent = option;
        button.addEventListener("click", function () {
          if (answered) {
            return;
          }
          selectedAnswer = option;
          activityAnswers.querySelectorAll("button").forEach(function (item) {
            item.classList.remove("selected");
          });
          button.classList.add("selected");
        });
        activityAnswers.append(button);
      });
      return;
    }

    const input = document.createElement("input");
    input.className = "activity-input";
    input.type = "text";
    input.autocomplete = "off";
    input.placeholder =
      question.type === "bug" ? "Type the corrected code" : "Type the missing part";
    input.addEventListener("input", function () {
      selectedAnswer = input.value;
    });
    activityAnswers.append(input);
    input.focus();
  }

  function checkAnswer() {
    if (answered) {
      return;
    }

    if (!selectedAnswer.trim()) {
      activityFeedback.textContent = "Add an answer first.";
      return;
    }

    answered = true;
    const question = sessionQuestions[questionIndex];
    const isCorrect = answersMatch(selectedAnswer, question.answer);

    if (isCorrect) {
      streak += 1;
      correct += 1;
      points += 10 + Math.min(streak - 1, 5) * 2;
      activityFeedback.textContent = "Correct. " + question.explanation;
      activityFeedback.className = "activity-feedback correct";
    } else {
      streak = 0;
      activityFeedback.textContent =
        "Not quite. The answer is " + question.answer + ". " + question.explanation;
      activityFeedback.className = "activity-feedback incorrect";
    }

    markActivityAnswer(question, isCorrect);
    activityPoints.textContent = points;
    activityStreak.textContent = streak;
    activitySubmit.disabled = true;
    activityNext.disabled = false;
  }

  function markActivityAnswer(question, isCorrect) {
    if (question.type !== "choice") {
      const input = activityAnswers.querySelector("input");
      input.disabled = true;
      input.classList.add(isCorrect ? "correct" : "incorrect");
      return;
    }

    activityAnswers.querySelectorAll("button").forEach(function (button) {
      button.disabled = true;
      if (answersMatch(button.textContent, question.answer)) {
        button.classList.add("correct");
      } else if (button.classList.contains("selected")) {
        button.classList.add("incorrect");
      }
    });
  }

  function nextQuestion() {
    questionIndex += 1;
    if (questionIndex >= sessionQuestions.length) {
      finishActivity();
      return;
    }
    renderActivity();
  }

  function finishActivity() {
    activityCard.hidden = true;
    activityResult.hidden = false;
    const bestPoints = Math.max(readNumber(bestPointsKey), points);
    const longestStreak = Math.max(readNumber(longestStreakKey), streak);
    localStorage.setItem(bestPointsKey, String(bestPoints));
    localStorage.setItem(longestStreakKey, String(longestStreak));

    if (sessionMode === "daily") {
      updateDailyTaskStreak();
      resultTitle.textContent = "Done! You finished today's task";
    } else {
      resultTitle.textContent = "Lesson complete";
    }

    activityProgress.style.width = "100%";
    resultSummary.textContent =
      "You earned " +
      points +
      " points and answered " +
      correct +
      " of " +
      sessionQuestions.length +
      " correctly.";
    updateSavedStats();
  }

  function showFlashcards() {
    activityCard.hidden = true;
    activityResult.hidden = true;
    flashcardCard.hidden = false;
    flashcardProgress.hidden = false;
  }

  function updateDailyTaskStreak() {
    const today = todayKey();
    const saved = readJson(dailyTaskKey, {
      current: 0,
      longest: 0,
      lastCompleted: "",
    });

    if (saved.lastCompleted === today) {
      return;
    }

    const yesterday = dateKey(addCalendarDays(new Date(), -1));
    saved.current = saved.lastCompleted === yesterday ? saved.current + 1 : 1;
    saved.longest = Math.max(saved.longest || 0, saved.current);
    saved.lastCompleted = today;
    localStorage.setItem(dailyTaskKey, JSON.stringify(saved));
  }

  function updateSavedStats() {
    const saved = readJson(dailyTaskKey, { current: 0 });
    dailyStreak.textContent = saved.current || 0;
    bestPointsNode.textContent = readNumber(bestPointsKey);
    longestStreakNode.textContent = readNumber(longestStreakKey);
  }

  function updateActivityAvailability() {
    activityButtons.forEach(function (button) {
      button.title =
        "Start with " +
        (getSelectedLanguage() === "all"
          ? "all three languages"
          : getSelectedLanguage());
    });
  }

  function getSelectedLanguage() {
    const active = document.querySelector("[data-language].active");
    return active ? active.dataset.language : "all";
  }

  function answersMatch(given, expected) {
    return normalize(given) === normalize(expected);
  }

  function normalize(value) {
    return value
      .trim()
      .toLowerCase()
      .replace(/["']/g, '"')
      .replace(/\s+/g, " ")
      .replace(/\s*([{}()[\];:=.,<>])\s*/g, "$1");
  }

  function formatType(type) {
    const labels = {
      fill: "Fill in the blank",
      choice: "Multiple choice",
      bug: "Find and fix the bug",
      daily: "Daily Task",
    };
    return labels[type] || type;
  }

  function seededShuffle(items, seedText) {
    let seed = 0;
    for (let index = 0; index < seedText.length; index += 1) {
      seed = (seed * 31 + seedText.charCodeAt(index)) >>> 0;
    }

    return items
      .map(function (item, index) {
        seed = (seed * 1664525 + 1013904223 + index) >>> 0;
        return { item, order: seed };
      })
      .sort(function (a, b) {
        return a.order - b.order;
      })
      .map(function (entry) {
        return entry.item;
      });
  }

  function todayKey() {
    return dateKey(new Date());
  }

  function dateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function addCalendarDays(date, days) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function readNumber(key) {
    return Number(localStorage.getItem(key)) || 0;
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch (error) {
      return fallback;
    }
  }
})();
