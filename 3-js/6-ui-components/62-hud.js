import { GEM_MANIFEST } from '../1-manifest/10-manifest.js';

export function updateHUD() {
    const turnEl = document.getElementById('turn');
    const score1El = document.getElementById('score1');
    const score2El = document.getElementById('score2');
    
    if (turnEl) {
        const mode = GEM_MANIFEST.metadata.activeMode;
        const p1CP = GEM_MANIFEST.metadata.player1CP;
        const p2CP = GEM_MANIFEST.metadata.player2CP;
        const player = GEM_MANIFEST.metadata.activePlayer === 1 ? 'WHITE' : 'MAGENTA';
        const playerColor = (player === 'WHITE') ? '#ffffff' : '#ff00ff';

        turnEl.innerHTML = `
            <span style="color:${playerColor}">${player}</span> (${mode}) | 
            CP: <span style="color:#ffffff">W:${p1CP}</span> 
            <span style="color:#ff00ff">M:${p2CP}</span>
        `;
    }
    
    const board = (GEM_MANIFEST.metadata.activeMode === 'FACE') 
        ? GEM_MANIFEST.faceBoard : GEM_MANIFEST.vertexBoard;

    if (score1El) score1El.innerText = board.filter(x => x === 1).length;
    if (score2El) score2El.innerText = board.filter(x => x === 2).length;
}

// Preserve global availability for broader system integration
window.updateHUD = updateHUD;
