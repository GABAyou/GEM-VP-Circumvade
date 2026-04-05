import { setupInteraction } from './50-input.js';
import { handleFlips, harvestInterest } from '../4-domain-logic/41-economy.js';

export function bindInteractions(canvas, state, GEM_MANIFEST, vertices, triangles) {
    setupInteraction(canvas, (dx, dy) => {
        state.rotY += dx;
        state.rotX += dy;
    }, (type) => {
        if (type === 'ZOOM_IN') {
            GEM_MANIFEST.metadata.zoomLevel = Math.min(GEM_MANIFEST.metadata.zoomLevel + 0.2, 3.0);
        } else if (type === 'ZOOM_OUT') {
            GEM_MANIFEST.metadata.zoomLevel = Math.max(GEM_MANIFEST.metadata.zoomLevel - 0.2, 0.5);
        } else if (type === 'ROTATE_TOGGLE') {
            GEM_MANIFEST.metadata.isAutoRotating = !GEM_MANIFEST.metadata.isAutoRotating;
        } else if (type === 'RESET') {
            state.rotX = 0; 
            state.rotY = 0;
            GEM_MANIFEST.metadata.zoomLevel = 1.0;
            state.lockedId = null; // Clear lock on reset
        } else if (type === 'CANVAS_CLICK' && state.hoveredId !== null) {
            const isV = (GEM_MANIFEST.metadata.activeMode === 'VERTEX');
            state.lockedId = state.hoveredId;
            window.gameLog(`TARGET LOCKED: Node ${state.lockedId}`, "system");

            // Use the Master Manifest directly
            if (GEM_MANIFEST.vertexBoard[state.hoveredId] === 0) {
                const currentPlayer = GEM_MANIFEST.metadata.activePlayer;
                GEM_MANIFEST.vertexBoard[state.hoveredId] = currentPlayer;
                
                window.gameLog(`${currentPlayer === 1 ? "WHITE" : "MAGENTA"} played at ${state.hoveredId}`);

                // Pass the MASTER board here
                handleFlips(state.hoveredId, currentPlayer, isV, GEM_MANIFEST.vertexBoard, vertices, triangles, GEM_MANIFEST);
                harvestInterest(GEM_MANIFEST);

                GEM_MANIFEST.metadata.activePlayer = (currentPlayer === 1) ? 2 : 1;
                window.updateHUD();
            }
        }
    });
}
