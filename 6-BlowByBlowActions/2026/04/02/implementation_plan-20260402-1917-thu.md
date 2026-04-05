# HUD Updater Extraction Plan

This plan aims to extract the HUD Updater logic from `main.js` into its designated module `3-js/6-ui-components/62-hud.js`. This will reduce the size of `main.js` by another ~25 lines and keep UI-related DOM logic isolated.

## User Review Required

> [!IMPORTANT]  
> Please review this extraction plan. As always, I will perform this single folder extraction first, and then stop to wait for your feedback before touching any other systems.

## Proposed Changes

### 6-ui-components Module

#### [MODIFY] [62-hud.js](file:///c:/dev/GEM-VP-Circumvade/3-js/6-ui-components/62-hud.js)
- Move Region 3 (HUD UPDATER) implementation here and export it as `function updateHUD()`.
- Add an import for `GEM_MANIFEST` from `../1-manifest/10-manifest.js` directly within this UI component, fully detaching its logic from the Master script.
- Also attach `updateHUD` to `window.updateHUD` to prevent breaking existing components assuming it's still global (like `main.js` or `70-executor.js`).

### Main Execution Context

#### [MODIFY] [main.js](file:///c:/dev/GEM-VP-Circumvade/3-js/main.js)
- Remove the `window.updateHUD = function() { ... }` block entirely (clean up ~25 lines).
- Import `updateHUD` from `./6-ui-components/62-hud.js` so it binds it to memory.

## Open Questions

> [!WARNING]
> Is `6-ui-components/62-hud.js` the specific extraction you'd like to tackle next, or would you prefer extracting `window.gameLog` into `8-Console/80-console.js` instead?

## Verification Plan

### Manual Verification
- Check the console and UI output via Live Server.
- Ensure that making a move (which invokes the HUD updater) properly refreshes the Turn status and White/Magenta captures points.
