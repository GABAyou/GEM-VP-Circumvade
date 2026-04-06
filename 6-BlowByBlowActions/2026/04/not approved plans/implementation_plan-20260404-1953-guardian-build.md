# First Build: The Guardian Logic (3.0 Modular Era)

This implementation plan describes the technical approach for adding the new "Status 3" (Guardian) functionality to the GEM-VP Engine. In line with the 3.0 Architecture, it modifies the central execution, rule-checking, and rendering components while maintaining zero dependencies.

## User Review Required

No open questions. The Status Offset (+10) strategy has been approved to track Guarded status while preserving ownership color.

## Proposed Changes

---

### Logic Execution & Rules

#### [MODIFY] [70-executor.js](file:///c:/dev/GEM-VP-Circumvade/3-js/7-programming/70-executor.js)
- Add a new `case 'GUARD':` to the main switch block.
- Check `sphereState.lockedId`.
- Verify the locked node is already owned (status `1` or `2`). If it's unowned (`0`), null, or already guarded (`> 10`), use `window.gameLog` to display an error and halt.
- If it is valid and owned, add 10 to its status in `GEM_MANIFEST.vertexBoard` (e.g., `1` becomes `11`, `2` becomes `12`) and alert the system via `gameLog`.

#### [MODIFY] [41-economy.js](file:///c:/dev/GEM-VP-Circumvade/3-js/4-domain-logic/41-economy.js)
- Intercept the `flips` array returned from `Rules.checkVertexFlips` inside `handleFlips()`.
- Filter out any nodes where `vBoard[fId] > 10` before executing the actual flips to ensure Guardian vertices remain protected from color updates.

---

### Presentation (The Eye)

#### [MODIFY] [30-renderer.js](file:///c:/dev/GEM-VP-Circumvade/3-js/3-rendering/30-renderer.js)
- In the vertex rendering loop ("PASS 3: DOTS & LOCK INDICATOR"), use `status % 10` to determine the inner dot color logic (White for Player 1, Magenta for Player 2, etc).
- If `status > 10`, draw an outer ring around the node: Use `ctx.arc` with a slightly larger radius, `ctx.strokeStyle = "#33ff33"`, and a heavier `lineWidth`.
- This ensures high-contrast visibility of the shield while maintaining the player's inner node color.

## Verification Plan

### Manual Verification
- Start the game.
- Capture a node so it has status `1` or `2`.
- Lock onto the captured vertex using the interface.
- Open the Minter console and type `GUARD`.
- Visually confirm the green outer ring appears around the targeted node while the inner color remains the player's color.
- Attempt to execute a capture adjacent to the Guarded node and verify that `41-economy.js` successfully skips the protected node without capturing it or altering its status.
