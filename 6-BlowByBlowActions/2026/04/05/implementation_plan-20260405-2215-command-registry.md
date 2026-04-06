# Command Registry Refactor (Solving the Abstruction)

This implementation plan covers the strategy for extracting modular actions from the central processing loop inside `70-executor.js`, initiating the dynamic `1-commands` directory structure for infinite horizontal scaling.

## Proposed Changes

### De-Obstructing the Executor

#### [NEW] [1-commands/guard.js](file:///c:/dev/GEM-VP-Circumvade/3-js/7-programming/1-commands/guard.js)
- Migrate the `GUARD` case payload directly into this standalone module.
- Provide a standard `export async function execute({ sphereState, vertices, GEM_MANIFEST })` interface.
- Import ` ECONOMY_CONFIG ` straight into this file.

#### [NEW] [1-commands/shockwave.js](file:///c:/dev/GEM-VP-Circumvade/3-js/7-programming/1-commands/shockwave.js)
- Extract both the `SHOCKWAVE` case block and the standalone `runShockwave` helper function into this file.
- Expose the exact same standardized `execute(context)` interface.

#### [MODIFY] [3-js/7-programming/70-executor.js](file:///c:/dev/GEM-VP-Circumvade/3-js/7-programming/70-executor.js)
- Modify `setTimeout` block into an asynchronous arrow function.
- Initiate a dynamic `await import('./1-commands/' + cmd.toLowerCase() + '.js')` attempt to instantly load and execute external commands.
- Eliminate `GUARD` and `SHOCKWAVE` from the static switch-case block. The native geometric actions (like `ROTATE_R`) will be preserved in the switch-case for now as fallback native behaviors.

## Open Questions
- **Native vs Minted**: Should I also extract the older static functions like `INVERT_BOARD` and `SWITCH_MODE` into the registry immediately, or focus strictly on `guard` and `shockwave` as prioritized in the prompt block? The baseline plan only handles your requested files to reduce unnecessary sweeping changes.

## Verification Plan
- Load visual live preview. Target a node. Run a valid `GUARD` sequence while accounting for CP levels. Validate the engine properly fetches `guard.js` and isolates execution.
- Repeat the test with a `SHOCKWAVE` card. Check for appropriate visual updates and node immune-system checks.
- Submit any raw unknown command string to ensure the executor politely traps the fail-state without breaking the master queue.
