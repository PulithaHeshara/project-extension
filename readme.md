# 🧠 LeetCode Study assistance – Chrome Extension

**LeetCode Study assistance** is a Chrome extension that gives helpful hints and gentle nudges while you're solving LeetCode problems — without giving away the full solution. Perfect for learners who want guidance without spoilers.

---

## 🧩 How It Works

- The extension injects `content.js` into LeetCode problem pages.
- It detects the problem title and current code you're working on.
- When clicked, it sends this info to the AI (or mocked logic for now) and displays a small popup with a helpful 1–2 sentence hint.
- The popup disappears when you click outside of it.


---

## 📦 Folder Structure

study-assistance-extension/
├── icons/ # Extension icons
│ └── icon128.png
├── popup.html # (Optional) Extension popup UI
├── content.js # Script injected into LeetCode pages
├── styles.css # Styles for the popup hint
├── manifest.json # Extension configuration
└── README.md # You're here!

## 🛠 Installation (Development)

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right).
4. Click **"Load unpacked"** and select the `study-buddy-extension/` folder.
5. Go to a LeetCode problem (e.g., https://leetcode.com/problems/two-sum/) and test it out.


