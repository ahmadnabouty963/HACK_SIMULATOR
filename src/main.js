/* ============================================================
   GHOST_SYS TERMINAL — script.js
   ============================================================ */

"use strict";

/* ─────────────────────────────────────────────
   1.  MATRIX RAIN BACKGROUND
───────────────────────────────────────────── */
(function initMatrix() {
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  const CHARS =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>{}[]#$%@!?/\\|";
  let cols, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 16);
    drops = Array.from({ length: cols }, () => Math.random() * -100);
  }

  function draw() {
    ctx.fillStyle = "rgba(2, 11, 2, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cols; i++) {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      const y = drops[i] * 16;

      // Brightest char at head
      ctx.fillStyle = "#00ff41";
      ctx.font = "bold 14px 'Share Tech Mono', monospace";
      ctx.fillText(ch, i * 16, y);

      // Trail chars
      ctx.fillStyle = "#00c03288";
      ctx.font = "13px 'Share Tech Mono', monospace";
      ctx.fillText(
        CHARS[Math.floor(Math.random() * CHARS.length)],
        i * 16,
        y - 16,
      );

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    }
  }

  resize();
  window.addEventListener("resize", resize);
  setInterval(draw, 40);
})();

/* ─────────────────────────────────────────────
   2.  DOM REFERENCES
───────────────────────────────────────────── */
const outputArea = document.getElementById("output-area");
const inputDisplay = document.getElementById("input-display");
const hiddenInput = document.getElementById("hidden-input");
const termBody = document.getElementById("terminal-body");
const termContainer = document.querySelector(".terminal-container");

/* ─────────────────────────────────────────────
   3.  COMMAND DEFINITIONS
───────────────────────────────────────────── */
const COMMANDS = {
  help: () => [
    {
      text: "┌──────────────────────────────────────────────────────┐",
      cls: "dim",
    },
    {
      text: "│           AHMAD_SYS — COMMAND REFERENCE               │",
      cls: "cyan",
    },
    {
      text: "└──────────────────────────────────────────────────────┘",
      cls: "dim",
    },
    { text: "", cls: "blank" },
    { text: "  help     →  Display this help menu", cls: "info" },
    { text: "  scan     →  Scan local network for active hosts", cls: "info" },
    { text: "  hack     →  Initiate penetration sequence", cls: "info" },
    { text: "  joke     →  Print a hacker-grade joke", cls: "info" },
    { text: "  clear    →  Wipe terminal output", cls: "info" },
    { text: "", cls: "blank" },
    { text: "  [TIP] Commands are case-insensitive.", cls: "dim" },
    { text: "", cls: "blank" },
  ],

  scan: () => {
    const ips = Array.from({ length: 6 }, (_, i) => {
      const a = 192,
        b = 168,
        c = Math.floor(Math.random() * 3);
      const d = Math.floor(Math.random() * 253) + 1;
      const mac = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0"),
      ).join(":");
      const vendors = [
        "Intel Corp",
        "Raspberry Pi",
        "Cisco Systems",
        "Netgear",
        "Apple Inc",
        "Samsung Elec",
      ];
      const ports = [
        "22/ssh",
        "80/http",
        "443/https",
        "8080/http-alt",
        "3306/mysql",
        "21/ftp",
      ];
      const openPorts = [
        ports[Math.floor(Math.random() * ports.length)],
        ports[Math.floor(Math.random() * ports.length)],
      ];
      return {
        ip: `${a}.${b}.${c}.${d}`,
        mac,
        vendor: vendors[i],
        ports: [...new Set(openPorts)],
      };
    });

    const lines = [
      {
        text: ">> Initializing ARP sweep on 192.168.0.0/24 ...",
        cls: "warning",
      },
      { text: ">> Sending ICMP probes ...", cls: "dim" },
      { text: "", cls: "blank" },
    ];

    ips.forEach((host, idx) => {
      lines.push({
        text: `  [${String(idx + 1).padStart(2, "0")}] HOST FOUND`,
        cls: "success",
      });
      lines.push({ text: `       IP      : ${host.ip}`, cls: "info" });
      lines.push({ text: `       MAC     : ${host.mac}`, cls: "info" });
      lines.push({ text: `       VENDOR  : ${host.vendor}`, cls: "cyan" });
      lines.push({
        text: `       PORTS   : ${host.ports.join(", ")}`,
        cls: "warning",
      });
      lines.push({ text: "", cls: "blank" });
    });

    lines.push({
      text: `>> Scan complete. ${ips.length} hosts discovered.`,
      cls: "success",
    });
    lines.push({ text: "", cls: "blank" });
    return lines;
  },

  hack: () => [
    { text: ">> INITIALIZING PENETRATION SEQUENCE ...", cls: "warning" },
    { text: ">> Target: 192.168.1.1 | Port: 22 (SSH)", cls: "info" },
    { text: "", cls: "blank" },
    { text: ">> Loading exploit modules ...", cls: "dim" },
    // progress bars injected dynamically
    {
      text: "__PROGRESS__",
      bars: [
        "Bypassing firewall",
        "Injecting payload   ",
        "Escalating privs    ",
        "Dumping credentials ",
        "Covering tracks     ",
      ],
    },
    { text: "", cls: "blank" },
    { text: ">> [SUCCESS] Root shell obtained.", cls: "success" },
    {
      text:
        ">> Session ID : " +
        Math.random().toString(36).slice(2, 10).toUpperCase(),
      cls: "cyan",
    },
    {
      text: ">> Duration   : " + (Math.floor(Math.random() * 40) + 8) + "s",
      cls: "cyan",
    },
    { text: "", cls: "blank" },
    {
      text: ">> WARNING: All actions logged. For educational use only.",
      cls: "error",
    },
    { text: "", cls: "blank" },
  ],

  joke: () => {
    const jokes = [
      ["Why do hackers prefer dark mode?", "Because light attracts bugs."],
      [
        "Why was the JavaScript developer sad?",
        "Because he didn't know how to 'null' his feelings.",
      ],
      [
        "How many programmers to change a bulb?",
        "None — it's a hardware problem.",
      ],
      [
        "A SQL query walks into a bar...",
        "...walks up to two tables and asks: 'Can I join you?'",
      ],
      ["Why do Java developers wear glasses?", "Because they don't C#."],
      ["What did the router say to the doctor?", "It hurts when IP."],
      [
        "There are 10 types of people...",
        "Those who understand binary, and those who don't.",
      ],
    ];
    const [q, a] = jokes[Math.floor(Math.random() * jokes.length)];
    return [
      { text: ">> FETCHING JOKE FROM /dev/humor ...", cls: "dim" },
      { text: "", cls: "blank" },
      { text: `  Q: ${q}`, cls: "cyan" },
      { text: `  A: ${a}`, cls: "success" },
      { text: "", cls: "blank" },
    ];
  },

  clear: () => "CLEAR",
};

/* ─────────────────────────────────────────────
   4.  RENDERING HELPERS
───────────────────────────────────────────── */

/** Append a single text line to the output area */
function appendLine(text, cls = "info") {
  const el = document.createElement("span");
  el.className = `output-line ${cls}`;
  el.textContent = text;
  outputArea.appendChild(el);
  outputArea.appendChild(document.createElement("br"));
  scrollToBottom();
  return el;
}

/** Animated typing of a line character-by-character */
function typeLine(text, cls = "info", speed = 22) {
  return new Promise((resolve) => {
    const el = document.createElement("span");
    el.className = `output-line ${cls}`;
    outputArea.appendChild(el);
    outputArea.appendChild(document.createElement("br"));

    let i = 0;
    function tick() {
      if (i < text.length) {
        el.textContent += text[i++];
        scrollToBottom();
        setTimeout(tick, speed + Math.random() * 10);
      } else {
        resolve();
      }
    }
    tick();
  });
}

/** Animated progress bar */
function animateProgressBar(label) {
  return new Promise((resolve) => {
    const wrap = document.createElement("div");
    wrap.className = "progress-wrap";

    const lbl = document.createElement("span");
    lbl.className = "progress-label";
    lbl.textContent = label;

    const track = document.createElement("div");
    track.className = "progress-bar-track";

    const fill = document.createElement("div");
    fill.className = "progress-bar-fill";

    const pct = document.createElement("span");
    pct.className = "progress-pct";
    pct.textContent = "0%";

    track.appendChild(fill);
    wrap.appendChild(lbl);
    wrap.appendChild(track);
    wrap.appendChild(pct);
    outputArea.appendChild(wrap);
    scrollToBottom();

    let current = 0;
    const target = 100;
    const speed = 18 + Math.random() * 20;

    function step() {
      const increment = Math.random() * 6 + 1;
      current = Math.min(current + increment, target);
      fill.style.width = current + "%";
      pct.textContent = Math.floor(current) + "%";
      scrollToBottom();
      if (current < target) {
        setTimeout(step, speed);
      } else {
        fill.style.width = "100%";
        pct.textContent = "100%";
        setTimeout(resolve, 120);
      }
    }
    step();
  });
}

function scrollToBottom() {
  termBody.scrollTop = termBody.scrollHeight;
}

function glitchEffect() {
  termContainer.classList.add("glitch");
  setTimeout(() => termContainer.classList.remove("glitch"), 150);
}

/* ─────────────────────────────────────────────
   5.  COMMAND EXECUTOR
───────────────────────────────────────────── */
let busy = false;

async function executeCommand(raw) {
  if (busy) return;
  const cmd = raw.trim().toLowerCase();

  // Echo the command
  appendLine(`root@shadow:~$ ${raw}`, "echo");

  if (!cmd) {
    scrollToBottom();
    return;
  }

  if (!(cmd in COMMANDS)) {
    await typeLine(`bash: ${cmd}: command not found`, "error", 18);
    appendLine(`Type 'help' to see available commands.`, "dim");
    appendLine("", "blank");
    return;
  }

  if (cmd === "clear") {
    outputArea.innerHTML = "";
    return;
  }

  busy = true;
  setInputEnabled(false);

  const result = COMMANDS[cmd]();

  for (const item of result) {
    if (item.text === "__PROGRESS__") {
      for (const bar of item.bars) {
        await animateProgressBar(bar);
      }
    } else {
      const delay = item.cls === "blank" ? 0 : 28;
      await new Promise((r) => setTimeout(r, delay));
      appendLine(item.text, item.cls);
    }
  }

  glitchEffect();
  busy = false;
  setInputEnabled(true);
  hiddenInput.focus();
}

/* ─────────────────────────────────────────────
   6.  INPUT HANDLING
───────────────────────────────────────────── */
let inputEnabled = true;
let historyLog = [];
let historyIdx = -1;

function setInputEnabled(state) {
  inputEnabled = state;
  document.getElementById("input-line").style.display = state ? "flex" : "none";
}

hiddenInput.addEventListener("input", () => {
  inputDisplay.textContent = hiddenInput.value;
});

hiddenInput.addEventListener("keydown", async (e) => {
  if (!inputEnabled) return;

  if (e.key === "Enter") {
    const val = hiddenInput.value;
    hiddenInput.value = "";
    inputDisplay.textContent = "";
    historyLog.unshift(val);
    historyIdx = -1;
    await executeCommand(val);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIdx < historyLog.length - 1) {
      historyIdx++;
      hiddenInput.value = historyLog[historyIdx] || "";
      inputDisplay.textContent = hiddenInput.value;
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIdx > 0) {
      historyIdx--;
      hiddenInput.value = historyLog[historyIdx] || "";
      inputDisplay.textContent = hiddenInput.value;
    } else {
      historyIdx = -1;
      hiddenInput.value = "";
      inputDisplay.textContent = "";
    }
  }
});

// Click anywhere on terminal to focus input
termBody.addEventListener("click", () => hiddenInput.focus());

/* ─────────────────────────────────────────────
   7.  BOOT SEQUENCE
───────────────────────────────────────────── */
async function bootSequence() {
  busy = true;
  setInputEnabled(false);

  const bootLines = [
    {
      text: "AHMAD_SYS v4.2.1 — Secure Shell Emulator",
      cls: "success",
      speed: 14,
    },
    {
      text: "Copyright (C) 2026 ShadowNet Corp. All rights reserved.",
      cls: "dim",
      speed: 10,
    },
    { text: "", cls: "blank", speed: 0 },
    {
      text: "Initializing cryptographic engine  ... [OK]",
      cls: "info",
      speed: 12,
    },
    {
      text: "Loading kernel modules             ... [OK]",
      cls: "info",
      speed: 12,
    },
    {
      text: "Mounting encrypted filesystem      ... [OK]",
      cls: "info",
      speed: 12,
    },
    {
      text: "Establishing secure tunnel         ... [OK]",
      cls: "info",
      speed: 12,
    },
    {
      text: "Spoofing MAC address               ... [OK]",
      cls: "warning",
      speed: 12,
    },
    {
      text: "Routing through TOR exit nodes     ... [OK]",
      cls: "warning",
      speed: 12,
    },
    { text: "", cls: "blank", speed: 0 },
    { text: ">> ACCESS GRANTED. Welcome, root.", cls: "success", speed: 16 },
    {
      text: ">> Type 'help' to list available commands.",
      cls: "cyan",
      speed: 14,
    },
    { text: "", cls: "blank", speed: 0 },
  ];

  for (const line of bootLines) {
    if (line.speed === 0) {
      appendLine(line.text, line.cls);
      await new Promise((r) => setTimeout(r, 80));
    } else {
      await typeLine(line.text, line.cls, line.speed);
      await new Promise((r) => setTimeout(r, 55));
    }
  }

  busy = false;
  setInputEnabled(true);
  hiddenInput.focus();
}

bootSequence();
