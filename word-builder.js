/* =========================================================
   WORD BUILDER (Tap-to-Place, Strict Correctness)
   ---------------------------------------------------------
   Levels:
   - Level 1: 3-letter words, ordered tiles
   - Level 2: 4+ letter words, ordered tiles
   - Level 3: 3-letter words, shuffled tiles (not identical)
   - Level 4: 4+ letter words, shuffled tiles (not identical)
   - Level 5: 3-letter words, shuffled tiles + 1 distractor letter
   - Level 6: 4+ letter words, shuffled tiles + 1 distractor letter

   Rules:
   - Only the correct NEXT letter can be placed.
   - Wrong letters cannot be placed (gentle feedback).
   - Next is disabled until the word is completed correctly.
   - When solved on Levels 5–6: unused tiles fade/shrink (no text warning).
   - Level completion shows a modal + confetti burst (motion-safe).

   File: word-builder.js
   ========================================================= */

(() => {
  /* =========================
     WORD SETS (by level)
  ========================= */
  const LEVEL_SETS = {
    1: [ // 3-letter, ordered
      { emoji: "🐄", word: "COW" },
      { emoji: "🐶", word: "DOG" },
      { emoji: "🐱", word: "CAT" },
      { emoji: "🐷", word: "PIG" },
      { emoji: "🐝", word: "BEE" }
    ],
    2: [ // 4+ letters, ordered
      { emoji: "🐸", word: "FROG" },
      { emoji: "🐻", word: "BEAR" },
      { emoji: "🦆", word: "DUCK" },
      { emoji: "🦁", word: "LION" },
      { emoji: "🐴", word: "HORSE" }
    ],
    3: [ // 3-letter, shuffled (not identical)
      { emoji: "🦊", word: "FOX" },
      { emoji: "🐭", word: "RAT" },
      { emoji: "🐄", word: "COW" },
      { emoji: "🐶", word: "DOG" },
      { emoji: "🐱", word: "CAT" }
    ],
    4: [ // 4+ letters, shuffled (not identical)
      { emoji: "🍎", word: "APPLE" },
      { emoji: "🍌", word: "BANANA" },
      { emoji: "⭐", word: "STAR" },
      { emoji: "🌧️", word: "RAIN" },
      { emoji: "🦆", word: "DUCK" }
    ],
    5: [ // 3-letter, shuffled + 1 distractor
      { emoji: "🐄", word: "COW" },
      { emoji: "🐶", word: "DOG" },
      { emoji: "🐱", word: "CAT" },
      { emoji: "🐷", word: "PIG" },
      { emoji: "🐝", word: "BEE" }
    ],
    6: [ // 4+ letters, shuffled + 1 distractor
      { emoji: "🦆", word: "DUCK" },
      { emoji: "🐸", word: "FROG" },
      { emoji: "🐻", word: "BEAR" },
      { emoji: "🦁", word: "LION" },
      { emoji: "🍎", word: "APPLE" }
    ]
  };

  const MIN_LEVEL = 1;
  const MAX_LEVEL = 6;

  /* =========================
     STATE
  ========================= */
  let currentLevel = MIN_LEVEL;
  let currentWordIndex = 0; // within the current level set
  let currentSlotIndex = 0;

  /* =========================
     DOM HELPERS
  ========================= */
  const $ = (id) => document.getElementById(id);

  function requireEl(el, id) {
    if (!el) console.error(`[WordBuilder] Missing element id="${id}"`);
    return !!el;
  }

  /* =========================
     UTILS
  ========================= */
  function shuffleArray(arr) {
    return arr
      .map(v => ({ v, s: Math.random() }))
      .sort((a, b) => a.s - b.s)
      .map(({ v }) => v);
  }

  function shuffleNotSame(arr) {
    const original = arr.join("");
    let shuffled = arr.slice();
    let tries = 0;

    do {
      shuffled = shuffleArray(arr.slice());
      tries++;
      if (tries > 12) break; // safety
    } while (shuffled.join("") === original);

    return shuffled;
  }

  function isShuffledLevel(level) {
    return level === 3 || level === 4 || level === 5 || level === 6;
  }

  function isDistractorLevel(level) {
    return level === 5 || level === 6;
  }

  function getLevelWords(level) {
    return LEVEL_SETS[level] || LEVEL_SETS[MIN_LEVEL];
  }

  function getActiveItem() {
    const words = getLevelWords(currentLevel);
    return words[currentWordIndex];
  }

  function isWordCompleteAndCorrect(dom) {
    const target = getActiveItem().word;
    const fills = [...dom.slotsEl.querySelectorAll(".slot .fill")].map(f => f.textContent || "");
    return fills.join("") === target;
  }

  function wrongTapFeedback(tile) {
    tile.classList.add("wrong");
    setTimeout(() => tile.classList.remove("wrong"), 220);
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function pickDistractorLetter(word) {
    const used = new Set([...word]);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const candidates = alphabet.filter(ch => !used.has(ch));
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function confettiBurst(cardEl) {
    if (!cardEl || prefersReducedMotion()) return;

    const c = document.createElement("div");
    c.className = "confetti";
    cardEl.appendChild(c);

    const pieceCount = 36;
    const colors = ["#0ea5e9", "#7dd3fc", "#22c55e", "#facc15", "#a78bfa", "#fb7185", "#ffffff"];

    for (let i = 0; i < pieceCount; i++) {
      const p = document.createElement("i");

      const left = Math.random() * 100;
      const delay = Math.random() * 150;
      const w = 6 + Math.random() * 8;
      const h = 10 + Math.random() * 14;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const drift = (Math.random() * 120) - 60;

      p.style.left = `${left}%`;
      p.style.width = `${w}px`;
      p.style.height = `${h}px`;
      p.style.background = color;
      p.style.animationDelay = `${delay}ms`;
      p.style.transform = `translateX(${drift}px) rotate(${Math.random() * 360}deg)`;

      c.appendChild(p);
    }

    setTimeout(() => c.remove(), 1400);
  }

  /* =========================
     POST-SOLVE VISUALS
     - pulse slots (optional)
     - fade unused tiles on distractor levels (5–6)
  ========================= */
  function onWordSolved(dom) {
    // Optional slot pulse (requires CSS .slot.pulse keyframes)
    dom.slotsEl.querySelectorAll(".slot").forEach(s => {
      s.classList.add("pulse");
      setTimeout(() => s.classList.remove("pulse"), 300);
    });

    // Only fade unused tiles on Levels 5–6
    if (!isDistractorLevel(currentLevel)) return;

    dom.bankEl.querySelectorAll(".tile").forEach(tile => {
      if (!tile.classList.contains("used")) {
        tile.classList.add("irrelevant"); // requires CSS .tile.irrelevant
        tile.disabled = true;
      }
    });
  }

  /* =========================
     BUILD UI
  ========================= */
  function buildSlots(slotsEl, word) {
    slotsEl.innerHTML = "";

    [...word].forEach((letter, index) => {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.dataset.index = String(index);

      const guide = document.createElement("div");
      guide.className = "guide";
      guide.textContent = letter;

      const fill = document.createElement("div");
      fill.className = "fill";

      slot.appendChild(guide);
      slot.appendChild(fill);
      slotsEl.appendChild(slot);
    });
  }

  function buildLetterBank(bankEl, word, level, onTileTap) {
    bankEl.innerHTML = "";

    let letters = [...word];

    // Add ONE unusable letter for Levels 5–6
    if (isDistractorLevel(level)) {
      letters.push(pickDistractorLetter(word));
    }

    // Shuffle behavior:
    // - Levels 3–4: shuffle but don't allow the same order as the word
    // - Levels 5–6: shuffle all (includes distractor; "not identical" doesn't matter)
    if (level === 3 || level === 4) {
      letters = shuffleNotSame(letters);
    } else if (isShuffledLevel(level)) {
      letters = shuffleArray(letters);
    }
    // Levels 1–2: ordered (no change)

    letters.forEach(letter => {
      const tile = document.createElement("button");
      tile.className = "tile";
      tile.type = "button";
      tile.textContent = letter;
      tile.dataset.letter = letter;
      tile.addEventListener("click", () => onTileTap(tile));
      bankEl.appendChild(tile);
    });
  }

  /* =========================
     GAME LOGIC
  ========================= */
  function initWord(dom) {
    const { emoji, word } = getActiveItem();

    currentSlotIndex = 0;
    dom.emojiPrompt.textContent = emoji;

    if (dom.stageLabel) dom.stageLabel.textContent = `Stage ${currentWordIndex + 1}`;
    if (dom.levelLabel) dom.levelLabel.textContent = `Level ${currentLevel}`;

    buildSlots(dom.slotsEl, word);

    buildLetterBank(dom.bankEl, word, currentLevel, (tile) => {
      handleTileTap(dom, tile);
    });

    dom.nextBtn.disabled = true;
  }

  function handleTileTap(dom, tile) {
    if (tile.classList.contains("used")) return;

    const targetWord = getActiveItem().word;
    const expectedLetter = targetWord[currentSlotIndex];
    const tapped = tile.dataset.letter || tile.textContent;

    // Block wrong letters (including distractor)
    if (tapped !== expectedLetter) {
      wrongTapFeedback(tile);
      return;
    }

    const slots = dom.slotsEl.querySelectorAll(".slot");
    if (currentSlotIndex >= slots.length) return;

    const slot = slots[currentSlotIndex];
    const fill = slot.querySelector(".fill");
    if (!fill) return;

    fill.textContent = tapped;
    slot.classList.add("filled");

    tile.classList.add("used");
    tile.disabled = true;

    currentSlotIndex++;

    const solved = isWordCompleteAndCorrect(dom);
    dom.nextBtn.disabled = !solved;

    if (solved) {
      onWordSolved(dom);
    }
  }

  function resetWord(dom) {
    currentSlotIndex = 0;

    dom.slotsEl.querySelectorAll(".slot").forEach(slot => {
      slot.classList.remove("filled");
      slot.classList.remove("pulse");
      const fill = slot.querySelector(".fill");
      if (fill) fill.textContent = "";
    });

    dom.bankEl.querySelectorAll(".tile").forEach(tile => {
      tile.classList.remove("used");
      tile.classList.remove("irrelevant");
      tile.disabled = false;
    });

    dom.nextBtn.disabled = true;
  }

  function nextWord(dom) {
    if (!isWordCompleteAndCorrect(dom)) return;

    const words = getLevelWords(currentLevel);
    currentWordIndex++;

    // Finished this level's set
    if (currentWordIndex >= words.length) {
      showLevelComplete(dom);
      return;
    }

    initWord(dom);
  }

  /* =========================
     LEVEL COMPLETE MODAL
  ========================= */
  function showLevelComplete(dom) {
    const overlay = document.createElement("div");
    overlay.className = "reward-overlay";

    const nextLevel = currentLevel === MAX_LEVEL ? MIN_LEVEL : currentLevel + 1;

    overlay.innerHTML = `
      <div class="reward-content centered" role="dialog" aria-modal="true">
        <div class="reward-emoji">🎉🎉🎉</div>
        <h2 class="reward-title">Level ${currentLevel} Complete!</h2>
        <button class="btn-primary start-level-btn" type="button">
          Start Level ${nextLevel}
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Confetti burst on the card
    const card = overlay.querySelector(".reward-content.centered");
    confettiBurst(card);

    overlay.querySelector(".start-level-btn").addEventListener("click", () => {
      overlay.remove();
      currentLevel++;
      if (currentLevel > MAX_LEVEL) currentLevel = MIN_LEVEL;
      currentWordIndex = 0;
      initWord(dom);
    });
  }

  /* =========================
     BOOT
  ========================= */
  document.addEventListener("DOMContentLoaded", () => {
    const dom = {
      emojiPrompt: $("emojiPrompt"),
      slotsEl: $("slots"),
      bankEl: $("letterBank"),
      resetBtn: $("resetWordBtn"),
      nextBtn: $("nextBtn"),
      stageLabel: $("stageLabel"), // recommended
      levelLabel: $("levelLabel")  // recommended
    };

    const ok =
      requireEl(dom.emojiPrompt, "emojiPrompt") &
      requireEl(dom.slotsEl, "slots") &
      requireEl(dom.bankEl, "letterBank") &
      requireEl(dom.resetBtn, "resetWordBtn") &
      requireEl(dom.nextBtn, "nextBtn");

    if (!ok) return;

    dom.resetBtn.addEventListener("click", () => resetWord(dom));
    dom.nextBtn.addEventListener("click", () => nextWord(dom));

    initWord(dom);
    console.log("[WordBuilder] ready");
  });
})();
