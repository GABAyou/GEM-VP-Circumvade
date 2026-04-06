export async function execute({ vertices, GEM_MANIFEST }) {
    const player = GEM_MANIFEST.metadata.activePlayer;
    let flippedCount = 0;

    vertices.forEach(v => {
        if (v.isNorth || v.isSouth) {
            const currentStatus = GEM_MANIFEST.vertexBoard[v.id] || 0;
            // Respect Guardian shields!
            if (currentStatus <= 10) {
                GEM_MANIFEST.vertexBoard[v.id] = player;
                flippedCount++;
            }
        }
    });

    window.gameLog(`FLIP POLES: Captured ${flippedCount} pole nodes!`, "system");
}
