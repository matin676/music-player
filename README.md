# Music Player - Modern & Responsive

A premium, modern music player application built with React, Vite, Tailwind CSS, and Framer Motion. This project focuses on scalability, performance, and a delightful user experience.

## ✨ Features

- **Modern UI**: "Glassmorphism" design, smooth transitions, and a dark theme.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Dynamic Playlist**: Interactive playlist with slide-up animations and active track indicators.
- **Gapless Playback**: Smart audio loading and state management.
- **Keyboard & Touch**: Designed for accessibility and ease of use.

## 🛠️ Technology Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: React Context API + `useReducer`
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/matin676/music-player.git
   cd music-player
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` directory.

## 📦 Deployment

This project is configured for easy deployment to GitHub Pages. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📂 Project Structure

```text
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Shared UI atoms (Button, Slider)
├── data/            # Mock music data
├── features/        # Feature-specific logic
│   └── player/      # The core Player feature
│       ├── components/  # Player components (Controls, Playlist)
│       ├── context/     # State management (PlayerContext)
│       └── hooks/       # Custom hooks (useAudio)
├── layouts/         # Page layouts
├── App.jsx          # Main application component
└── index.css        # Global styles & Tailwind config
```
