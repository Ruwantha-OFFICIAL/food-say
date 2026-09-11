<div align="center">
  <img src="./assets/icon.png" alt="Food Say App Logo" width="120" height="120">
  <h2>Food Say</h2>
  <p><strong>Discover a world of flavors right at your fingertips with Food Say, the ultimate cross-platform recipe discovery mobile application.</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#license">License</a>
  </p>
</div>

---

## Overview

**Food Say** (also known as *FoodSeyYou*) is a feature-rich recipe discovery app designed for home cooks, food enthusiasts, and culinary lovers. Powered by robust backend APIs and built with modern web and mobile technologies, Food Say brings an extensive collection of global recipes right to your mobile device with a modern, clean user interface.

## Features

- 🌍 **Vast Global Recipe Collection:** Explore thousands of diverse recipes from across the world.
- 🔍 **Smart Search:** Quickly find dishes by ingredients, categories, or names.
- 📖 **Detailed Recipe Insights:** Clear ingredient lists, step-by-step instructions, and cooking tips.
- ❤️ **Saved Recipes (Favorites):** Bookmark your favorite meals for offline access using local storage hooks.
- 🔔 **Capacitor Local Notifications:** Stay engaged with cooking reminders and updates.
- 🎨 **Modern & Clean UI:** Built using Ionic React and custom CSS variables for a seamless cross-platform look.

## Demo 📸

<div align="center">
  <img src="./demo1.jpg" alt="Food Say Home Screen" width="280" />
  <img src="./demo2.jpg" alt="Food Say Recipe View" width="280" />
  <img src="./demo3.jpg" alt="Food Say Search and Favorites" width="280" />
</div>

## Tech Stack

- **Frontend:** React, TypeScript, Ionic React, Vite
- **Mobile Runtime:** Capacitor
- **Styling:** CSS, Custom CSS Variables
- **State & Storage:** Custom React Hooks (`useApi`, `useStorag`), LocalStorage
- **Utilities:** Capacitor Local Notifications

## Project Structure

```bash
.
├── Dockerfile
├── README.md
├── assets/
│   ├── icon.png
│   └── splash.png
├── capacitor.config.ts
├── ionic.config.json
├── package.json
├── public/
│   ├── favicon.png
│   ├── fonts/
│   └── manifest.json
├── src/
│   ├── App.tsx
│   ├── components/
│   ├── hook/
│   ├── main.tsx
│   ├── pages/
│   ├── theme/
│   └── utility/
└── vite.config.ts
```
## Getting Started
**Prerequisites**
Make sure you have Node.js and npm installed on your machine.


Installation

 * Clone the repository:

   ```bash
   git clone https://github.com/Ruwantha-OFFICIAL/food-say.git
   cd food-say
   ```

 * Install dependencies:

   ```bash
    npm install
   ```
 * Run the development server:

   ```bash
   ionic serve
   ```

## License
Distributed under the Apache 2.0 License. See LICENSE for more information.
Copyright © 2026 lasith ruwantha amrwansha

