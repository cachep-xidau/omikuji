# A2V Prototype - Health & Fitness App

Interactive prototype demo built with Vite + React + Tailwind CSS, based on Figma designs from A2V-Renewal-2025.

## 🎯 Purpose

This prototype demonstrates the UI/UX design for the A2V health and fitness tracking application. It's designed for client presentations, user testing, and stakeholder reviews.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Features

### Implemented Screens

#### **Home Screen** (`/`)
- Status bar with time and system icons
- Weather widget
- User profile (VIP badge)
- Mission cards with progress tracking
- Health data cards (Pace, Heart Rate, Sleep)
- Suggested activities section
- Bottom navigation

### Components

- **StatusBar** - iOS-style status bar with dynamic time
- **HealthCard** - Health metrics display with icons
- **MissionCard** - Interactive mission cards with animations
- **NavBar** - Bottom navigation with active states

## 🎨 Design System

### Colors
```js
Primary:
- White: #FFFFFF
- Dark Gray: #1F2937
- Black: #000000

Feedback:
- Success: #10B981
- Red: #EF4444

Shading:
- Black 1-6: Various shades
- White 4-8: Various tints
```

### Typography
- Font: SF Pro Display (system fallback)
- Heading styles: H3-SB, H5-M, H6-M
- Body styles: Body 1 (R, M, SB), Body 2 (R, M)

### Spacing
- Grid: 4 columns
- Gutter: 16px
- Container: max-width 430px (mobile)
- Border radius: 20px for cards

## 🛠️ Tech Stack

- **Vite** - Build tool and dev server
- **React 18** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icon library

## 📂 Project Structure

```
a2v-prototype/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── StatusBar.jsx
│   │   ├── HealthCard.jsx
│   │   ├── MissionCard.jsx
│   │   └── NavBar.jsx
│   ├── screens/          # Screen components
│   │   └── HomeScreen.jsx
│   ├── data/             # Mock data
│   │   └── mockData.js
│   ├── assets/           # Images, icons
│   ├── App.jsx           # Main app with routing
│   └── index.css         # Tailwind directives
├── tailwind.config.js    # Tailwind configuration
└── package.json
```

## 🎭 Interactions & Animations

- Hover effects on mission cards
- Tap feedback with scale animations
- Smooth page transitions
- Active state navigation

## 🚧 Planned Features

- [ ] Mission detail screen
- [ ] Achievements/Awards screen
- [ ] User profile screen
- [ ] Add new mission flow
- [ ] Chart/graph visualizations
- [ ] More health metrics
- [ ] Settings screen

## 📊 Mock Data

All data is currently mocked in `src/data/mockData.js`. Replace with API calls when integrating with backend.

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Upload dist/ folder to gh-pages branch
```

## 📝 Development Notes

- Mobile-first design (max-width: 430px)
- Optimized for iPhone viewport
- Uses system fonts with fallbacks
- Responsive grid layouts
- Component-based architecture

## 🎨 Design Source

Original Figma design: [A2V-Renewal-2025](https://www.figma.com/design/0hF7pNUMBAGogTtb4COgFw/A2V-Renewal-2025)

## 📄 License

Private prototype - Not for public distribution

---

**Built with** ❤️ **using Claude Code**
