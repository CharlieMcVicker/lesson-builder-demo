# Task 11: UI Layout and Sidebar

Transform the main application layout to match the reference image.

## Requirements

- Move the current `AppContent` layout into a new `Layout` component if necessary, or refactor `App.tsx`.
- Implement a dark sidebar on the left:
  - Background color: `#1a2b3c` (or similar deep teal/dark blue from image).
  - Top section: App name/logo ("Parent App", "Curriculum Builder").
  - User profile section: Avatar, Name ("Tsal McVicker"), Role ("Admin"), Email.
  - Navigation menu: Admin, Users, Lessons (active), Profile, Logout.
  - Bottom section: Version number ("Version 1.0.0").
- The main content area should have a light grey background (`#f8fafc`).
- Use Tailwind CSS for all styling.

## Files to Modify

- `src/App.tsx`: Update the main layout structure.
- `src/index.css`: Add any necessary global styles if they aren't already in Tailwind.

## Context

See the reference image for the exact look of the sidebar and layout spacing.
