export async function execute({ sphereState, vertices, GEM_MANIFEST }) {
    const lockedId = sphereState.lockedId;
    if (lockedId === null || lockedId === undefined) {
        window.gameLog("SHOCKWAVE ERROR: No locked node selected.", "error");
        return;
    }
    
    const targetId = lockedId;
    const player = GEM_MANIFEST.metadata.activePlayer;
    const vBoard = GEM_MANIFEST.vertexBoard;
    
    const vertex = vertices[targetId];
    if (!vertex) return;

    // Use the engine-specific neighbor property
    const neighbors = vertex.neighbors || vertex.neighborIds || [];
    let flippedCount = 0;
    
    neighbors.forEach(nId => {
        // Force the flip in the Master Manifest board if NOT guarded
        if ((vBoard[nId] || 0) <= 10) {
            vBoard[nId] = player;
            flippedCount++;
        }
    });

    window.gameLog(`SHOCKWAVE: Flipped ${flippedCount} neighbor nodes!`, "system");
}
