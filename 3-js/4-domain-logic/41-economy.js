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

export const ECONOMY_CONFIG = {
    GUARD: {
        mintFee: 50,
        maintenanceFee: 5,
        offset: 10
    }
};

export function processMaintenance(GEM_MANIFEST) {
    const vBoard = GEM_MANIFEST.vertexBoard;
    let p1Bankrupt = false;
    let p2Bankrupt = false;
    let p1Guards = 0;
    let p2Guards = 0;

    for (let i = 0; i < vBoard.length; i++) {
        const val = vBoard[i] || 0;
        if (val > 10) {
            const owner = val % 10;
            if (owner === 1) p1Guards++;
            else if (owner === 2) p2Guards++;
        }
    }

    if (p1Guards > 0 || p2Guards > 0) {
        const p1Cost = p1Guards * ECONOMY_CONFIG.GUARD.maintenanceFee;
        const p2Cost = p2Guards * ECONOMY_CONFIG.GUARD.maintenanceFee;
        GEM_MANIFEST.metadata.player1CP -= p1Cost;
        GEM_MANIFEST.metadata.player2CP -= p2Cost;
        window.gameLog(`MAINTENANCE: W:-${p1Cost} M:-${p2Cost} CP drained.`, "warning");
    }


    if (GEM_MANIFEST.metadata.player1CP < 0) {
        GEM_MANIFEST.metadata.player1CP = 0;
        p1Bankrupt = true;
    }
    if (GEM_MANIFEST.metadata.player2CP < 0) {
        GEM_MANIFEST.metadata.player2CP = 0;
        p2Bankrupt = true;
    }

    if (p1Bankrupt || p2Bankrupt) {
        window.gameLog("BANKRUPTCY: Shields deactivated. Account reset to 0", "error");
        for (let i = 0; i < vBoard.length; i++) {
            const val = vBoard[i] || 0;
            if (val > 10) {
                const owner = val % 10;
                if ((owner === 1 && p1Bankrupt) || (owner === 2 && p2Bankrupt)) {
                    vBoard[i] = owner;
                }
            }
        }
    }
}
