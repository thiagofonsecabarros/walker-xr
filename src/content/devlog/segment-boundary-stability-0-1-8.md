---
title: "Process update: segment-boundary stability pass (v0.1.8)"
date: "2026-02-11"
tags: ["Process", "ASR", "Reliability"]
summary: "Stabilized transcript segmentation with stream resets, fixed rollover races, and reduced HUD focus log spam."
---
## Release focus
Version **0.1.8 (2026-02-11)** concentrated on transcript correctness and recording continuity under segment rollover.

## Added
- Whisper stream reset at segment boundaries via `onSegmentBoundary` so each segment starts with clean recognizer context.

## Fixed
- Removed cross-segment transcript bleed caused by concurrency/race interactions.
- Improved silent-segment behavior: non-transcribed segments are dropped without breaking continuous recording.
- Added guard logic to stop repetitive BringToFront no-op log spam (including Settings loop cases).

## Why this matters
These fixes improved trust in transcript-to-file pairing and made live debug logs significantly cleaner.

## Feedback from first real test cycle
This was the first version where practical test sessions were started end-to-end on device.  
Initial battery profiling on a **Samsung S20 Ultra** showed very high drain, with runtime dropping to around **5 hours**. The main suspect is the constant encode/decode workload around the Whisper path during continuous operation.

This is a key optimization area to address in the next iterations.
