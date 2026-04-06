import { ECONOMY_CONFIG } from '../../4-domain-logic/41-economy.js';

export async function execute({ sphereState, GEM_MANIFEST }) {
    const lockedId = sphereState.lockedId;
    if (lockedId === null || lockedId === undefined) {
        window.gameLog("GUARD ERROR: No locked node selected.", "error");
        return;
    }
    const currentStatus = GEM_MANIFEST.vertexBoard[lockedId] || 0;
    if (currentStatus === 1 || currentStatus === 2) {
        const activePlayer = GEM_MANIFEST.metadata.activePlayer;
        const playerBank = activePlayer === 1 ? GEM_MANIFEST.metadata.player1CP : GEM_MANIFEST.metadata.player2CP;
        
        if (playerBank < ECONOMY_CONFIG.GUARD.mintFee) {
            window.gameLog("ECONOMY: Insufficient funds to Mint Guardian", "error");
        } else {
            if (activePlayer === 1) GEM_MANIFEST.metadata.player1CP -= ECONOMY_CONFIG.GUARD.mintFee;
            else GEM_MANIFEST.metadata.player2CP -= ECONOMY_CONFIG.GUARD.mintFee;
            
            GEM_MANIFEST.vertexBoard[lockedId] = currentStatus + ECONOMY_CONFIG.GUARD.offset;
            window.gameLog(`SYSTEM: Node ${lockedId} Guarded!`, "system");
        }
    } else if (currentStatus > 10) {
        window.gameLog("GUARD ERROR: Node is already guarded.", "error");
    } else {
        window.gameLog("GUARD ERROR: Cannot guard an unowned node.", "error");
    }
}
