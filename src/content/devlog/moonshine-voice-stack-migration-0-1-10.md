---
title: "Process update: Moonshine voice stack migration (v0.1.10)"
date: "2026-02-16"
tags: ["Process", "Voice", "Moonshine", "VAD"]
summary: "Migrated ASR from Whisper/Sherpa wiring to Moonshine Base, preserved VAD-gated continuous recording behavior, and stabilized model/runtime persistence paths."
---
## Release focus
Version **0.1.10 (2026-02-16)** completes the first full migration step to the Moonshine voice stack while keeping continuous recording + VAD-gated decode behavior intact.

## Added
- Moonshine Base ASR integration through `MoonshineSpeechEngine`.
- Model install flow via `MoonshineModelInstaller` into `filesDir/moonshine-models`.
- Explicit required asset contract for:
  - `encoder_model.ort`
  - `decoder_model_merged.ort`
  - `tokenizer.bin`

## Changed
- Hard replacement from Whisper classes to Moonshine classes in DI container and `MainViewModel` factory.
- Core voice dependency switched to `ai.moonshine:moonshine-voice:0.0.48` (direct Sherpa dependency removed).
- Existing RMS VAD gate was preserved: recording remains continuous and decode runs on accumulated per-segment audio snapshots.
- Speech timing tuned for continuity:
  - VAD hangover: **5s**
  - Silence-based transcript finalization: **15s**
- Moonshine init now uses file-based loading only, with retries across multiple root path formats and Base arch variants (`BASE_STREAMING`, `BASE`).
- Storage conventions aligned under `memory/` folders:
  - Audio: `memory/audio_recordings`
  - Transcripts: `memory/audio_transcriptions`
- Android build compatibility updated for Moonshine:
  - `compileSdk`/`targetSdk` moved to API 35
  - install support kept on API 33 with `tools:overrideLibrary="ai.moonshine.voice"`

## Fixed
- Guarded `onSegment` callback handling to prevent post-segment persistence crashes.
- Removed in-memory model-byte loading fallback to prevent init-time OOM.
- Added transcript file persistence on segment save with explicit success/failure logging.
- Removed legacy `jniLibs` duplicates to eliminate `libonnxruntime.so` merge conflicts.

## Feedback
This release is a strong architectural move for local-first speech, but practical testing should keep close watch on two fronts:
- **Accuracy and robustness** in noisy environments (still a key quality gate).
- **Compatibility risk** for devices below API 35 despite override-based install support.

Next step is focused field testing to validate whether Moonshine improves real-world stability and battery trade-offs versus the previous Whisper path.
