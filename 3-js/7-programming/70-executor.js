/** refact[20260322]
 * EXECUTOR.JS
 * Purpose: The "CPU" of the GEM-VP Engine.
 * Translates Card Actions into 3D Reality. check
 */

/**
 * EXECUTOR.JS
 * Purpose: The "CPU" - Translates Card Actions into Reality.
 */

import { GEM_MANIFEST } from '/3-js/1-manifest/10-manifest.js';

export function runCompound(sphereState, triangles, vertices) {
    console.log("EXECUTOR: Sequence started.");

    GEM_MANIFEST.hand.forEach((card, index) => {
        if (!card) return;

        setTimeout(async () => {
            const cmd = card.action.toUpperCase();
            const cmdLower = cmd.toLowerCase();
            console.log(`EXECUTOR: Slot ${index} executing [${cmd}]`);

            let cmdModule;
            try {
                cmdModule = await import(`./1-commands/${cmdLower}.js`);
            } catch (err) {
                window.gameLog(`SYSTEM: Command [${cmd}] not found in Registry.`, "error");
                console.error(`EXECUTOR: Failed to load ${cmdLower}.js:`, err);
                return; // Stop execution of this card
            }

            try {
                const context = { sphereState, triangles, vertices, GEM_MANIFEST };
                await cmdModule.execute(context);
            } catch (err) {
                window.gameLog(`SYSTEM: Command [${cmd}] crashed during execution!`, "error");
                console.error(`EXECUTOR: Runtime Error in ${cmdLower}.js:`, err);
            }

            // Clear the card from the slot after playing
            GEM_MANIFEST.hand[index] = null;
            
            // Refresh visuals
            if (window.renderHand) window.renderHand();
            if (window.updateHUD) window.updateHUD();

        }, index * 600); 
    });
}