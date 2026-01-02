(() => {
  const puzzleArea = document.getElementById("puzzleArea");
  const pieceTray = document.getElementById("pieceTray");
  const sourceCanvas = document.getElementById("sourceCanvas");
  const guideCanvas = document.getElementById("guideCanvas");
  const previewCanvas = document.getElementById("previewCanvas");

  const subtitle = document.getElementById("subtitle");
  const sizeSelect = document.getElementById("sizeSelect");
  const resetBtn = document.getElementById("resetBtn");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const newPuzzleBtn = document.getElementById("newPuzzleBtn");

  const progressText = document.getElementById("progressText");
  const progressFill = document.getElementById("progressFill");

  const winOverlay = document.getElementById("winOverlay");
  const closeWinBtn = document.getElementById("closeWinBtn");
  const nextWinBtn = document.getElementById("nextWinBtn");
  const confettiCanvas = document.getElementById("confettiCanvas");

  // ====== MULTI-PUZZLE SET ======
  // These are "single picture" scenes: background + one main emoji + a couple accents.
  // Keep them simple (one hero subject) for toddlers.
  const PUZZLES = [
    {
      name: "Kitty in the Sky",
      bg: ["#2a7bd6", "#7fd3ff", "#1e3a2f"],
      hero: "🐱",
      accents: [
        { emoji: "🌈", x: 0.16, y: 0.22, size: 0.10 },
        { emoji: "⭐", x: 0.83, y: 0.18, size: 0.10 }
      ],
      clouds: true,
      ground: true
    },
    {
      name: "Happy Puppy",
      bg: ["#3b82f6", "#a5f3fc", "#14532d"],
      hero: "🐶",
      accents: [
        { emoji: "🦴", x: 0.18, y: 0.72, size: 0.11 },
        { emoji: "🐾", x: 0.82, y: 0.70, size: 0.11 }
      ],
      clouds: true,
      ground: true
    },
    {
      name: "Bunny Garden",
      bg: ["#60a5fa", "#bbf7d0", "#166534"],
      hero: "🐰",
      accents: [
        { emoji: "🥕", x: 0.18, y: 0.72, size: 0.12 },
        { emoji: "🌷", x: 0.82, y: 0.72, size: 0.12 }
      ],
      clouds: true,
      ground: true
    },
    {
      name: "Dino Land",
      bg: ["#22c55e", "#a7f3d0", "#064e3b"],
      hero: "🦖",
      accents: [
        { emoji: "🌋", x: 0.18, y: 0.68, size: 0.12 },
        { emoji: "🌴", x: 0.84, y: 0.70, size: 0.12 }
      ],
      clouds: false,
      ground: true
    },
    {
      name: "Ocean Fish",
      bg: ["#0ea5e9", "#67e8f9", "#082f49"],
      hero: "🐠",
      accents: [
        { emoji: "🐚", x: 0.18, y: 0.78, size: 0.12 },
        { emoji: "⭐", x: 0.82, y: 0.78, size: 0.12 }
      ],
      bubbles: true
    },
    {
      name: "Turtle Beach",
      bg: ["#38bdf8", "#fde68a", "#0f766e"],
      hero: "🐢",
      accents: [
        { emoji: "🏖️", x: 0.18, y: 0.76, size: 0.12 },
        { emoji: "🌴", x: 0.84, y: 0.72, size: 0.12 }
      ],
      clouds: true,
      ground: true
    },
    {
      name: "Rocket Space",
      bg: ["#0b1020", "#1f2a5a", "#000000"],
      hero: "🚀",
      accents: [
        { emoji: "🪐", x: 0.18, y: 0.22, size: 0.12 },
        { emoji: "⭐", x: 0.82, y: 0.20, size: 0.12 }
      ],
      stars: true
    },
    {
      name: "Car Ride",
      bg: ["#60a5fa", "#e0f2fe", "#14532d"],
      hero: "🚗",
      accents: [
        { emoji: "🛣️", x: 0.50, y: 0.76, size: 0.16 },
        { emoji: "🌳", x: 0.84, y: 0.68, size: 0.12 }
      ],
      clouds: true,
      ground: true
    },
    {
      name: "Train Track",
      bg: ["#93c5fd", "#dbeafe", "#166534"],
      hero: "🚂",
      accents: [
        { emoji: "🛤️", x: 0.50, y: 0.78, size: 0.16 },
        { emoji: "🚦", x: 0.18, y: 0.70, size: 0.12 }
      ],
      clouds: true,
      ground: true
    },
    {
      name: "Ice Cream Party",
      bg: ["#f472b6", "#fde68a", "#60a5fa"],
      hero: "🍦",
      accents: [
        { emoji: "🍭", x: 0.18, y: 0.72, size: 0.12 },
        { emoji: "🎈", x: 0.84, y: 0.26, size: 0.12 }
      ],
      confetti: true
    },
    {
      name: "Apple Snack",
      bg: ["#86efac", "#dcfce7", "#166534"],
      hero: "🍎",
      accents: [
        { emoji: "🍌", x: 0.18, y: 0.72, size: 0.12 },
        { emoji: "🍓", x: 0.84, y: 0.72, size: 0.12 }
      ],
      clouds: false,
      ground: true
    },
    {
      name: "Sun & Flower",
      bg: ["#38bdf8", "#fef08a", "#16a34a"],
      hero: "🌻",
      accents: [
        { emoji: "☀️", x: 0.84, y: 0.22, size: 0.12 },
        { emoji: "🐝", x: 0.18, y: 0.30, size: 0.10 }
      ],
      clouds: true,
      ground: true
    }
  ];

  let currentPuzzleIndex = 0;

  let N = parseInt(sizeSelect?.value || "4", 10);
  let placedCount = 0;

  // edgeMap[r][c] = { top, right, bottom, left } : 0 flat, +1 tab, -1 hole
  let edgeMap = [];
  let pieces = [];
  let dragging = null;

  function randInt(n){ return Math.floor(Math.random() * n); }
  function shuffled(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = randInt(i+1);
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }

  function pickNextPuzzleIndex(){
    if (PUZZLES.length <= 1) return 0;
    let idx = currentPuzzleIndex;
    while (idx === currentPuzzleIndex) idx = randInt(PUZZLES.length);
    return idx;
  }

  // ---------- Overlay control ----------
  function hideWin(){
    stopConfetti();
    winOverlay.hidden = true;
    winOverlay.setAttribute("aria-hidden", "true");
  }

  function showWin(){
    winOverlay.hidden = false;
    winOverlay.setAttribute("aria-hidden", "false");
    fireConfetti();
  }

  winOverlay.addEventListener("click", (e) => {
    if (e.target === winOverlay) hideWin();
  });

  closeWinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideWin();
  });

  nextWinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideWin();
    newPuzzle(true);
  });

  // ---------- Progress ----------
  function setProgress(){
    const total = N * N;
    progressText.textContent = `${placedCount}/${total}`;
    progressFill.style.width = `${Math.round((placedCount / total) * 100)}%`;
  }

  // ---------- Source: single “emoji picture” scene ----------
  function buildSourceImage(puzzle){
    const ctx = sourceCanvas.getContext("2d");
    const size = 900;
    sourceCanvas.width = size;
    sourceCanvas.height = size;

    // background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, size);
    bg.addColorStop(0, puzzle.bg[0]);
    bg.addColorStop(0.55, puzzle.bg[1]);
    bg.addColorStop(1, puzzle.bg[2]);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    // optional stars
    if (puzzle.stars){
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      for(let i=0;i<70;i++){
        const x = Math.random()*size;
        const y = Math.random()*size*0.55;
        const r = 0.6 + Math.random()*1.6;
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2);
        ctx.fill();
      }
    }

    // optional clouds
    if (puzzle.clouds){
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      drawCloud(ctx, size*0.22, size*0.20, size*0.18);
      drawCloud(ctx, size*0.58, size*0.16, size*0.22);
      drawCloud(ctx, size*0.75, size*0.30, size*0.16);
    }

    // optional bubbles
    if (puzzle.bubbles){
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 2;
      for(let i=0;i<24;i++){
        const x = Math.random()*size;
        const y = size*0.35 + Math.random()*size*0.60;
        const r = 8 + Math.random()*22;
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2);
        ctx.stroke();
      }
    }

    // optional ground band
    if (puzzle.ground){
      ctx.fillStyle = "rgba(34,197,94,0.30)";
      ctx.fillRect(0, size*0.68, size, size*0.32);
    }

    // optional confetti specks
    if (puzzle.confetti){
      for(let i=0;i<180;i++){
        const x = Math.random()*size;
        const y = Math.random()*size;
        const w = 2 + Math.random()*4;
        const h = 2 + Math.random()*4;
        ctx.fillStyle = `hsla(${Math.random()*360}, 90%, 60%, 0.22)`;
        ctx.fillRect(x,y,w,h);
      }
    }

    // vignette
    const g = ctx.createRadialGradient(size*0.5,size*0.48,size*0.18, size*0.5,size*0.48,size*0.78);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,0.32)");
    ctx.fillStyle = g;
    ctx.fillRect(0,0,size,size);

    // hero
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${size * 0.46}px system-ui, Apple Color Emoji, Segoe UI Emoji`;
    ctx.fillText(puzzle.hero, size*0.5, size*0.50);

    // accents
    if (Array.isArray(puzzle.accents)){
      for(const a of puzzle.accents){
        ctx.font = `${size * (a.size ?? 0.10)}px system-ui, Apple Color Emoji, Segoe UI Emoji`;
        ctx.fillText(a.emoji, size*(a.x ?? 0.5), size*(a.y ?? 0.5));
      }
    }

    drawPreview();
  }

  function drawCloud(ctx, cx, cy, r){
    ctx.beginPath();
    ctx.arc(cx - r*0.7, cy, r*0.55, 0, Math.PI*2);
    ctx.arc(cx, cy - r*0.15, r*0.70, 0, Math.PI*2);
    ctx.arc(cx + r*0.75, cy, r*0.52, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }

  function drawPreview(){
    const ctx = previewCanvas.getContext("2d");
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    // Match whatever you set in CSS for preview size (e.g., 140)
    const size = 140;

    previewCanvas.width = size * dpr;
    previewCanvas.height = size * dpr;
    previewCanvas.style.width = `${size}px`;
    previewCanvas.style.height = `${size}px`;
    ctx.setTransform(dpr,0,0,dpr,0,0);

    ctx.clearRect(0,0,size,size);
    ctx.drawImage(sourceCanvas, 0,0,sourceCanvas.width,sourceCanvas.height, 0,0, size,size);
  }

  // ---------- Edge map ----------
  function buildEdgeMap(){
    edgeMap = Array.from({ length: N }, () =>
      Array.from({ length: N }, () => ({ top:0, right:0, bottom:0, left:0 }))
    );

    for(let r=0; r<N; r++){
      for(let c=0; c<N; c++){
        const e = edgeMap[r][c];

        e.top = (r === 0) ? 0 : -edgeMap[r-1][c].bottom;
        e.left = (c === 0) ? 0 : -edgeMap[r][c-1].right;

        e.right = (c === N-1) ? 0 : (randInt(2) ? 1 : -1);
        e.bottom = (r === N-1) ? 0 : (randInt(2) ? 1 : -1);
      }
    }
  }

  // ---------- Jigsaw path (used for cutting pieces) ----------
  function buildJigsawPath(ctx, x, y, w, h, edges){
    const tab = Math.min(w, h) * 0.22;
    const neck = Math.min(w, h) * 0.08;
    const midW = w * 0.5;
    const midH = h * 0.5;

    function bumpTop(sign){
      const dir = -sign;
      ctx.lineTo(x + midW - neck, y);
      ctx.bezierCurveTo(x + midW - neck, y + dir*tab*0.2, x + midW - tab, y + dir*tab*0.55, x + midW, y + dir*tab);
      ctx.bezierCurveTo(x + midW + tab,  y + dir*tab*0.55, x + midW + neck, y + dir*tab*0.2, x + midW + neck, y);
      ctx.lineTo(x + w, y);
    }

    function bumpRight(sign){
      const dir = sign;
      ctx.lineTo(x + w, y + midH - neck);
      ctx.bezierCurveTo(x + w + dir*tab*0.2, y + midH - neck, x + w + dir*tab*0.55, y + midH - tab, x + w + dir*tab, y + midH);
      ctx.bezierCurveTo(x + w + dir*tab*0.55, y + midH + tab, x + w + dir*tab*0.2, y + midH + neck, x + w, y + midH + neck);
      ctx.lineTo(x + w, y + h);
    }

    function bumpBottom(sign){
      const dir = sign;
      ctx.lineTo(x + midW + neck, y + h);
      ctx.bezierCurveTo(x + midW + neck, y + h + dir*tab*0.2, x + midW + tab, y + h + dir*tab*0.55, x + midW, y + h + dir*tab);
      ctx.bezierCurveTo(x + midW - tab,  y + h + dir*tab*0.55, x + midW - neck, y + h + dir*tab*0.2, x + midW - neck, y + h);
      ctx.lineTo(x, y + h);
    }

    function bumpLeft(sign){
      const dir = -sign;
      ctx.lineTo(x, y + midH + neck);
      ctx.bezierCurveTo(x + dir*tab*0.2, y + midH + neck, x + dir*tab*0.55, y + midH + tab, x + dir*tab, y + midH);
      ctx.bezierCurveTo(x + dir*tab*0.55, y + midH - tab, x + dir*tab*0.2, y + midH - neck, x, y + midH - neck);
      ctx.lineTo(x, y);
    }

    ctx.beginPath();
    ctx.moveTo(x, y);

    if(edges.top === 0) ctx.lineTo(x + w, y); else bumpTop(edges.top);
    if(edges.right === 0) ctx.lineTo(x + w, y + h); else bumpRight(edges.right);
    if(edges.bottom === 0) ctx.lineTo(x, y + h); else bumpBottom(edges.bottom);
    if(edges.left === 0) ctx.closePath(); else { bumpLeft(edges.left); ctx.closePath(); }
  }

  // ---------- Pieces ----------
  function createPieces(){
    pieces = [];
    const srcW = sourceCanvas.width;
    const srcH = sourceCanvas.height;

    const cellW = srcW / N;
    const cellH = srcH / N;
    const bleed = Math.min(cellW, cellH) * 0.28;

    for(let r=0; r<N; r++){
      for(let c=0; c<N; c++){
        const edges = edgeMap[r][c];

        const pw = Math.round(cellW + bleed * 2);
        const ph = Math.round(cellH + bleed * 2);

        const wrap = document.createElement("div");
        wrap.className = "piece";
        wrap.dataset.row = String(r);
        wrap.dataset.col = String(c);

        const cv = document.createElement("canvas");
        cv.width = pw;
        cv.height = ph;
        wrap.appendChild(cv);

        const ctx = cv.getContext("2d");

        buildJigsawPath(ctx, bleed, bleed, cellW, cellH, edges);
        ctx.save();
        ctx.clip();

        ctx.drawImage(
          sourceCanvas,
          c * cellW - bleed, r * cellH - bleed, cellW + bleed * 2, cellH + bleed * 2,
          0, 0, pw, ph
        );
        ctx.restore();

        // Optional: faint edge stroke (keep subtle)
        ctx.save();
        buildJigsawPath(ctx, bleed, bleed, cellW, cellH, edges);
        ctx.lineWidth = Math.max(2, Math.min(cellW, cellH) * 0.02);
        ctx.strokeStyle = "rgba(255,255,255,0.10)";
        ctx.stroke();
        ctx.restore();

        pieces.push({ row:r, col:c, wrap, placed:false, bleed, cellW, pw });
        attachDrag(wrap);
      }
    }
  }

  // ---------- Guide (grid + preview piece shapes) ----------
  function drawGuide(){
    const rect = puzzleArea.getBoundingClientRect();
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));

    guideCanvas.width = Math.floor(rect.width * dpr);
    guideCanvas.height = Math.floor(rect.height * dpr);
    guideCanvas.style.width = `${rect.width}px`;
    guideCanvas.style.height = `${rect.height}px`;

    const ctx = guideCanvas.getContext("2d");
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,rect.width,rect.height);

    const cell = rect.width / N;

    // keep your grid lines (you said grid is fine)
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    for(let i=1;i<N;i++){
      ctx.beginPath(); ctx.moveTo(i*cell, 0); ctx.lineTo(i*cell, rect.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i*cell); ctx.lineTo(rect.width, i*cell); ctx.stroke();
    }

    // slot outlines (subtle)
    const tab = cell * 0.20;
    const neck = cell * 0.08;

    ctx.lineWidth = Math.max(1.2, cell * 0.012);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";

    for(let r=0; r<N; r++){
      for(let c=0; c<N; c++){
        const edges = edgeMap?.[r]?.[c];
        if(!edges) continue;

        const x = c * cell;
        const y = r * cell;

        drawGuidePiecePath(ctx, x, y, cell, cell, edges, tab, neck);
        ctx.stroke();
      }
    }
  }

  function drawGuidePiecePath(ctx, x, y, w, h, edges, tab, neck){
    const midW = w * 0.5;
    const midH = h * 0.5;

    function bumpTop(sign){
      const dir = -sign;
      ctx.lineTo(x + midW - neck, y);
      ctx.bezierCurveTo(x + midW - neck, y + dir*tab*0.2, x + midW - tab, y + dir*tab*0.55, x + midW, y + dir*tab);
      ctx.bezierCurveTo(x + midW + tab,  y + dir*tab*0.55, x + midW + neck, y + dir*tab*0.2, x + midW + neck, y);
      ctx.lineTo(x + w, y);
    }

    function bumpRight(sign){
      const dir = sign;
      ctx.lineTo(x + w, y + midH - neck);
      ctx.bezierCurveTo(x + w + dir*tab*0.2, y + midH - neck, x + w + dir*tab*0.55, y + midH - tab, x + w + dir*tab, y + midH);
      ctx.bezierCurveTo(x + w + dir*tab*0.55, y + midH + tab, x + w + dir*tab*0.2, y + midH + neck, x + w, y + midH + neck);
      ctx.lineTo(x + w, y + h);
    }

    function bumpBottom(sign){
      const dir = sign;
      ctx.lineTo(x + midW + neck, y + h);
      ctx.bezierCurveTo(x + midW + neck, y + h + dir*tab*0.2, x + midW + tab, y + h + dir*tab*0.55, x + midW, y + h + dir*tab);
      ctx.bezierCurveTo(x + midW - tab,  y + h + dir*tab*0.55, x + midW - neck, y + h + dir*tab*0.2, x + midW - neck, y + h);
      ctx.lineTo(x, y + h);
    }

    function bumpLeft(sign){
      const dir = -sign;
      ctx.lineTo(x, y + midH + neck);
      ctx.bezierCurveTo(x + dir*tab*0.2, y + midH + neck, x + dir*tab*0.55, y + midH + tab, x + dir*tab, y + midH);
      ctx.bezierCurveTo(x + dir*tab*0.55, y + midH - tab, x + dir*tab*0.2, y + midH - neck, x, y + midH - neck);
      ctx.lineTo(x, y);
    }

    ctx.beginPath();
    ctx.moveTo(x, y);

    if(edges.top === 0) ctx.lineTo(x + w, y); else bumpTop(edges.top);
    if(edges.right === 0) ctx.lineTo(x + w, y + h); else bumpRight(edges.right);
    if(edges.bottom === 0) ctx.lineTo(x, y + h); else bumpBottom(edges.bottom);
    if(edges.left === 0) ctx.closePath(); else { bumpLeft(edges.left); ctx.closePath(); }
  }

  // ---------- Tray ----------
  function layoutTray(){
    pieceTray.innerHTML = "";
    const order = shuffled(pieces);

    for(const p of order){
      p.wrap.classList.remove("floating", "dragging", "placed");
      p.wrap.style.removeProperty("--x");
      p.wrap.style.removeProperty("--y");
      p.wrap.style.removeProperty("--floatW");
      p.wrap.style.removeProperty("--floatH");
      p.wrap.style.zIndex = "";
      pieceTray.appendChild(p.wrap);
    }
  }

  function getPieceByEl(el){
    const r = parseInt(el.dataset.row, 10);
    const c = parseInt(el.dataset.col, 10);
    return pieces.find(p => p.row === r && p.col === c) || null;
  }

  // ---------- Drag / snap ----------
  function attachDrag(pieceEl){
    pieceEl.addEventListener("pointerdown", (e) => {
      const piece = getPieceByEl(pieceEl);
      if(!piece || piece.placed) return;

      e.preventDefault();
      pieceEl.setPointerCapture?.(e.pointerId);

      puzzleArea.appendChild(pieceEl);

      const area = puzzleArea.getBoundingClientRect();
      const cell = area.width / N;

      const scaleFactor = (piece.cellW + piece.bleed*2) / piece.cellW;
      const floatW = cell * scaleFactor;
      const floatH = floatW;

      const rect = pieceEl.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      dragging = { pieceEl, piece, offsetX, offsetY, floatW, floatH };

      pieceEl.classList.add("floating", "dragging");
      pieceEl.style.setProperty("--floatW", `${floatW}px`);
      pieceEl.style.setProperty("--floatH", `${floatH}px`);
      pieceEl.style.zIndex = "9999";

      moveFloating(e.clientX, e.clientY);

      window.addEventListener("pointermove", onMove, { passive:false });
      window.addEventListener("pointerup", onUp, { passive:false });
      window.addEventListener("pointercancel", onUp, { passive:false });
    }, { passive:false });
  }

  function moveFloating(clientX, clientY){
    if(!dragging) return;
    const area = puzzleArea.getBoundingClientRect();

    let x = (clientX - area.left) - dragging.offsetX;
    let y = (clientY - area.top) - dragging.offsetY;

    const maxX = area.width - dragging.floatW * 0.35;
    const maxY = area.height - dragging.floatH * 0.35;
    x = Math.max(-dragging.floatW * 0.35, Math.min(maxX, x));
    y = Math.max(-dragging.floatH * 0.35, Math.min(maxY, y));

    dragging.pieceEl.style.setProperty("--x", `${x}px`);
    dragging.pieceEl.style.setProperty("--y", `${y}px`);
  }

  function onMove(e){
    if(!dragging) return;
    e.preventDefault();
    moveFloating(e.clientX, e.clientY);
  }

  function onUp(e){
    if(!dragging) return;
    e.preventDefault();

    const { pieceEl, piece, floatW } = dragging;
    const area = puzzleArea.getBoundingClientRect();
    const cell = area.width / N;

    const bleedDisplay = (floatW - cell) / 2;
    const targetLeft = piece.col * cell - bleedDisplay;
    const targetTop  = piece.row * cell - bleedDisplay;

    const curLeft = parseFloat(pieceEl.style.getPropertyValue("--x")) || 0;
    const curTop  = parseFloat(pieceEl.style.getPropertyValue("--y")) || 0;

    const dist = Math.hypot(curLeft - targetLeft, curTop - targetTop);
    const snap = cell * 0.22;

    if(dist <= snap){
      piece.placed = true;
      placedCount++;
      setProgress();

      pieceEl.classList.remove("dragging");
      pieceEl.classList.add("placed");
      pieceEl.style.setProperty("--x", `${targetLeft}px`);
      pieceEl.style.setProperty("--y", `${targetTop}px`);
      pieceEl.style.zIndex = "";

      if(placedCount === N*N){
        showWin();
      }
    } else {
      pieceEl.classList.remove("floating", "dragging");
      pieceEl.style.removeProperty("--x");
      pieceEl.style.removeProperty("--y");
      pieceEl.style.removeProperty("--floatW");
      pieceEl.style.removeProperty("--floatH");
      pieceEl.style.zIndex = "";
      pieceTray.appendChild(pieceEl);
    }

    dragging = null;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
  }

  // ---------- Controls ----------
  function newPuzzle(pickDifferent = false){
    hideWin();

    N = parseInt(sizeSelect?.value || "4", 10);
    placedCount = 0;
    setProgress();

    puzzleArea.querySelectorAll(".piece").forEach(el => el.remove());
    pieceTray.innerHTML = "";

    if (pickDifferent) currentPuzzleIndex = pickNextPuzzleIndex();
    const puzzle = PUZZLES[currentPuzzleIndex];

    buildSourceImage(puzzle);
    buildEdgeMap();
    createPieces();
    layoutTray();
    drawGuide();

    subtitle.textContent = `Puzzle: ${puzzle.name}`;
  }

  function resetPuzzle(){
    hideWin();
    placedCount = 0;
    setProgress();

    for(const p of pieces) p.placed = false;

    puzzleArea.querySelectorAll(".piece").forEach(el => {
      el.classList.remove("floating", "dragging", "placed");
      el.style.removeProperty("--x");
      el.style.removeProperty("--y");
      el.style.removeProperty("--floatW");
      el.style.removeProperty("--floatH");
      el.style.zIndex = "";
      pieceTray.appendChild(el);
    });

    shuffleTray();
  }

  function shuffleTray(){
    hideWin();
    const unplaced = pieces.filter(p => !p.placed).map(p => p.wrap);
    const order = shuffled(unplaced);
    pieceTray.innerHTML = "";
    for(const el of order){
      el.classList.remove("floating", "dragging");
      el.style.removeProperty("--x");
      el.style.removeProperty("--y");
      el.style.removeProperty("--floatW");
      el.style.removeProperty("--floatH");
      el.style.zIndex = "";
      pieceTray.appendChild(el);
    }
  }

  sizeSelect?.addEventListener("change", () => newPuzzle(false));
  newPuzzleBtn?.addEventListener("click", () => newPuzzle(true));
  resetBtn?.addEventListener("click", resetPuzzle);
  shuffleBtn?.addEventListener("click", shuffleTray);

  // ---------- Confetti ----------
  let confettiAnim = null;

  function fireConfetti(){
    const ctx = confettiCanvas.getContext("2d");
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const rect = winOverlay.getBoundingClientRect();

    confettiCanvas.width = Math.floor(rect.width * dpr);
    confettiCanvas.height = Math.floor(rect.height * dpr);
    confettiCanvas.style.width = `${rect.width}px`;
    confettiCanvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr,0,0,dpr,0,0);

    const W = rect.width;
    const H = rect.height;

    const parts = Array.from({ length: 140 }, () => ({
      x: Math.random() * W,
      y: -20 - Math.random() * H * 0.4,
      r: 2 + Math.random() * 4,
      vy: 2 + Math.random() * 4.5,
      vx: -1.5 + Math.random() * 3,
      rot: Math.random() * Math.PI,
      vr: -0.15 + Math.random() * 0.3,
      a: 0.85 + Math.random() * 0.15
    }));

    const start = performance.now();
    const dur = 1800;

    function tick(now){
      const t = now - start;
      ctx.clearRect(0,0,W,H);

      for(const p of parts){
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.vy += 0.02;

        const hue = (p.x / W) * 360;
        ctx.save();
        ctx.globalAlpha = p.a * (1 - Math.min(1, t / dur));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = `hsl(${hue} 90% 60%)`;
        ctx.fillRect(-p.r, -p.r, p.r * 2.2, p.r * 1.2);
        ctx.restore();
      }

      if(t < dur){
        confettiAnim = requestAnimationFrame(tick);
      } else {
        stopConfetti();
      }
    }
    confettiAnim = requestAnimationFrame(tick);
  }

  function stopConfetti(){
    if(confettiAnim){
      cancelAnimationFrame(confettiAnim);
      confettiAnim = null;
    }
    const ctx = confettiCanvas.getContext("2d");
    ctx && ctx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
  }

  // ---------- Resize ----------
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawGuide, 120);
  });

  // ---------- Init ----------
  hideWin();
  currentPuzzleIndex = randInt(PUZZLES.length);
  newPuzzle(false);
})();
