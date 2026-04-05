export function setupMouseSnapping(canvas, state, vertices, triangles, GEM_MANIFEST) {
    window.addEventListener('mousemove', (e) => {
        // Universal coordinate mapping: mathematically guarantees accuracy even if CSS zoom or transforms are applied!
        const rect = canvas.getBoundingClientRect();
        // Calculate how much the CSS scales the internal canvas resolution
        const scaleX = canvas.width / rect.width;  
        const scaleY = canvas.height / rect.height; 

        // Translate the raw on-screen mouse position to the exact internal canvas pixel
        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;
        
        // CRITICAL SCALE SETTING: 0.55 multiplier aligns perfectly with 30-renderer.js
        const scale = (Math.min(canvas.width, canvas.height) * 0.55) * GEM_MANIFEST.metadata.zoomLevel;
        // CRITICAL: This MUST match the cY in your animate() function (0.45)
        const cX = canvas.width / 2;
        const cY = canvas.height * 0.45;
        
        let minD = 25;
        state.hoveredId = null;
        const targets = (GEM_MANIFEST.metadata.activeMode === 'VERTEX') ? vertices : triangles;

        targets.forEach(t => {
            const p = (GEM_MANIFEST.metadata.activeMode === 'VERTEX') ? t : t.center;
            const x1 = p.x * Math.cos(state.rotY) - p.z * Math.sin(state.rotY);
            const z1 = p.x * Math.sin(state.rotY) + p.z * Math.cos(state.rotY);
            const y2 = p.y * Math.cos(state.rotX) - z1 * Math.sin(state.rotX);
            const z2 = p.y * Math.sin(state.rotX) + z1 * Math.cos(state.rotX);
            
            if (z2 < 0) {
                const sx = cX + x1 * scale, sy = cY + y2 * scale;
                const d = Math.sqrt((mouseX-sx)**2 + (mouseY-sy)**2);
                if (d < minD) { minD = d; state.hoveredId = t.id; }
            }
        });
    });
}
