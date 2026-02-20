---
title: "Process update: Calendar HUD and layout behavior refinements (v0.1.12)"
date: "2026-02-18"
tags: ["Process", "Calendar", "HUD", "Voice"]
summary: "Introduced Calendar HUD with provider integration and voice event commands, plus important fixes for modal stacking and HUD layout behavior." 
---
## Release focus
Version **0.1.12 (2026-02-18)** adds calendar-native workflows and tightens HUD placement/interaction behavior for smoother daily usage.

## Added
- Calendar HUD, reachable from `Apps -> Calendar`, with month/day navigation, selected-day agenda view, and inline permission prompt.
- Android `CalendarContract` integration for reading/writing device calendars, including Google calendars already synced on device.
- Calendar event creation flow (`+`) supporting timed and all-day events plus simple recurrence rules (`daily`, `weekly`, `monthly`, `every <weekday>`).
- Voice calendar command support (e.g., `add calendar event`, `create event`, `schedule`, `show calendar`) with parser-driven recurrence/time extraction.

## Fixed
- Startup modal stacking corrected so **"Select features for this session"** always renders above all other HUD windows.

## Changed
- Note widget default sizing is now mode-dependent:
  - Portrait/landscape share one default size.
  - Desktop uses a separate default size.
  - Opening without saved layout seeds mode-specific defaults.
- HUD drag bounds now allow windows to move up to 50% off-screen in any direction (including minimized bubbles) while still preventing fully lost panes.
- Apps menu behavior now includes a dedicated Calendar entry that opens the Calendar HUD instead of navigating to a stub screen.
