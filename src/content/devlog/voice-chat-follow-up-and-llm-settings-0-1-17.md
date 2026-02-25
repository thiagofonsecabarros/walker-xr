---
title: "Process update: voice chat follow-up loop and LLM settings (v0.1.17)"
date: "2026-02-24"
tags: ["Process", "LLM", "Voice", "Stability"]
summary: "Strengthened the voice-to-LLM conversation loop with multi-phrase wake detection, follow-up windows, and chat tuning controls, while fixing multi-turn stalling and TTS feedback issues."
---
## Release focus
Version **0.1.17 (2026-02-24)** focused on making voice conversation with the local LLM practical in real usage: faster wake detection, safer audio behavior, and stronger multi-turn continuity.

## Added
- Configurable multi-phrase wake trigger matching for voice-to-LLM activation:
  - `hey walker`
  - `hi walker`
  - `hello walker`
  - `walker please`
  - `ok walker`
  - `okay walker`
- Chat Settings controls for local generation/speech tuning:
  - `TTS Voice`
  - `Temperature`
  - `K-value`
  - `Max tokens`
- Wake acknowledgment speech for wake-only utterances (short randomized responses).
- A 10-second post-wake conversational window to allow follow-up prompts without repeating the wake phrase.

## Changed
- Chat HUD controls were consolidated into a unified **Settings** panel.
- Model selection moved into `Model:` dropdown inside Settings.
- Wake detection became punctuation-tolerant (e.g., `Hi, Walker`).
- Wake routing shifted to low-latency partial-transcript checks for faster handoff.
- Follow-up submission now uses only incremental transcript deltas instead of cumulative transcript text.
- Voice-chat state now surfaces `Listening` during follow-up windows and returns to `Ready` on timeout.
- Chat-takeover behavior was introduced: continuous automation pauses during active LLM voice conversation and restores automatically after timeout.
- ASR stream boundaries/transcript anchors are reset per follow-up turn for cleaner multi-turn continuity.
- Non-LLM continuous transcription returned to full-chunk assembly (silence-finalized segments).

## Fixed
- Fixed transcript feedback loops by suppressing transcript intake during TTS playback and a short post-speech guard window.
- Fixed intermittent TTS dropouts via stronger Android TTS lifecycle handling and utterance-completion waiting.
- Fixed multi-turn voice chat stalls after one or two turns by re-arming follow-up windows per turn and isolating chat routing from regular continuous automation.
- Fixed first follow-up `Listening` misses by forcing fresh transcript anchors and ASR stream resets when entering follow-up windows.
