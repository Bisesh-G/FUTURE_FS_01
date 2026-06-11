/* ============================
   ASMIT PORTFOLIO CHATBOT
   Offline Version — v2
   ============================ */

(function () {

  /* ── Knowledge Base ─────────────────────────────── */

  const KB = {
    name:       "Asmit Bisesh",
    location:   "Kalyani, West Bengal, India",
    status:     "4th year B.Tech Computer Science & Engineering student at Heritage Institute of Technology (2023–2027).",
    cgpa:       "7.51 (up to 5th Semester)",
    goal:       "Asmit's goal is to become a Full Stack Software Engineer while exploring Artificial Intelligence and Machine Learning.",
    internship: "Asmit is currently working as a Full Stack Web Development Intern at Future Interns.",

    education: [
      { place: "Heritage Institute of Technology", degree: "B.Tech CSE", year: "2023–2027", note: "CGPA: 7.51" },
      { place: "Julien Day School", degree: "Class XII (ISC Board)", year: "2023", note: "88%" },
      { place: "Julien Day School", degree: "Class X (ICSE Board)", year: "2021", note: "77%" },
    ],

    skills: {
      languages:  ["Python", "Java", "C++", "JavaScript"],
      frontend:   ["HTML", "CSS", "React"],
      backend:    ["Node.js", "Express.js"],
      database:   ["MongoDB"],
      ml:         ["TensorFlow", "Scikit-learn"],
      other:      ["Git", "GitHub", "REST APIs"],
    },

    projects: [
      {
        name: "Hospital Management System",
        stack: "MERN Stack (MongoDB, Express.js, React, Node.js)",
        features: ["Patient registration", "Appointment booking", "Doctor management", "Billing", "JWT Authentication"],
        github: "https://github.com/Bisesh-G",
      },
      {
        name: "Plant Disease Prediction",
        stack: "Python, Machine Learning, TensorFlow / Scikit-learn",
        features: ["Detect plant diseases from images", "CNN model", "TensorFlow", "Image classification"],
        github: "https://github.com/Bisesh-G",
      },
    ],

    interests: ["Full Stack Development", "Artificial Intelligence", "Machine Learning", "Cloud Computing", "Open Source", "Problem Solving"],

    contact: {
      email:    "asmitbisesh0@gmail.com",
      github:   "https://github.com/Bisesh-G",
      linkedin: "https://linkedin.com/in/asmit-bisesh-14b60940b",
      phone:    "8617231014",
    },
  };

  /* ── Slash Commands ─────────────────────────────── */

  const SLASH_COMMANDS = {
    "/resume": () => {
      window.open("Assets/resume.pdf", "_blank");
      return "Opening resume... 📄";
    },
    "/github": () => {
      window.open(KB.contact.github, "_blank");
      return "Opening GitHub profile... ⌥";
    },
    "/linkedin": () => {
      window.open(KB.contact.linkedin, "_blank");
      return "Opening LinkedIn profile... ◈";
    },
    "/projects": () =>
      "Projects:\n\n" +
      KB.projects.map((p, i) => `${i + 1}. ${p.name}\n   Stack: ${p.stack}`).join("\n\n"),
    "/skills": () =>
      "Technical Skills:\n\n" +
      `Languages: ${KB.skills.languages.join(", ")}\n` +
      `Frontend: ${KB.skills.frontend.join(", ")}\n` +
      `Backend: ${KB.skills.backend.join(", ")}\n` +
      `Database: ${KB.skills.database.join(", ")}\n` +
      `ML: ${KB.skills.ml.join(", ")}\n` +
      `Tools: ${KB.skills.other.join(", ")}`,
    "/contact": () =>
      `Contact Asmit:\n\nEmail: ${KB.contact.email}\nGitHub: ${KB.contact.github}\nLinkedIn: ${KB.contact.linkedin}`,
    "/help": () =>
      "Available commands:\n\n/resume — View resume\n/github — GitHub profile\n/linkedin — LinkedIn profile\n/projects — List projects\n/skills — List all skills\n/contact — Contact details",
  };

  /* ── Response Engine ────────────────────────────── */

  function getResponse(raw) {
    const msg = raw.trim();

    // Slash commands
    if (msg.startsWith("/")) {
      const cmd = msg.toLowerCase().split(" ")[0];
      if (SLASH_COMMANDS[cmd]) return SLASH_COMMANDS[cmd]();
      return `Unknown command. Type /help to see available commands.`;
    }

    const m = msg.toLowerCase();

    // Greetings
    if (/^(hi|hello|hey|good morning|good evening|howdy|sup)\b/.test(m))
      return `Hi! I'm Asmit's portfolio assistant. Ask me about his education, skills, projects, or contact details. Or type /help for quick commands.`;

    // Who / name / about
    if (/(who is|who are|introduce|about asmit|tell me about him|tell me about yourself)/.test(m))
      return `Asmit Bisesh is a ${KB.status} Based in ${KB.location}, he is passionate about Full Stack Development and Machine Learning. ${KB.goal}`;

    // Location
    if (/(location|where|city|lives|based|from)/.test(m))
      return `Asmit is based in ${KB.location}.`;

    // CGPA / marks / grades
    if (/(cgpa|gpa|grade|marks|score|percentage)/.test(m)) {
      if (/(class xii|12th|hsc|class 12|higher secondary)/.test(m)) return "Asmit scored 88% in Class XII (ISC Board) from Julien Day School.";
      if (/(class x|10th|ssc|class 10|matriculation)/.test(m)) return "Asmit scored 77% in Class X (ICSE Board) from Julien Day School.";
      return `Asmit's current CGPA at Heritage Institute of Technology is ${KB.cgpa}.`;
    }

    // Education / college / school
    if (/(education|college|university|degree|btech|b\.tech|study|studying|school|academic)/.test(m)) {
      return (
        "Education:\n\n" +
        KB.education.map(e => `• ${e.place}\n  ${e.degree} | ${e.year} | ${e.note}`).join("\n\n")
      );
    }

    // Skills — specific
    if (/(frontend|html|css|react)/.test(m))
      return `Frontend skills: ${KB.skills.frontend.join(", ")}.`;
    if (/(backend|node|express|server)/.test(m))
      return `Backend skills: ${KB.skills.backend.join(", ")}.`;
    if (/(database|mongodb|db)/.test(m))
      return `Database experience: ${KB.skills.database.join(", ")}.`;
    if (/(machine learning|ml|tensorflow|scikit|deep learning|ai library)/.test(m))
      return `Machine Learning libraries: ${KB.skills.ml.join(", ")}.`;
    if (/(language|python|java|c\+\+|javascript|programming language)/.test(m))
      return `Programming languages: ${KB.skills.languages.join(", ")}.`;

    // Skills — general
    if (/(skill|tech stack|technologies|tools|framework|know|familiar|expertise)/.test(m))
      return SLASH_COMMANDS["/skills"]();

    // Hospital project
    if (/(hospital|hms|management system|patient|appointment|billing)/.test(m)) {
      const p = KB.projects[0];
      return `${p.name}\nStack: ${p.stack}\nFeatures:\n${p.features.map(f => `• ${f}`).join("\n")}\nGitHub: ${p.github}`;
    }

    // Plant project
    if (/(plant|disease|crop|cnn|leaf|agriculture|prediction)/.test(m)) {
      const p = KB.projects[1];
      return `${p.name}\nStack: ${p.stack}\nFeatures:\n${p.features.map(f => `• ${f}`).join("\n")}\nGitHub: ${p.github}`;
    }

    // Projects — general
    if (/(project|built|work|portfolio|app|application)/.test(m))
      return SLASH_COMMANDS["/projects"]();

    // Career / goals / future
    if (/(career|goal|future|ambition|aspir|dream|plan)/.test(m))
      return KB.goal;

    // Internship
    if (/(intern|internship|working|currently|job)/.test(m))
      return KB.internship;

    // Interests / hobbies
    if (/(interest|hobby|hobbies|passion|like|enjoy|love)/.test(m))
      return `Asmit's interests include: ${KB.interests.join(", ")}.`;

    // GitHub
    if (/github/.test(m)) return SLASH_COMMANDS["/github"]();

    // LinkedIn
    if (/linkedin/.test(m)) return SLASH_COMMANDS["/linkedin"]();

    // Email
    if (/email|mail/.test(m))
      return `Asmit's email: ${KB.contact.email}`;

    // Phone
    if (/(phone|call|number|mobile)/.test(m))
      return `Asmit's phone: ${KB.contact.phone}`;

    // Contact — general
    if (/(contact|reach|connect|get in touch|hire|available)/.test(m))
      return SLASH_COMMANDS["/contact"]();

    // Resume
    if (/resume|cv/.test(m)) return SLASH_COMMANDS["/resume"]();

    // Help / commands
    if (/(help|command|what can you|what do you know)/.test(m))
      return SLASH_COMMANDS["/help"]();

    // Thanks
    if (/(thank|thanks|thx|ty\b|great|awesome|nice|cool)/.test(m))
      return "You're welcome! Feel free to ask anything else about Asmit.";

    // Bye
    if (/(bye|goodbye|see you|cya|later)/.test(m))
      return "Goodbye! Feel free to come back anytime. 👋";

    // Fallback
    return `I can answer questions about Asmit's education, skills, projects, internship, goals, and contact details. Try asking something like "What are his skills?" or type /help to see all commands.`;
  }

  /* ── UI Helpers ─────────────────────────────────── */

  const CHIPS = [
    "Who is Asmit?",
    "Skills",
    "Projects",
    "Education",
    "Internship",
    "/contact",
    "/help",
  ];

  let chipsVisible = true;

  function $(id) { return document.getElementById(id); }

  function addMessage(role, text) {
    const msgs = $("chat-messages");
    const wrap = document.createElement("div");
    wrap.className = "chat-msg " + role;

    const av = document.createElement("div");
    av.className = "msg-av";
    av.textContent = role === "user" ? "You" : "AB";

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";

    // Render newlines as line breaks
    bubble.innerHTML = text.replace(/\n/g, "<br>");

    wrap.appendChild(av);
    wrap.appendChild(bubble);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    return wrap;
  }

  function addTyping() {
    const msgs = $("chat-messages");
    const wrap = document.createElement("div");
    wrap.id = "chat-typing";
    wrap.className = "chat-msg bot";
    wrap.innerHTML = `<div class="msg-av">AB</div><div class="chat-bubble"><div class="typing-bubble"><span></span><span></span><span></span></div></div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    const t = $("chat-typing");
    if (t) t.remove();
  }

  function hideChips() {
    if (!chipsVisible) return;
    const c = $("chat-chips");
    if (c) { c.style.display = "none"; chipsVisible = false; }
  }

  function showChips() {
    const c = $("chat-chips");
    if (c) { c.style.display = ""; chipsVisible = true; }
  }

  function reply(text) {
    addTyping();
    setTimeout(() => {
      removeTyping();
      addMessage("bot", getResponse(text));
    }, 500);
  }

  function send() {
    const input = $("chat-input");
    const text = input.value.trim();
    if (!text) return;
    hideChips();
    addMessage("user", text);
    input.value = "";
    reply(text);
  }

  function welcome() {
    addMessage("bot", "Hi 👋 I'm Asmit's portfolio assistant.\nAsk me about his education, skills, projects, or goals.\nTry /help to see all quick commands.");
  }

  function clearChat() {
    $("chat-messages").innerHTML = "";
    showChips();
    welcome();
  }

  /* ── Build Widget ────────────────────────────────── */

  function buildWidget() {

    // Inject the HTML structure
    const bubble = document.createElement("div");
    bubble.id = "chat-bubble";
    bubble.innerHTML = `
      <div id="chat-bubble-label">Ask me anything 👋</div>
      <button id="chat-toggle-btn" aria-label="Open portfolio assistant">
        <svg class="icon-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <svg class="icon-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span id="chat-notif-dot"></span>
      </button>
    `;

    const panel = document.createElement("div");
    panel.id = "chat-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Portfolio assistant chat");
    panel.innerHTML = `
      <div id="chat-panel-header">
        <div class="chat-avatar">AB</div>
        <div class="header-info">
          <div class="header-name">Asmit's Assistant</div>
          <div class="header-status"><span class="status-online"></span> Offline mode</div>
        </div>
        <button id="chat-clear-btn" title="Clear chat">Clear</button>
      </div>
      <div id="chat-messages"></div>
      <div id="chat-chips"></div>
      <div id="chat-input-row">
        <input id="chat-input" type="text" placeholder="Ask about Asmit or type /help..." autocomplete="off" />
        <button id="chat-send-btn" aria-label="Send">
          <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    `;

    document.body.appendChild(bubble);
    document.body.appendChild(panel);

    // Chips
    const chipsContainer = $("chat-chips");
    CHIPS.forEach(ch => {
      const btn = document.createElement("button");
      btn.className = "chat-chip";
      btn.textContent = ch;
      btn.onclick = () => {
        $("chat-input").value = ch;
        send();
      };
      chipsContainer.appendChild(btn);
    });

    // Events
    $("chat-send-btn").addEventListener("click", send);
    $("chat-input").addEventListener("keydown", e => { if (e.key === "Enter") send(); });
    $("chat-clear-btn").addEventListener("click", clearChat);

    // Toggle open/close
    $("chat-toggle-btn").addEventListener("click", () => {
      const p = $("chat-panel");
      const btn = $("chat-toggle-btn");
      const dot = $("chat-notif-dot");
      const label = $("chat-bubble-label");
      const opening = !p.classList.contains("open");

      p.classList.toggle("open", opening);
      btn.classList.toggle("open", opening);

      if (opening) {
        if (dot) dot.remove();
        label.classList.add("hidden");
        setTimeout(() => $("chat-input")?.focus(), 320);
      }
    });

    // Auto-hide label
    setTimeout(() => {
      const label = $("chat-bubble-label");
      if (label) label.classList.add("hidden");
    }, 4000);

    // Welcome
    setTimeout(welcome, 300);
  }

  /* ── Init ──────────────────────────────────────── */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildWidget);
  } else {
    buildWidget();
  }

})();