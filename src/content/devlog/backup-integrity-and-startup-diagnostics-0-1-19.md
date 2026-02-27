---
title: "Process update: backup integrity and startup diagnostics hardening (v0.1.19)"
date: "2026-02-27"
tags: ["Process", "Reliability", "Recovery", "Diagnostics"]
summary: "v0.1.19 reinforced reliability with binary-safe backups, deterministic transcript pairing after restore, richer startup diagnostics, and stronger model recovery behavior."
---
## Release focus
Version **0.1.19 (2026-02-27)** focused on hardening restore reliability and startup observability so failures are recoverable and easier to debug in real-world usage.

## Added
- Structured backup progress reporting (`0–100%`) in Settings HUD with cumulative per-step counters for:
  - database
  - recordings
  - transcripts
  - preferences
  - logs
  - manifest
- Expanded startup diagnostics with:
  - model copy-path checks
  - selected model file presence/size/modified-time validation
  - runtime context details (SDK/ABI)
  - explicit safe-mode reason details

## Changed
- Transcript persistence now uses a deterministic key from the audio filename stem (`voice_YYYYMMDD_HHMMSS`) to keep audio/transcript pairing stable across backup/restore.
- Restore reindex logic now prefers deterministic basename matching first, then falls back to exact timestamp and nearest-timestamp matching for legacy backups.

## Fixed
- Fixed backup corruption risk by writing backup streams in binary mode (preventing `.m4a` and DB corruption in newly generated backups).
- Fixed restored Audio Files duration values showing `0s` by deriving duration from media metadata during reindex.
- Fixed restored transcript visibility in `Audio Files` and `Recent segments` by resolving transcript text from disk when DB transcript is blank.
- Fixed MediaPipe startup diagnostics visibility by surfacing full nested exception cause chains (including `InvocationTargetException` targets).
- Fixed `Unable to open zip archive` model-init failures by validating `.task` signature, forcing bundled asset re-copy when invalid, and retrying initialization once.

## Feedback
This release improved trust in restore/recovery workflows. The deterministic pairing strategy and binary-safe backups materially reduce data-loss risk, while richer startup diagnostics make model failures far more actionable.
