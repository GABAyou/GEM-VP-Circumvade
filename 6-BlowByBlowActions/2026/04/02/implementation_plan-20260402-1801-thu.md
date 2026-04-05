# Render Loop Extraction Plan

This plan aims to extract the rendering logic from `main.js` into its designated module `3-js/3-rendering/30-renderer.js`. This will significantly reduce the size of `main.js` and adhere to the project's modular architecture.

## User Review Required

> [!IMPORTANT]  
> Please review this extraction plan. If approved, I will perform this single folder extraction. I will stop and wait for your feedback before proceeding to the next extraction (if any).

## Proposed Changes

### 3-rendering Module

#### [MODIFY] [30-renderer.js](file:///c:/dev/GEM-VP-Circumvade/3-js/3-rendering/30-renderer.js)
- Move the `animate` function (Section 8: RENDER LOOP, lines ~179-264 in `main.js`) into this file.
- Wrap it in an exported function `startRenderLoop(canvas, ctx, state, triangles, vertices, GEM_MANIFEST)`.
- The new module will handle all Canvas rendering operations (Grid, Territory, Dots & Lock Indicator).

### Main Execution Context

#### [MODIFY] [main.js](file:///c:/dev/GEM-VP-Circumvade/3-js/main.js)
- Remove the `animate` function.
- Import `startRenderLoop` from `./3-rendering/30-renderer.js` (using relative paths as per `AGENT.md` rules).
- Call `startRenderLoop` at startup, passing in the required dependencies.
- Update existing absolute imports in `main.js` (like `/3-js/...`) to use relative paths (`./...`) to comply with the Portability policy.

## Open Questions

> [!WARNING]
> Is `3-js/3-rendering/` the specific folder extraction you'd like to tackle first, or would you prefer extracting the Game Console (`8-Console`) or HUD (`6-ui-components`) instead?

## Verification Plan

### Automated Tests
- N/A (Manual verification will be used)

### Manual Verification
- Start a local server (e.g., VS Code Live Server).
- Check that the game still renders the Geodesic sphere correctly.
- Verify interactions like zooming and rotation continue to work seamlessly.
