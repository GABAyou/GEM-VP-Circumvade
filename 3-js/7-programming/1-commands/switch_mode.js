export async function execute({ GEM_MANIFEST }) {
    const current = GEM_MANIFEST.metadata.activeMode;
    GEM_MANIFEST.metadata.activeMode = (current === 'FACE') ? 'VERTEX' : 'FACE';
    window.gameLog(`SYSTEM: Mode swapped to ${GEM_MANIFEST.metadata.activeMode}`, "system");
}
