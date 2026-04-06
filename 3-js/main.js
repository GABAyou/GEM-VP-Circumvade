/**
 * MAIN.JS - v2.0 Gold
 * Purpose: Master Controller, Pass-Through Rendering, and Turn-Based Economy.
 */

import { gameLog } from './8-Console/80-console.js';
import { GEM_MANIFEST } from './1-manifest/10-manifest.js';
import { generateGeodesicDual } from './2-core-geometry/20-engine.js';
import { setupMouseSnapping } from './5-interaction/51-mouse-snapping.js';
import { bindInteractions } from './5-interaction/52-interaction-handlers.js';
import { startRenderLoop } from './3-rendering/30-renderer.js';
import { updateHUD } from './6-ui-components/62-hud.js';
import { bindRunButton } from './7-programming/71-vm.js';

// 1. STATE ANCHOR
// 1. UPDATE STATE
let state = { 
    rotX: 0, 
    rotY: 0, 
    hoveredId: null,
    lockedId: null // NEW: This stays even when the mouse moves away
};

// 2. DATA INITIALIZATION
const { triangles, vertices } = generateGeodesicDual(GEM_MANIFEST.metadata.frequency);
GEM_MANIFEST.vertexBoard = new Array(vertices.length).fill(0);
GEM_MANIFEST.faceBoard = new Array(triangles.length).fill(0);

window.gameLog(`ENGINE: Loaded ${vertices.length} vertices and ${triangles.length} faces.`, "system");

// 3. HUD UPDATER - Extracted to 62-hud.js

// 4. UI ATTACHMENT
const container = document.getElementById('sphere-box'); 
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

if (container) {
    container.appendChild(canvas);
} else {
    window.gameLog("LAYOUT ERROR: 'sphere-box' not found", "error");
}

// 5. INTERACTION HANDSHAKE - Extracted to 52-interaction-handlers.js
bindInteractions(canvas, state, GEM_MANIFEST, vertices, triangles);

// Initialize Geometric Mouse Snapping math system
setupMouseSnapping(canvas, state, vertices, triangles, GEM_MANIFEST);

// 6. ECONOMY & GAME LOGIC - Extracted to 41-economy.js

// 7. MOUSE SNAPPING - Extracted to 51-mouse-snapping.js

// 8. RENDER LOOP
// 8. RENDER LOOP - Extracted to 30-renderer.js

// 9. STARTUP & RUN BUTTON
startRenderLoop(canvas, ctx, state, triangles, vertices, GEM_MANIFEST);
window.updateHUD();

bindRunButton(state, vertices, GEM_MANIFEST, triangles);