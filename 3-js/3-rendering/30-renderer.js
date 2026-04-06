export function startRenderLoop(canvas, ctx, state, triangles, vertices, GEM_MANIFEST) {
    function animate() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.fillStyle = GEM_MANIFEST.theme.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (GEM_MANIFEST.metadata.isAutoRotating) state.rotY += 0.005;

        // CRITICAL SCALE SETTING
        const scale = (Math.min(canvas.width, canvas.height) * 0.55) * GEM_MANIFEST.metadata.zoomLevel;
        const cX = canvas.width / 2, cY = canvas.height * 0.45;

        // PASS 1: GRID
        ctx.strokeStyle = GEM_MANIFEST.theme.gridLines;
        ctx.lineWidth = 1;
        triangles.forEach(t => {
            const z = t.center.y * Math.sin(state.rotX) + (t.center.x * Math.sin(state.rotY) + t.center.z * Math.cos(state.rotY)) * Math.cos(state.rotX);
            if (z < 0) {
                ctx.beginPath();
                t.points.forEach((p, i) => {
                    const x1 = p.x * Math.cos(state.rotY) - p.z * Math.sin(state.rotY);
                    const z1 = p.x * Math.sin(state.rotY) + p.z * Math.cos(state.rotY);
                    const y2 = p.y * Math.cos(state.rotX) - z1 * Math.sin(state.rotX);
                    if (i === 0) ctx.moveTo(cX + x1 * scale, cY + y2 * scale); 
                    else ctx.lineTo(cX + x1 * scale, cY + y2 * scale);
                });
                ctx.closePath();
                ctx.stroke();
            }
        });

        // PASS 2: TERRITORY
        triangles.forEach(t => {
            const z = t.center.y * Math.sin(state.rotX) + (t.center.x * Math.sin(state.rotY) + t.center.z * Math.cos(state.rotY)) * Math.cos(state.rotX);
            const owner = GEM_MANIFEST.faceBoard[t.id];
            if (z < 0 && owner !== 0) {
                ctx.fillStyle = (owner === 1) ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 0, 255, 0.8)";
                ctx.beginPath();
                t.points.forEach((p, i) => {
                    const x1 = p.x * Math.cos(state.rotY) - p.z * Math.sin(state.rotY);
                    const z1 = p.x * Math.sin(state.rotY) + p.z * Math.cos(state.rotY);
                    const y2 = p.y * Math.cos(state.rotX) - z1 * Math.sin(state.rotX);
                    const sB = scale * 1.01;
                    if (i === 0) ctx.moveTo(cX + x1 * sB, cY + y2 * sB);
                    else ctx.lineTo(cX + x1 * sB, cY + y2 * sB);
                });
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = (owner === 1) ? "#ffffff" : "#ff00ff";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });

        // PASS 3: DOTS & LOCK INDICATOR
        vertices.forEach(v => {
            const z = v.y * Math.sin(state.rotX) + (v.x * Math.sin(state.rotY) + v.z * Math.cos(state.rotY)) * Math.cos(state.rotX);
            if (z < 0) {
                const x1 = v.x * Math.cos(state.rotY) - v.z * Math.sin(state.rotY);
                const z1 = v.x * Math.sin(state.rotY) + v.z * Math.cos(state.rotY);
                const y2 = v.y * Math.cos(state.rotX) - z1 * Math.sin(state.rotX);
                const sx = cX + x1 * scale, sy = cY + y2 * scale;
                const status = GEM_MANIFEST.vertexBoard[v.id] || 0;
                const innerStatus = status % 10;
                
                ctx.beginPath();
                ctx.arc(sx, sy, innerStatus === 0 ? 3 : 8, 0, Math.PI * 2);
                if (innerStatus === 0) {
                    ctx.fillStyle = (v.id === state.hoveredId) ? GEM_MANIFEST.theme.ghost : (v.isNorth ? "#ff3333" : (v.isSouth ? "#3333ff" : "#33ff33"));
                } else {
                    ctx.fillStyle = (innerStatus === 1) ? "#ffffff" : "#ff00ff";
                }
                ctx.fill();

                if (status > 10) {
                    ctx.beginPath();
                    ctx.arc(sx, sy, 12, 0, Math.PI * 2);
                    ctx.strokeStyle = "#33ff33";
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }

                // DRAW GOLD LOCK (sx/sy now safely defined here)
                if (v.id === state.lockedId) {
                    ctx.beginPath();
                    ctx.arc(sx, sy, 16, 0, Math.PI * 2); 
                    ctx.strokeStyle = "#ffcc00"; 
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }
    
    // Auto-start
    animate();
}
