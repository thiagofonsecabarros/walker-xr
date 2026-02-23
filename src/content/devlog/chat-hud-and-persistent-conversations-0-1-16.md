---
title: "Process update: Chat HUD and persistent conversations (v0.1.16)"
date: "2026-02-22"
tags: ["Process", "LLM", "Chat", "HUD"]
summary: "Major-leap transition: v0.1.16 introduced in-app LLM interaction through a dedicated Chat HUD with persistent history, marking the beginning of more complex implementations and advanced features ahead."
---
## Release focus
Version **0.1.16 (2026-02-22)** introduced the first LLM-native interaction surface in the app. This was a major step-change from infrastructure-only iterations into an assistant-driven product flow.

## Added
- New **Chat HUD** with full standard HUD controls (move/minimize/resize/pin/close/reset).
- Chat-specific actions in the header:
  - `History` for opening recent sessions
  - `New` for starting a fresh conversation
- Inline chat input/send flow built into the HUD layout.
- Local Room persistence for conversations:
  - `chat_sessions`
  - `chat_messages`
  - delete support for session cleanup

## Changed
- Start menu top row shifted from `Voice / Notes / Tasks` to **`Chat / Voice / Notes`**, reflecting the new product priority.
- Chat became a first-class tracked HUD in window ordering and BringToFront behavior.
- Main state management was expanded to control chat draft/session/message lifecycle and live agent status.

## Fixed
- Chat reply visibility was stabilized by persisting assistant outputs as final messages after generation.
- Database schema update path was formalized with migration `3 -> 4` for chat data support.

## Feedback
This release was the first clear move into a true assistant UX. It set the foundation for deeper features by proving the core chat interaction model, local persistence, and HUD ergonomics before layering in more advanced capabilities.
