---
title: "Process update: VAD rollout and HUD telemetry (v0.1.9)"
date: "2026-02-12"
tags: ["Process", "Voice", "VAD"]
summary: "Introduced VAD-gated Whisper decoding, tunable VAD controls, and clearer HUD recording/VAD status visibility."
---
## Release focus
Version **0.1.9 (2026-02-12)** focused on reducing unnecessary decode work while keeping continuous recording responsive.

## Added
- RMS-based VAD gating in `WhisperSpeechEngine` to avoid expensive decode calls during silence.
- Tunable VAD parameters (`vadEnabled`, threshold, hangover, active/silent decode intervals).
- Logging for VAD activation transitions and silent decode skips.

## Changed
- Voice HUD label changed from **Wake** to **VAD** with explicit on/off toggle behavior.
- HUD status now exposes both recording state and VAD state (`active`/`inactive`).
- Recent transcript segments panel is scrollable and expanded to 25 items.

## Why this matters
This release improves runtime efficiency and gives clearer operator visibility into live voice pipeline behavior.

## Feedback from continued testing
Testing continued to evaluate the VAD impact on battery and transcription quality.  
Battery behavior improved, but only modestly: usage appears to have gained roughly **~1 extra hour** in practical sessions.

Current issues still observed:
- The VAD behavior is highly susceptible to noisy environments.
- The current transcription setup (Whisper **base** model) is not yet accurate enough for reliable day-to-day use.
