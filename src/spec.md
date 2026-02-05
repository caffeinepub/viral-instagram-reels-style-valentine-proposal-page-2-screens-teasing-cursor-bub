# Specification

## Summary
**Goal:** Create a 2-screen, Instagram-reels-style Valentine proposal experience with romantic visuals, teasing chat bubbles, and a celebratory “Yes” flow.

**Planned changes:**
- Update Page 1 to a soft pink gradient background with continuous floating heart animations and centered text: "❤️ NANDHANA❤️" and "Will you be my Valentine? 💖".
- Replace Page 1 CTAs with a single primary pink button labeled "Yes! 💕" (no "No" button anywhere), ensuring it stays clickable.
- Implement reel-like teasing chat bubbles on Page 1 that appear one at a time near the cursor/tap location on idle or off-button clicks, with random message selection, slight random rotation, and smooth enter/exit animation.
- Add a soft fade transition plus a heart-burst effect when clicking "Yes! 💕" to move from Page 1 to Page 2.
- Build Page 2 celebration layout and exact copy: "🎉 Yay! 🎉", "I knew you'd say yes! 💞", a rounded photo frame showing the provided romantic silhouette placeholder image, caption "You've made me the happiest! 💖", and footer "© 2025 · Built with ❤️ using caffeine.ai".
- Ensure overall UI is romantic/cute, animation-polished, responsive, and touch-friendly.
- Add/reference the static image asset at `frontend/public/assets/generated/romantic-silhouette-placeholder.dim_300x300.png` so it renders in Page 2.

**User-visible outcome:** Users see a romantic proposal Page 1 with floating hearts and playful teasing bubbles, can tap a single "Yes! 💕" button, and then transition via a heart-burst into a celebratory Page 2 with a rounded silhouette image and matching text.
