# MASTER PROMPT: High-End Business PWA Generator

**Role**: You are an expert Full-Stack Web Architect and Creative Designer specializing in premium, immersive digital experiences.

**Task**: Build a state-of-the-art, multi-page Progressive Web App (PWA) for a premium service-based business. The goal is to achieve a "wow" factor through fluid animations, immersive content interactions, and a robust administrative backend for real-time data management.

---

## 1. Technical Stack & Environment
- **Core**: Vite + React + TypeScript.
- **Styling**: Tailwind CSS with custom theme configurations for high-end aesthetics.
- **Animations**: Framer Motion (essential for transitions, 3D effects, and scroll-linked motion).
- **Visual Enhancements**: MagicUI (e.g., Marquee, CoolMode, BorderBeam) for premium micro-interactions.
- **Backend**: Node/Express server managing a local JSON-based persistent database.
- **PWA**: Full manifest and service worker configuration for "Add to Home Screen" and offline capabilities.

---

## 2. Core Architecture & Logic
- **Unified Data Service**: Implement a centralized service layer to handle all API communication. All application content must be dynamic and fetched from the database.
- **Generic Data Schema**:
  - `Identity`: Name, contact details, physical address, and social links.
  - `Offerings`: Categorized items (Services/Products) with names, pricing, detailed descriptions, and custom tags.
  - `Media`: An array of high-resolution visual asset URLs.
  - `Narrative`: Multi-paragraph content for brand overview or "About" sections.
  - `Lead Management`: A collection for tracking incoming requests (e.g., Bookings, Inquiries) with status metadata.
- **Multi-Page Routing**: Implement dynamic routing with the following core sections:
  - `Landing`: Feature previews and brand summary.
  - `Catalog`: An immersive, interactive view of offerings (e.g., 3D book or creative slider).
  - `Showcase`: High-performance visual portfolio.
  - `Profile`: Narrative story and business information.
  - `Admin`: Secure management dashboard for real-time updates.

---

## 3. UI/UX Requirements (The "Wow" Factor)
- **Immersive Content Viewer**:
  - Build a creative, interactive component for browsing the main catalog (e.g., a digital "Book", a 3D Carousel, or a Parallax Slider).
  - **Logic**: Ensure seamless responsiveness where complex 3D desktop layouts adapt into intuitive vertical or swipeable mobile views.
- **Visual Showcase**: Implement a high-performance gallery (e.g., Masonry or Grid) with smooth scale-up lightboxes and cinematic backdrop effects.
- **Guided Lead Capture**:
  - Build a multi-step modal or form for user inquiries/bookings.
  - Include satisfying micro-interactions (e.g., particle effects on submission) to provide tactile digital feedback.
- **Navigation Architecture**:
  - **Contextual Navbar**: A blurred, transparent header that maintains readability across sections.
  - **Adaptive Navigation**: High-density navigation bars (e.g., sticky bottom bars for mobile) with magnification effects for optimized touch interaction.

---

## 4. Administrative Command Center
- **Tabbed Management**: Create a sidebar-driven dashboard to manage all application domains (Catalog, Narrative, Media, Leads).
- **Live Lead Tracker**: Include an interactive manager to view, update, or archive incoming user requests in real-time.
- **Persistence**: Any administrative change must immediately sync with the backend and reflect globally across the application.

---

## 5. Optimization & Integrity Rules
- **Mobile-First Responsiveness**: Use root font scaling and adaptive padding/spacing to ensure a premium feel on all screen sizes.
- **Performance**: Implement lazy loading, asset optimization, and smooth entrance animations for heavy media content.
- **IP Protection & Integrity**: 
  - Implement a hidden "Integrity Anchor" that triggers a lockout if the DOM or licensing information is tampered with.
  - Disable standard copy/paste and context menu actions to protect proprietary content during preview phases.
- **Custom Aesthetics**: Use ultra-thin, low-contrast scrollbars and modern, curated typography to distance the design from generic web patterns.

---

## 6. Execution Workflow
1. **Foundation**: Configure the backend server and initialize the dynamic data schema.
2. **Design System**: Establish global design tokens, scrollbar styles, and core typography in the CSS foundation.
3. **Data Layer**: Build the service layer with comprehensive type definitions for all business data.
4. **UI Primitives**: Develop reusable components for navigation, modals, and creative interactions.
5. **Assembly**: Construct page routes and bind them to the dynamic data service.
6. **Polishing Phase**: Add a final layer of Framer Motion transitions and MagicUI visual effects to maximize user engagement.
