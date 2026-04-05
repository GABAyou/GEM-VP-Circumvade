export function bindRunButton(state, vertices, GEM_MANIFEST) {
    const runBtn = document.getElementById('btnRun');
    if (runBtn) {
        runBtn.addEventListener('click', () => {
            window.gameLog("EXECUTOR: Sequence starting...", "system");
            import('./70-executor.js').then(m => {
                const sphereState = {
                    get rotY() { return state.rotY; }, set rotY(v) { state.rotY = v; },
                    get rotX() { return state.rotX; }, set rotX(v) { state.rotX = v; }
                };
                m.runShockwave(state.lockedId, GEM_MANIFEST.metadata.activePlayer, vertices, GEM_MANIFEST.vertexBoard);
                window.updateHUD();
            }).catch(err => {
                window.gameLog("ERROR: Executor failed: " + err.message, "error");
            });
        });
    }
}
