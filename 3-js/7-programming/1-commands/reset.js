export async function execute({ sphereState, GEM_MANIFEST }) {
    sphereState.rotY = 0;
    sphereState.rotX = 0;
    GEM_MANIFEST.faceBoard.fill(0);
    GEM_MANIFEST.vertexBoard.fill(0);
}
