# Universal Command Architecture & Guardian Implementation

This implementation plan bridges the Guardian feature with the new 3.0 Modular Economy Layer, ensuring that Minted Commands operate under a sustainable cost, maintenance, and registry schema. 

## User Review Required

> [!IMPORTANT]  
> - **Bankruptcy Behavior**: The instruction dictates that falling below `$0` strips guarding privileges. If you are at `M:0` but your upkeep is `$5`, you'll drop to `M:-5`, triggering bankruptcy to revert nodes, but do you want your balance reset precisely to `0` afterwards to prevent a negative rut, or allowed to persist in the red? The plan assumes correcting it to `0`.

## Proposed Changes

---

### Logic Execution & Rules (The Module Registry)

#### [MODIFY] [41-economy.js](file:///c:/dev/GEM-VP-Circumvade/3-js/4-domain-logic/41-economy.js)
- Create `export const ECONOMY_CONFIG = { GUARD: { mintFee: 50, maintenanceFee: 5, offset: 10 } };` representing the general scaleable payload for Guardian modifications.
- Create `export function processMaintenance(GEM_MANIFEST)` which runs over the `vertexBoard`. 
   - Tracks nodes possessing `status > 10`.
   - Iteratively docks the configured `maintenanceFee` from the owner (`player1CP` or `player2CP`).
   - If player resources deplete `≤ 0`, force an `UNGUARD` command logic: stripping the nodes of their offsets (`status -= 10`) back to baseline states, notifying them of bankruptcy via `gameLog`, and correcting negative CP thresholds to `0`.

#### [MODIFY] [52-interaction-handlers.js](file:///c:/dev/GEM-VP-Circumvade/3-js/5-interaction/52-interaction-handlers.js)
- Import the new `processMaintenance` routine from `41-economy.js`.
- Execute it concurrently inside the `CANVAS_CLICK` turn-progression sequence, right after `harvestInterest(GEM_MANIFEST)`.

---

### Action Consumption & Costs (The Executor)

#### [MODIFY] [70-executor.js](file:///c:/dev/GEM-VP-Circumvade/3-js/7-programming/70-executor.js)
- Implement `import { ECONOMY_CONFIG } from '../4-domain-logic/41-economy.js';`
- Refactor `case 'GUARD':` logic flow. Look up values from `ECONOMY_CONFIG.GUARD` over hard-coded arrays.
- Inject a financial Check: `if (playerBank < ECONOMY_CONFIG.GUARD.mintFee)`.
- If blocked, `window.gameLog("ECONOMY: Insufficient funds to Mint Guardian", "error");`
- If successful, charge the active player their `$50` and attach the dynamic `offset` (`10`) payload to the status.

---

### The Eye (Rendering the Geometry)

#### [MAINTAIN] [30-renderer.js](file:///c:/dev/GEM-VP-Circumvade/3-js/3-rendering/30-renderer.js)
- Currently, logic correctly assesses all statuses passing via `status % 10` alongside the geometric `#33ff33` isolation loop bounds for `status > 10`. This already adheres naturally to the generalized rule bounds.

## Verification Plan

### Manual Verification
- Start Live Preview. Verify that `player1CP` and `player2CP` initialize at `0`.
- Capture several nodes to yield an economy above `$50` (or jumpstart it via debug minting).
- Open the FORGE interface, attempt to MINT `GUARD` and click RUN over a node when economy is > `$50`, verifying the cost successfully depletes from HUD.
- Attempt to `GUARD` with < `$50`, anticipating failure alongside a red Minter terminal rejection. 
- During successive turns, visually track the HUD bleeding `-5 CP` maintenance fees.
- Test bankruptcy fallback when the pool approaches `$0` to ensure nodes aggressively unguard themselves automatically on grid.
