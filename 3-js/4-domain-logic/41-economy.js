export async function handleFlips(id, player, isV, vBoard, vertices, triangles, GEM_MANIFEST) {
    try {
        const Rules = await import('./40-rules.js');
        // If 'vertices' isn't available in the scope, this line crashes
        if (isV) {
            let flips = Rules.checkVertexFlips(id, player, vertices, vBoard);
            flips = flips.filter(fId => (vBoard[fId] || 0) <= 10);
            flips.forEach(fId => vBoard[fId] = player);
            if (flips.length > 0) window.gameLog(`CAPTURE: Flipped ${flips.length} nodes!`);
        }

        Rules.updateTerritory(triangles, GEM_MANIFEST.vertexBoard, GEM_MANIFEST.faceBoard);
        window.updateHUD(); 
    } catch (err) {
        window.gameLog("RULES ERROR: " + err.message, "error");
    }
}

export function harvestInterest(GEM_MANIFEST) {
    const fBoard = GEM_MANIFEST.faceBoard;
    const p1Territory = fBoard.filter(x => x === 1).length;
    const p2Territory = fBoard.filter(x => x === 2).length;

    GEM_MANIFEST.metadata.player1CP += (p1Territory + 2);
    GEM_MANIFEST.metadata.player2CP += (p2Territory + 2);
    
    window.gameLog(`ECONOMY: W:+${p1Territory+2} M:+${p2Territory+2} CP earned.`, "system");
}
