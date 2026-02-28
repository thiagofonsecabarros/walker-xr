---
title: "Process update: Files bulk actions and chat transcript sync (v0.1.20)"
date: "2026-02-27"
tags: ["Process", "Files", "Chat", "Recovery"]
summary: "v0.1.20 expanded practical file operations with bulk copy/share and strengthened chat transcript persistence/backup coverage for safer export and restore workflows."
---
## Release focus
Version **0.1.20 (2026-02-27)** centered on operational usability: better file management in HUD, stronger chat transcript durability, and clearer recovery/backup behavior.

## Added
- Files HUD multi-select mode (long-press to enter selection) with bulk actions for `Copy` and `Share`.
- Android folder-picker copy flow to export selected files/folders into a user-selected destination.
- Android share-sheet integration for selected files, including recursive file collection from selected folders.
- Chat transcript file persistence under `memory/chats` using readable, line-oriented logs:
  - filename pattern: `chat_<title>.txt` with collision-safe fallback
  - line format: `User/Assistant/System - yyyy-MM-dd HH:mm: <message>`

## Changed
- Recovery controls in Settings HUD were renamed/reordered for faster operation:
  - `Choose Folder` -> `Folder`
  - `Create Backup` -> `New Backup`
  - added `Scan Files` between them
- Backup messaging now clarifies persistence expectations after app-data clear and warns when scanning without a configured folder.
- Files HUD shifted to Explorer-only mode (Quick mode removed), with direct `Up` and `Refresh` controls.
- Files HUD folder labels now show clean names (no `[DIR]` prefix) while keeping `Folder` as subtitle.
- Chat UX refinements:
  - message headers now show `Walker` instead of `Assistant`
  - status text now reads `Walker is ready`
  - history labels now show full date+time (`yyyy-MM-dd HH:mm`)
  - tapping history item opens directly (no separate Open button)
  - quick `Rename` action added beside `Delete`
  - auto-scroll now follows newest message updates
- Chat persistence flow now keeps `memory/chats` synchronized on create, append, title rename, and startup sync.
- Post-chat-takeover recorder resume now applies additional gating to avoid premature recorder restarts before VAD stabilizes.

## Fixed
- Files HUD copy/share integration stability issues were resolved by wiring required AndroidX dependencies and fixing selection/share API integration paths.
- Added delete confirmation to prevent accidental chat-history removal.
- Backup/restore scope now correctly includes chat transcript files (`chats/`) so restore points fully recover conversation exports.

## Feedback
This release made the app feel more operationally complete: bulk file actions reduced friction, and chat transcript sync plus restore coverage improved trust in long-term data retention.
