export function bindRunButton(state, vertices, GEM_MANIFEST, triangles) {
    const runBtn = document.getElementById('btnRun');
    if (runBtn) {
        runBtn.addEventListener('click', () => {
            window.gameLog("EXECUTOR: Sequence starting...", "system");
            import('./70-executor.js').then(m => {
                const sphereState = {
                    get rotY() { return state.rotY; }, set rotY(v) { state.rotY = v; },
                    get rotX() { return state.rotX; }, set rotX(v) { state.rotX = v; },
                    get lockedId() { return state.lockedId; }
                };
                m.runCompound(sphereState, triangles);
                window.updateHUD();
            }).catch(err => {
                window.gameLog("ERROR: Executor failed: " + err.message, "error");
            });
        });
    }
}
