# ⚙️ Installation

Follow these steps to set up the SCR Gaming project locally on your machine.

---

## 📦 Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v16 or above recommended)
* npm (comes with Node) or [yarn](https://yarnpkg.com/)

---

## 🚀 Steps to Run the Project Locally

1. **Clone the Repository**

```bash
git clone https://github.com/SCR01/scr-game.git
cd scr-game
```

2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the Development Server**

```bash
npm run dev
# or
yarn dev
```

> The app will be running at `http://localhost:5173/` by default.

---

## 🛠️ Project Structure (Brief)

```
scr-game/
├── public/             # Static assets like images
├── src/
│   ├── components/     # All React components
│   ├── pages/          # Page-level components
│   ├── App.jsx         # Main app wrapper
│   └── main.jsx        # Entry point
├── tailwind.config.js  # Tailwind CSS config
├── vite.config.js      # Vite config
├── package.json        # Project metadata & scripts
└── ...
```

---

## ⚠️ Environment Variables

> ❌ No `.env` or environment variables are required for this project at the moment.

---

## ✅ You're all set!

Visit [Usage](./usage.md) to explore how to interact with the app.