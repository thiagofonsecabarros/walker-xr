---
title: "Process update: adaptive VAD and transcript stability pass (v0.1.11)"
date: "2026-02-17"
tags: ["Process", "Voice", "Stability", "Moonshine"]
summary: "Introduced adaptive noisy-environment handling, improved voice-note triggering from continuous transcripts, and resolved multiple transcript race/duplication/degradation issues."
---
## Release focus
Version **0.1.11 (2026-02-17)** focused on making continuous speech processing more robust in noisy real-world usage while stabilizing long-session transcript behavior.

## Added
- Adaptive noisy-environment handling in Moonshine VAD:
  - Dynamic thresholding from noise-floor EMA.
  - Lightweight high-pass filtering.
  - Explicit logs for noisy-environment detection and quiet-state recovery.
- Expanded note-trigger command phrases in continuous transcripts (e.g., "make a note", "need to remember", "note that") to auto-create notes more reliably.
- Improved note-title inference for stronger subject phrase extraction.

## Changed
- Continuous recording transcript assembly moved to a stable per-segment replacement strategy (instead of append-heavy stream merges), while keeping streaming-style incremental handling for command-oriented flows.

## Fixed
- Hardened Moonshine capture-loop lifecycle to prevent overlapping decode loops during fast restart/toggle sequences.
- Removed segment-mixing and cross-segment carry-over artifacts using generation-based stale-final drops plus stronger stale/carry-over filtering in `VoiceSessionManager`.
- Serialized ASR transcript buffer mutation and applied monotonic merge logic to avoid race conditions in longer conversations.
- Reduced mid/late-session transcript degradation by switching to Moonshine streaming ingestion (`Transcriber.addAudio`) with VAD-gated chunk feeds and pre-roll buffering on Base model.
- Fixed repeated phrase duplication in the same segment by treating high-overlap partial/final revisions as replacements.
- Fixed early/late content loss in long segments by committing only completed Moonshine lines and keeping in-progress revisions as partials.
- Updated HUD battery indicator to read live battery percentage from Android `ACTION_BATTERY_CHANGED`.
- Improved top-right battery HUD visuals with percentage, charging indicator (`⚡` + charging battery icon), and color-coded states (charging teal, low red, medium yellow).
  
## Feedback
Battery consumption dropped drastically in this cycle: testing showed over **11 hours** of use with only about **40%** battery consumed. This is a major step forward.

Speech recognition quality is still not where it needs to be. There may still be a race condition affecting transcript stability.

Next validation step: test a **push-to-talk + SR** path and compare outcomes to determine whether this is primarily a speech-model limitation or an implementation issue.

