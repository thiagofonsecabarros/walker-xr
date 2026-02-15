---
title: "Process update: Sherpa migration, Notes UX, and shutdown hardening (v0.1.7)"
date: "2026-02-07"
tags: ["Process", "HUD", "Recording"]
summary: "Moved to Sherpa-ONNX Whisper, expanded Notes widget editing, restored HUD state on restart, and improved shutdown recording safety."
---
## Release focus
Version **0.1.7 (2026-02-07)** expanded functional coverage across voice, notes, lifecycle recovery, and operational logging.

## Added
- Continuous recognition stack moved to Sherpa-ONNX Whisper.
- Inline note widget editing for title/body with editing-focused action visibility.
- Friendly BringToFront logs with readable HUD names.
- HUD open-state restoration on app restart.
- Shutdown-safe recording flush to finalize/save active captures on app close/task removal.

## Changed
- Note widget icon layout refinements for more consistent visibility and alignment.

## Fixed
- Prevented conflicting icon visibility while note edit mode is active.
- Added fallback segment persistence checks (file existence/size) to avoid close-race loss.

## Why this matters
This release improved practical daily usage reliability while reducing friction in note capture and voice persistence.
