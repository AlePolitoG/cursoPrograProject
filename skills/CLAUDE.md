# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

Repository is pre-scaffold: no `package.json`, source tree, or build tooling exists yet. The project is planned as a **React + Vite** frontend (a landing page). Do not fabricate build, lint, or test commands until the tooling is actually in place — scaffold with Vite when the user asks to begin.

The authoritative source for these conventions is `claude.md` (lowercase) at the repo root, written in Spanish by the user. This file is the English-friendly summary for Claude Code; keep both consistent if one changes.

## Tech stack — strict, do not deviate without asking

- **React** with functional components and hooks only. No class components.
- **Vite** as the dev environment.
- **Semantic HTML5.**
- **Native CSS3**, optionally **CSS Modules** (`Component.module.css`) for scoping.
- **Forbidden unless the user explicitly requests otherwise:** Tailwind, Bootstrap, Material-UI or any CSS framework; Sass, Less, or any preprocessor.
- Third-party libraries (e.g. `react-router-dom`, `lucide-react`) require explicit permission before installation — ask first, do not `npm install` unilaterally.

## Code conventions

- Files and components use `PascalCase` (e.g. `HeroSection.jsx`).
- Split components when they grow; keep view and logic separated where reasonable.
- **Mobile-first CSS:** base styles target mobile; adapt with `@media (min-width: …)`.
- Use **Flexbox** and **CSS Grid** for layout.
- Define palette and typography as **CSS custom properties** on `:root` (typically in `src/styles/variables.css` or `global.css`).
- BEM (`block__element--modifier`) is acceptable for class names.
- **Code comments must be written in Spanish.**

## Expected folder layout under `/src`

```
src/
  assets/      # images, SVGs, local icons
  components/  # reusable UI (buttons, cards, headers)
  pages/       # full-page views
  styles/      # global CSS and variables
  App.jsx      # router or base layout
  main.jsx     # entry point
```

## Interaction style the user expects

- Briefly explain the approach before writing large blocks of code.
- When modifying a file, provide complete file contents — avoid `// ... resto del código` placeholders unless the file is very large.
