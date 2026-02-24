# Incremental Build Plan (Team Workflow)

## Goal
Build the product little by little while teammates can still contribute plain HTML/CSS/JS pages.

## Current Setup
- React app runs from `index.html` -> `src/main.jsx`.
- Teammate prototype pages live in `public/prototypes/`.
- Open prototype directly at `/prototypes/signin.html` when `npm run dev` is running.

## Weekly Workflow
1. **Prototype first (HTML):**
	- Teammate builds UI in `public/prototypes/`.
2. **Review together:**
	- Decide what should be migrated into React components.
3. **Migrate to React:**
	- Move one feature at a time into `src/components` and `src/pages`.
4. **Keep behavior parity:**
	- Ensure React version keeps same labels, fields, and flow as prototype.

## Suggested Small Milestones
- Milestone 1: Login screen layout parity.
- Milestone 2: Navbar parity.
- Milestone 3: Student ticket list and filters.
- Milestone 4: Admin status update modal.
- Milestone 5: Replace mock data with API.

## Team Rules (Simple)
- Do not edit `index.html` away from Vite root mount.
- Put all non-React experiments in `public/prototypes/`.
- Keep one feature per pull request.
- Add screenshots in PR for quick review.
