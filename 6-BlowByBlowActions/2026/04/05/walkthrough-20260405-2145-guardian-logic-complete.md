# Guardian Registry Built

The Guardian mechanism is completely migrated to the new generalized Registry framework and wired directly to the real-time node economy.

## Implemented Work

1. **[41-economy.js](file:///c:/dev/GEM-VP-Circumvade/3-js/4-domain-logic/41-economy.js)**:
   - Configured `ECONOMY_CONFIG.GUARD`: `{ mintFee: 50, maintenanceFee: 5, offset: 10 }`.
   - Engineered the `processMaintenance()` event loop to iterate heavily over Active Guard structures. Checks bank thresholds, charges `$5` CP automatically per node, and perfectly executes the **Bankruptcy "Mercy Rule"** by removing all guards locally and zeroing out negative balances explicitly.

2. **[70-executor.js](file:///c:/dev/GEM-VP-Circumvade/3-js/7-programming/70-executor.js)**:
   - Replaced hard-coded variables inside the `GUARD` instruction payload with real-time registry checks.
   - Refined execution block logic so a node is immediately denied guarding limits if a player drops below the `$50` floor limit (issuing an `"ECONOMY: Insufficient funds to Mint Guardian"` alert).
   - If acceptable, deducts `$50`.

3. **[52-interaction-handlers.js](file:///c:/dev/GEM-VP-Circumvade/3-js/5-interaction/52-interaction-handlers.js)**:
   - Process synchronization implemented: The `processMaintenance()` step fires strictly at the core `CANVAS_CLICK` turn end, following point generation.

## Test Procedure & Verification

> [!TIP]
> Time to play strategically.

1. **Boot**: Load the simulator. Confirm you start with `0` economy points on the HUD.
2. **Failure Check**: Immediately lock an opposing unowned node and attempt to run a minted `GUARD` card. The Minter console log will flatline with an "Insufficient Funds" warning.
3. **Wealth Extraction**: Start claiming standard nodes until you hit `$50` or higher.
4. **Success Check**: Attempt `GUARD` again. Verify your bank immediately dips by `50` points on the HUD and your visual shield loops materialize.
5. **Bleed out Assessment**: Progress the game by making additional regular moves. Monitor the HUD as your bank sustains automated `/turn` reductions relative to your protected geometry.
6. **Triggering Mercy**: Force your economy underneath the acceptable line to trigger Bankruptcy. Validate the "BANKRUPTCY" text hits the visual array, resets your balance upwards to zero, and automatically strips GUI shield rings from your nodes!
