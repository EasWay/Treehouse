# Treehouse Restaurant - Premium Digital Experience

This project is a modernized, immersive digital storefront for **Treehouse Restaurant**. It focuses on a "botanical luxury" aesthetic, combining cinematic video elements, sophisticated typography, and smooth, motion-rich interactions to create a high-end brand presence.

## 🌟 Key Features Implemented

### 1. Immersive Hero Section
*   **Morphing Video Typography**: The main headline dynamically morphs between keywords ("Dine", "Relax", "Escape", "Savor") using a custom SVG-masked video effect.
*   **Cinematic Atmosphere**: Features a steaming culinary video background integrated directly into the brand typography, overlaid on a botanical green ambient glow.

### 2. Signature Dishes Showcase
*   **Horizontal Discovery**: A high-performance horizontal scrolling section for featured dishes.
*   **Luxury Pacing**: The scroll speed has been intentionally slowed down (pacing at `600vh`) to encourage a leisurely, premium browsing experience.
*   **Visual Focus**: Removed ambient lighting distractions to keep the focus strictly on high-quality dish photography and minimalist typography.

### 3. Integrated Brand Identity
*   **Official Typography**: Integrated the custom **Goodly** font family (Regular, Semibold, Bold) for consistent brand identity.
*   **Logo Integration**: The official `logo.png` is featured in the navigation bar and mobile menu, scaled for visibility and professional impact.

### 4. Interactive Navigation & UX
*   **Glassmorphic Navbar**: A sticky navigation bar with a backdrop blur and a "Green Ambience" effect that activates upon scrolling.
*   **Functional Menu Sidebar**: A dedicated, scrollable sidebar for the full menu, optimized for cross-device performance and integrated with the site's smooth scrolling engine.
*   **Action Dock**: A modern, Apple-style "Dock" at the bottom for quick access to Reservations, Location (Maps), and Concierge services.

## 🛠 Technical Architecture

*   **Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/) for robust, type-safe development.
*   **Build Tool**: [Vite](https://vitejs.dev/) for ultra-fast development and optimized production builds.
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for a modern, token-based design system and high-performance CSS.
*   **Motion & Animation**: [Framer Motion](https://www.framer.com/motion/) for complex transitions and the interactive horizontal scroll logic.
*   **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) for consistent, buttery-smooth scrolling across all browsers.
*   **Icons**: [Lucide React](https://lucide.dev/) for a clean, consistent set of brand-appropriate icons.

## 📁 Project Structure

*   `src/components/sections/`: Contains the core page components (Hero, SignatureDishes, Story, etc.).
*   `src/components/magicui/`: Custom-built advanced UI components like `MorphingVideoText` and `AnimatedShinyText`.
*   `public/fonts/`: Local storage for the official Goodly brand font family.
*   `src/index.css`: The central design system hub where Tailwind v4 themes and @font-face rules are defined.

## 🚀 Getting Started

1.  **Install Dependencies**: `npm install`
2.  **Run Development Server**: `npm run dev`
3.  **Build for Production**: `npm run build`

---

*This is a private project developed for Treehouse Restaurant. All assets and designs are intended for internal business use.*
