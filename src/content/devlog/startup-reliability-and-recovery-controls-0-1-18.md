---
title: "Process update: startup reliability and recovery controls (v0.1.18)"
date: "2026-02-25"
tags: ["Process", "Reliability", "Recovery", "LLM"]
summary: "v0.1.18 focused on operational resilience: safe-mode startup, crash diagnostics, backup/restore flows, and clearer recovery controls while refining voice HUD ergonomics."
---
## Release focus
Version **0.1.18 (2026-02-25)** focused on making the app safer and more recoverable during LLM startup failures and runtime instability, while improving practical control flow in daily use.

## Added
- Startup reliability layer with `StartupHealthManager` and safe-mode fallback when LLM initialization times out or fails.
- Crash diagnostics persistence via `CrashDiagnosticsRepository` with:
  - `files/crash/last_crash.txt`
  - rolling crash history
  - startup ingestion into logs/UI status
- Durable restore-point infrastructure using SAF-backed `BackupRestoreRepository`.
- Manual recovery tools in Settings HUD:
  - choose backup folder
  - create backup
  - restore latest
  - run diagnostics
  - retry LLM load
- Scheduled daily backups with WorkManager constraints (charging + battery/storage) and retention pruning (last 7 restore points).
- Restore-point picker flow in Settings HUD: select recent backup and confirm restore target.
- Diagnostics details dialog with latest results, run timestamp, and inline `Run` action.

## Changed
- Startup model-state flow moved to non-blocking async diagnostics (`Model loading...` first, then ready/safe-mode result) to reduce freeze risk.
- Chat behavior under safe mode now gates generation/model switching and shows explicit recovery guidance.
- Recovery panel in Settings became vertically scrollable with improved row sizing so `Restore` and `Diagnostics` fit cleanly.
- Manual backup UX now surfaces in-progress stage/progress messaging.
- Diagnostics summary now shows last run time (`Diagnostics: <last time ran>`).
- Voice Recorder HUD top controls were refined:
  - `REC` now replaces `CONT`
  - legacy in-HUD debug/log button removed
  - `REC` / `VAD` / `Files` chips span full width with even sizing

## Fixed
- Fatal exception handling now persists crash envelopes and delegates to the previous uncaught handler (prevents swallowed fatal crashes).
- Post-restore indexing now re-syncs recordings/transcripts from disk back into DB metadata for discoverability.

## Feedback
This was a strong stability release. Instead of adding headline AI capabilities, it reinforced the platform layer needed for advanced features: safer startup, recoverability, and operator-friendly diagnostics/restore controls.
