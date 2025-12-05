// ----- Stage + puzzle data -----
const stages = [
  {
    id: "stage1",
    name: "Stage 1",
    label: "Beginner (3 puzzles)",
    instruction: "Drag the picture to the matching shadow",
    puzzles: [
      {
        id: "s1-animals",
        instruction: "Match the animals",
        pieces: [
          { id: "cat", label: "Cat", emoji: "🐱" },
          { id: "dog", label: "Dog", emoji: "🐶" },
          { id: "fish", label: "Fish", emoji: "🐟" }
        ]
      },
      {
        id: "s1-vehicles",
        instruction: "Match the vehicles",
        pieces: [
          { id: "car", label: "Car", emoji: "🚗" },
          { id: "bus", label: "Bus", emoji: "🚌" },
          { id: "plane", label: "Plane", emoji: "✈️" }
        ]
      },
      {
        id: "s1-food",
        instruction: "Match the food",
        pieces: [
          { id: "apple", label: "Apple", emoji: "🍎" },
          { id: "banana", label: "Banana", emoji: "🍌" },
          { id: "cake", label: "Cake", emoji: "🎂" }
        ]
      }
    ]
  },
  {
    id: "stage2",
    name: "Stage 2",
    label: "Early Learner (4 puzzles)",
    instruction: "A little more to match now",
    puzzles: [
      {
        id: "s2-animals",
        instruction: "Match 4 animals",
        pieces: [
          { id: "cat", label: "Cat", emoji: "🐱" },
          { id: "dog", label: "Dog", emoji: "🐶" },
          { id: "rabbit", label: "Rabbit", emoji: "🐰" },
          { id: "bear", label: "Bear", emoji: "🐻" }
        ]
      },
      {
        id: "s2-vehicles",
        instruction: "Match 4 vehicles",
        pieces: [
          { id: "car", label: "Car", emoji: "🚗" },
          { id: "bus", label: "Bus", emoji: "🚌" },
          { id: "train", label: "Train", emoji: "🚂" },
          { id: "boat", label: "Boat", emoji: "⛵" }
        ]
      },
      {
        id: "s2-shapes",
        instruction: "Match 4 shapes",
        pieces: [
          { id: "circle", label: "Circle", emoji: "⚪" },
          { id: "square", label: "Square", emoji: "🟥" },
          { id: "triangle", label: "Triangle", emoji: "🔺" },
          { id: "diamond", label: "Diamond", emoji: "💠" }
        ]
      },
      {
        id: "s2-food",
        instruction: "Match 4 foods",
        pieces: [
          { id: "apple", label: "Apple", emoji: "🍎" },
          { id: "banana", label: "Banana", emoji: "🍌" },
          { id: "pizza", label: "Pizza", emoji: "🍕" },
          { id: "icecream", label: "Ice Cream", emoji: "🍦" }
        ]
      }
    ]
  },
  {
    id: "stage3",
    name: "Stage 3",
    label: "Intermediate (5 puzzles)",
    instruction: "More practice for strong matchers",
    puzzles: [
      {
        id: "s3-animals",
        instruction: "Match 5 animals",
        pieces: [
          { id: "cat", label: "Cat", emoji: "🐱" },
          { id: "dog", label: "Dog", emoji: "🐶" },
          { id: "rabbit", label: "Rabbit", emoji: "🐰" },
          { id: "bear", label: "Bear", emoji: "🐻" },
          { id: "lion", label: "Lion", emoji: "🦁" }
        ]
      },
      {
        id: "s3-vehicles",
        instruction: "Match 5 vehicles",
        pieces: [
          { id: "car", label: "Car", emoji: "🚗" },
          { id: "bus", label: "Bus", emoji: "🚌" },
          { id: "train", label: "Train", emoji: "🚂" },
          { id: "boat", label: "Boat", emoji: "⛵" },
          { id: "helicopter", label: "Helicopter", emoji: "🚁" }
        ]
      },
      {
        id: "s3-shapes",
        instruction: "Match 5 shapes",
        pieces: [
          { id: "circle", label: "Circle", emoji: "⚪" },
          { id: "square", label: "Square", emoji: "🟥" },
          { id: "triangle", label: "Triangle", emoji: "🔺" },
          { id: "diamond", label: "Diamond", emoji: "💠" },
          { id: "star", label: "Star", emoji: "⭐" }
        ]
      },
      {
        id: "s3-food",
        instruction: "Match 5 foods",
        pieces: [
          { id: "apple", label: "Apple", emoji: "🍎" },
          { id: "banana", label: "Banana", emoji: "🍌" },
          { id: "pizza", label: "Pizza", emoji: "🍕" },
          { id: "icecream", label: "Ice Cream", emoji: "🍦" },
          { id: "cookie", label: "Cookie", emoji: "🍪" }
        ]
      },
      {
        id: "s3-emotions",
        instruction: "Match 5 faces",
        pieces: [
          { id: "happy", label: "Happy", emoji: "😊" },
          { id: "sad", label: "Sad", emoji: "😢" },
          { id: "angry", label: "Angry", emoji: "😡" },
          { id: "surprised", label: "Surprised", emoji: "😲" },
          { id: "sleepy", label: "Sleepy", emoji: "😴" }
        ]
      }
    ]
  },
  {
    id: "stage4",
    name: "Stage 4",
    label: "Advanced (6 puzzles)",
    instruction: "Lots to match! For strong focus",
    puzzles: [
      {
        id: "s4-animals",
        instruction: "Match 6 animals",
        pieces: [
          { id: "cat", label: "Cat", emoji: "🐱" },
          { id: "dog", label: "Dog", emoji: "🐶" },
          { id: "rabbit", label: "Rabbit", emoji: "🐰" },
          { id: "bear", label: "Bear", emoji: "🐻" },
          { id: "lion", label: "Lion", emoji: "🦁" },
          { id: "tiger", label: "Tiger", emoji: "🐯" }
        ]
      },
      {
        id: "s4-vehicles",
        instruction: "Match 6 vehicles",
        pieces: [
          { id: "car", label: "Car", emoji: "🚗" },
          { id: "bus", label: "Bus", emoji: "🚌" },
          { id: "train", label: "Train", emoji: "🚂" },
          { id: "boat", label: "Boat", emoji: "⛵" },
          { id: "helicopter", label: "Helicopter", emoji: "🚁" },
          { id: "truck", label: "Truck", emoji: "🚚" }
        ]
      },
      {
        id: "s4-shapes",
        instruction: "Match 6 shapes",
        pieces: [
          { id: "circle", label: "Circle", emoji: "⚪" },
          { id: "square", label: "Square", emoji: "🟥" },
          { id: "triangle", label: "Triangle", emoji: "🔺" },
          { id: "diamond", label: "Diamond", emoji: "💠" },
          { id: "star", label: "Star", emoji: "⭐" },
          { id: "heart", label: "Heart", emoji: "❤️" }
        ]
      },
      {
        id: "s4-food",
        instruction: "Match 6 foods",
        pieces: [
          { id: "apple", label: "Apple", emoji: "🍎" },
          { id: "banana", label: "Banana", emoji: "🍌" },
          { id: "pizza", label: "Pizza", emoji: "🍕" },
          { id: "icecream", label: "Ice Cream", emoji: "🍦" },
          { id: "cookie", label: "Cookie", emoji: "🍪" },
          { id: "bread", label: "Bread", emoji: "🍞" }
        ]
      },
      {
        id: "s4-emotions",
        instruction: "Match 6 faces",
        pieces: [
          { id: "happy", label: "Happy", emoji: "😊" },
          { id: "sad", label: "Sad", emoji: "😢" },
          { id: "angry", label: "Angry", emoji: "😡" },
          { id: "surprised", label: "Surprised", emoji: "😲" },
          { id: "sleepy", label: "Sleepy", emoji: "😴" },
          { id: "silly", label: "Silly", emoji: "🤪" }
        ]
      },
      {
        id: "s4-weather",
        instruction: "Match 6 weather icons",
        pieces: [
          { id: "sun", label: "Sunny", emoji: "☀️" },
          { id: "cloud", label: "Cloudy", emoji: "☁️" },
          { id: "rain", label: "Rainy", emoji: "🌧️" },
          { id: "storm", label: "Stormy", emoji: "⛈️" },
          { id: "snow", label: "Snowy", emoji: "🌨️" },
          { id: "rainbow", label: "Rainbow", emoji: "🌈" }
        ]
      }
    ]
  }
];

// ----- Sticker mapping (one per stage) -----
const STAGE_STICKER_EMOJIS = ["🐾", "⭐", "🍎", "🌈"];

// ----- Keys -----
const KEY_PROGRESS = "puzzleProgress_v4";
const SOUND_KEY = "emojiApp_soundEnabled";
const CONTRAST_KEY = "emojiApp_highContrastMode";

// ----- Progress tracking -----
let progress = {};

// ----- State -----
let currentStageIndex = 0;
let currentPuzzleIndex = 0;
let placedCount = 0;
let longPressTimeout = null;
let soundEnabled = true;

// ----- DOM refs -----
const stageBar = document.getElementById("stageBar");
const targetBoard = document.getElementById("targetBoard");
const pieceBoard = document.getElementById("pieceBoard");
const statusBox = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextBtn");
const nextStageBtn = document.getElementById("nextStageBtn");
const subtitleEl = document.querySelector(".subtitle");
const homeBtn = document.getElementById("homeBtn");
const soundToggleBtn = document.getElementById("soundToggleBtn");
const stickerBookBtn = document.getElementById("stickerBookBtn");

const rewardOverlay = document.getElementById("rewardOverlay");
const rewardTitle = document.getElementById("rewardTitle");
const rewardMessage = document.getElementById("rewardMessage");
const rewardPrimaryBtn = document.getElementById("rewardPrimaryBtn");

const stickerBookOverlay = document.getElementById("stickerBookOverlay");
const stickerList = document.getElementById("stickerList");
const stickerCloseBtn = document.getElementById("stickerCloseBtn");

// ----- Sounds -----
const sounds = {
  success: new Audio("sounds/success.wav"),
  error: new Audio("sounds/error.wav"),
  stage: new Audio("sounds/stage_complete.wav")
};

function loadSoundSetting() {
  try {
    const raw = localStorage.getItem(SOUND_KEY);
    if (raw === null) return true;
    return raw === "true";
  } catch {
    return true;
  }
}

function saveSoundSetting() {
  try {
    localStorage.setItem(SOUND_KEY, String(soundEnabled));
  } catch {}
}

function updateSoundToggleUI() {
  if (!soundToggleBtn) return;
  soundToggleBtn.textContent = soundEnabled ? "Sound: On" : "Sound: Off";
}

function playSound(name) {
  if (!soundEnabled) return;
  const audio = sounds[name];
  if (!audio) return;
  try {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch {}
}

// ----- Child greeting -----
function updateNameGreeting(name) {
  const el = document.getElementById("nameGreeting");
  if (!el) return;
  el.textContent = name ? `🐻 Hi, ${name}!` : "";
}

// ----- Init -----
document.addEventListener("DOMContentLoaded", () => {
  // High contrast
  try {
    const raw = localStorage.getItem(CONTRAST_KEY);
    if (raw === "true") {
      document.body.classList.add("high-contrast");
    }
  } catch {}

  // Child name greeting
  const savedName = localStorage.getItem("childName") || "";
  updateNameGreeting(savedName);

  // Home button -> landing
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "landing.html";
    });
  }

  // Sound
  soundEnabled = loadSoundSetting();
  updateSoundToggleUI();
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      saveSoundSetting();
      updateSoundToggleUI();
    });
  }

  loadProgress();
  buildStageButtons();
  setStage(findFirstUnlockedStageIndex());

  resetBtn.addEventListener("click", () => {
    loadCurrentPuzzle();
  });

  nextBtn.addEventListener("click", () => {
    goToNextPuzzleInStage();
  });

  if (nextStageBtn) {
    nextStageBtn.addEventListener("click", () => {
      const idx = parseInt(nextStageBtn.dataset.stageIndex || "-1", 10);
      if (!Number.isNaN(idx) && idx >= 0 && idx < stages.length) {
        setStage(idx);
        hideNextStageButton();
      }
    });
  }

  // Sticker book
  if (stickerBookBtn && stickerBookOverlay && stickerList && stickerCloseBtn) {
    stickerBookBtn.addEventListener("click", () => {
      renderStickerBook();
      showStickerBookOverlay();
    });
    stickerCloseBtn.addEventListener("click", hideStickerBookOverlay);
  }

  if (rewardPrimaryBtn) {
    rewardPrimaryBtn.addEventListener("click", () => {
      hideRewardOverlay();
    });
  }
});

// ---------- Progress helpers ----------
function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY_PROGRESS);
    if (raw) {
      progress = JSON.parse(raw);
    } else {
      initialiseDefaultProgress();
    }
  } catch {
    initialiseDefaultProgress();
  }
}

function initialiseDefaultProgress() {
  progress = {};
  stages.forEach((stage, index) => {
    progress[stage.id] = {
      unlocked: index === 0,
      completedPuzzles: {}
    };
  });
  saveProgress();
}

function saveProgress() {
  try {
    localStorage.setItem(KEY_PROGRESS, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

function isStageUnlocked(stageId) {
  const s = progress[stageId];
  return s && s.unlocked;
}

function markStageUnlocked(stageId) {
  if (!progress[stageId]) {
    progress[stageId] = { unlocked: true, completedPuzzles: {} };
  } else {
    progress[stageId].unlocked = true;
  }
  saveProgress();
}

function markPuzzleCompleted(stageId, puzzleId) {
  if (!progress[stageId]) {
    progress[stageId] = { unlocked: false, completedPuzzles: {} };
  }
  if (!progress[stageId].completedPuzzles) {
    progress[stageId].completedPuzzles = {};
  }

  if (progress[stageId].completedPuzzles[puzzleId]) return;

  progress[stageId].completedPuzzles[puzzleId] = true;
  saveProgress();

  const stageIndex = stages.findIndex((s) => s.id === stageId);
  const stage = stages[stageIndex];

  const allDone = stage.puzzles.every((p) =>
    progress[stageId].completedPuzzles[p.id]
  );
  if (!allDone) return;

  // Stage finished
  playSound("stage");
  const isLastStage = stageIndex === stages.length - 1;

  if (isLastStage) {
    showStageCompletionOverlay(stageIndex, { allStagesComplete: true });
  } else {
    const nextStageIndex = stageIndex + 1;
    const nextStage = stages[nextStageIndex];
    if (nextStage && !isStageUnlocked(nextStage.id)) {
      markStageUnlocked(nextStage.id);
      statusBox.textContent = `${nextStage.name} unlocked! 🎉`;
      buildStageButtons();
      showNextStageButton(nextStageIndex);
    }
    showStageCompletionOverlay(stageIndex, { allStagesComplete: false });
  }
}

function findFirstUnlockedStageIndex() {
  // Always start at Stage 1 (index 0), even if higher stages are unlocked
  return 0;
}

// Parent override (long press)
function parentOverrideUnlock(stageId) {
  if (isStageUnlocked(stageId)) return;
  markStageUnlocked(stageId);
  statusBox.textContent = "Stage unlocked for parent use.";
  buildStageButtons();
}

// ----- Stage / puzzle helpers -----
function buildStageButtons() {
  stageBar.innerHTML = "";
  stages.forEach((stage, index) => {
    const btn = document.createElement("button");
    btn.className = "stage-button";
    btn.setAttribute("data-stage-index", index);
    btn.textContent = stage.name;
    btn.title = stage.label;

    const unlocked = isStageUnlocked(stage.id);
    if (!unlocked) btn.classList.add("locked");

    btn.addEventListener("click", () => {
      if (!isStageUnlocked(stage.id)) {
        statusBox.textContent = `Finish ${stages[index - 1]?.name || "previous puzzles"} to unlock this.`;
        return;
      }
      setStage(index);
    });

    const startLongPress = () => {
      if (longPressTimeout) clearTimeout(longPressTimeout);
      longPressTimeout = setTimeout(() => {
        parentOverrideUnlock(stage.id);
      }, 1800);
    };
    const cancelLongPress = () => {
      if (longPressTimeout) {
        clearTimeout(longPressTimeout);
        longPressTimeout = null;
      }
    };

    btn.addEventListener("mousedown", startLongPress);
    btn.addEventListener("touchstart", startLongPress);
    btn.addEventListener("mouseup", cancelLongPress);
    btn.addEventListener("mouseleave", cancelLongPress);
    btn.addEventListener("touchend", cancelLongPress);
    btn.addEventListener("touchcancel", cancelLongPress);

    stageBar.appendChild(btn);
  });

  updateStageButtonStyles();
}

function setStage(index) {
  if (index < 0 || index >= stages.length) return;
  currentStageIndex = index;
  currentPuzzleIndex = 0;
  placedCount = 0;
  hideNextStageButton();
  hideRewardOverlay();
  updateStageButtonStyles();
  loadCurrentPuzzle();
}

function updateStageButtonStyles() {
  const buttons = stageBar.querySelectorAll(".stage-button");
  buttons.forEach((btn) => {
    const idx = parseInt(btn.getAttribute("data-stage-index"), 10);
    if (idx === currentStageIndex) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

function getCurrentStage() {
  return stages[currentStageIndex];
}

function getCurrentPuzzle() {
  const stage = getCurrentStage();
  return stage.puzzles[currentPuzzleIndex];
}

function goToNextPuzzleInStage() {
  const stage = getCurrentStage();
  currentPuzzleIndex = (currentPuzzleIndex + 1) % stage.puzzles.length;
  placedCount = 0;
  loadCurrentPuzzle();
}

// ----- Next stage button -----
function showNextStageButton(stageIndex) {
  if (!nextStageBtn) return;
  const stage = stages[stageIndex];
  if (!stage) return;
  nextStageBtn.textContent = `Go to ${stage.name}`;
  nextStageBtn.dataset.stageIndex = String(stageIndex);
  nextStageBtn.classList.remove("hidden");
}

function hideNextStageButton() {
  if (!nextStageBtn) return;
  nextStageBtn.classList.add("hidden");
  nextStageBtn.removeAttribute("data-stage-index");
}

// ----- Reward overlay -----
function showStageCompletionOverlay(stageIndex, options = {}) {
  if (!rewardOverlay || !rewardTitle || !rewardMessage || !rewardPrimaryBtn) return;

  const allStagesComplete = !!options.allStagesComplete;

  if (allStagesComplete) {
    rewardTitle.textContent = "Amazing work!";
    rewardMessage.textContent =
      "You finished all the stages. Start again at Stage 1 when you're ready.";
    rewardPrimaryBtn.textContent = "Play again from Stage 1";

    rewardPrimaryBtn.onclick = () => {
      resetAllProgressAndGoStage1();
      hideRewardOverlay();
    };
  } else {
    rewardTitle.textContent = "Great job!";
    rewardMessage.textContent = "You finished this stage.";
    rewardPrimaryBtn.textContent = "OK";

    rewardPrimaryBtn.onclick = () => {
      hideRewardOverlay();
    };
  }

  rewardOverlay.classList.remove("hidden");
  rewardOverlay.style.display = "flex";
  rewardOverlay.setAttribute("aria-hidden", "false");
}

function hideRewardOverlay() {
  if (!rewardOverlay) return;
  rewardOverlay.classList.add("hidden");
  rewardOverlay.style.display = "none";
  rewardOverlay.setAttribute("aria-hidden", "true");
}

// Reset all progress and go to Stage 1
function resetAllProgressAndGoStage1() {
  try {
    localStorage.removeItem(KEY_PROGRESS);
  } catch {
    // ignore
  }
  initialiseDefaultProgress();
  buildStageButtons();
  setStage(0);
  statusBox.textContent = "";
}

// ----- Load a puzzle -----
function loadCurrentPuzzle() {
  const stage = getCurrentStage();
  const puzzle = getCurrentPuzzle();

  placedCount = 0;
  targetBoard.innerHTML = "";
  pieceBoard.innerHTML = "";
  statusBox.textContent = "";
  hideNextStageButton();
  hideRewardOverlay();

  subtitleEl.textContent = puzzle.instruction || stage.instruction;

  puzzle.pieces.forEach((piece) => {
    const target = document.createElement("div");
    target.className = "target";
    target.setAttribute("data-match-id", piece.id);

    const emojiShadow = document.createElement("div");
    emojiShadow.textContent = piece.emoji;
    emojiShadow.style.opacity = "0.3";
    emojiShadow.style.transform = "scale(0.9)";

    const label = document.createElement("div");
    label.className = "target-label";
    label.textContent = piece.label;

    target.appendChild(emojiShadow);
    target.appendChild(label);

    setupTargetDragEvents(target);
    targetBoard.appendChild(target);
  });

  const shuffledPieces = shuffleArray([...puzzle.pieces]);

  shuffledPieces.forEach((piece) => {
    const pieceEl = document.createElement("div");
    pieceEl.className = "piece";
    pieceEl.setAttribute("draggable", "true");
    pieceEl.setAttribute("data-piece-id", piece.id);

    const emoji = document.createElement("div");
    emoji.textContent = piece.emoji;

    const label = document.createElement("div");
    label.className = "piece-label";
    label.textContent = piece.label;

    pieceEl.appendChild(emoji);
    pieceEl.appendChild(label);

    setupPieceDragEvents(pieceEl);
    pieceBoard.appendChild(pieceEl);
  });
}

// ----- Drag-and-drop -----
function setupPieceDragEvents(pieceEl) {
  pieceEl.addEventListener("dragstart", (e) => {
    const id = pieceEl.getAttribute("data-piece-id");
    e.dataTransfer.setData("text/plain", id);
    setTimeout(() => {
      pieceEl.style.opacity = "0.6";
    }, 0);
  });

  pieceEl.addEventListener("dragend", () => {
    pieceEl.style.opacity = "1";
  });
}

function setupTargetDragEvents(targetEl) {
  targetEl.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!targetEl.classList.contains("target-hover")) {
      targetEl.classList.add("target-hover");
    }
  });

  targetEl.addEventListener("dragleave", () => {
    targetEl.classList.remove("target-hover");
  });

  targetEl.addEventListener("drop", (e) => {
    e.preventDefault();
    targetEl.classList.remove("target-hover");

    const pieceId = e.dataTransfer.getData("text/plain");
    const matchId = targetEl.getAttribute("data-match-id");

    if (targetEl.querySelector(".piece")) return;

    const pieceEl = document.querySelector(
      `.piece[data-piece-id="${pieceId}"]`
    );
    if (!pieceEl) return;

    if (pieceId === matchId) {
      pieceEl.classList.add("locked");
      pieceEl.setAttribute("draggable", "false");
      pieceEl.style.opacity = "1";
      targetEl.appendChild(pieceEl);
      placedCount++;
      gentleSuccessFeedback();

      if (placedCount === getCurrentPuzzlePieceCount()) {
        statusBox.textContent = "All done! Great job! 🎉";
        const stage = getCurrentStage();
        const puzzle = getCurrentPuzzle();
        markPuzzleCompleted(stage.id, puzzle.id);
      }
    } else {
      gentleTryAgainFeedback();
    }
  });
}

function getCurrentPuzzlePieceCount() {
  return getCurrentPuzzle().pieces.length;
}

// ----- Gentle feedback -----
function gentleSuccessFeedback() {
  playSound("success");
  statusBox.textContent = "Nice!";
  setTimeout(() => {
    if (placedCount !== getCurrentPuzzlePieceCount()) {
      statusBox.textContent = "";
    }
  }, 800);
}

function gentleTryAgainFeedback() {
  playSound("error");
  statusBox.textContent = "Try a different one 🙂";
  setTimeout(() => {
    if (placedCount !== getCurrentPuzzlePieceCount()) {
      statusBox.textContent = "";
    }
  }, 800);
}

// ----- Sticker book helpers -----
function getCompletedStageIndexes() {
  const completed = [];
  stages.forEach((stage, index) => {
    const record = progress[stage.id];
    if (!record || !record.completedPuzzles) return;
    const allDone = stage.puzzles.every(
      (p) => record.completedPuzzles[p.id]
    );
    if (allDone) {
      completed.push(index);
    }
  });
  return completed;
}

function renderStickerBook() {
  if (!stickerList) return;

  const completedStages = new Set(getCompletedStageIndexes());
  stickerList.innerHTML = "";

  stages.forEach((stage, index) => {
    const emoji = STAGE_STICKER_EMOJIS[index] || "⭐";
    const earned = completedStages.has(index);

    const item = document.createElement("div");
    item.className = "sticker-item " + (earned ? "earned" : "locked");
    item.innerHTML = `
      <div class="sticker-emoji">${emoji}</div>
      <div class="sticker-label">Stage ${index + 1}</div>
    `;
    stickerList.appendChild(item);
  });
}

function showStickerBookOverlay() {
  if (!stickerBookOverlay) return;
  stickerBookOverlay.classList.remove("hidden");
  stickerBookOverlay.style.display = "flex";
  stickerBookOverlay.setAttribute("aria-hidden", "false");
}

function hideStickerBookOverlay() {
  if (!stickerBookOverlay) return;
  stickerBookOverlay.classList.add("hidden");
  stickerBookOverlay.style.display = "none";
  stickerBookOverlay.setAttribute("aria-hidden", "true");
}

// ----- Utility -----
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
