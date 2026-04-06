export async function execute({ GEM_MANIFEST }) {
    const activePlayer = GEM_MANIFEST.metadata.activePlayer;
    
    // Add 100 CP to the player who minted it
    if (activePlayer === 1) {
        GEM_MANIFEST.metadata.player1CP += 100;
        window.gameLog("DEBUG: Injected 100 CP to White Player.", "system");
    } else if (activePlayer === 2) {
        GEM_MANIFEST.metadata.player2CP += 100;
        window.gameLog("DEBUG: Injected 100 CP to Magenta Player.", "system");
    }
}
