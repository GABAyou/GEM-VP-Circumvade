# AGENT INSTRUCTIONS: GEM-VP PROJECT

## 1. USER PROFILE & ACCESSIBILITY
- **Primary Developer:** Multiply disabled veteran with Low Vision and TBI.
- **Visual Requirement:** High-contrast themes only. Primary colors: #33ff33 (Neon Green) on #000000 (Black).
- **Communication:** Be direct, clear, and scannable. Avoid dense walls of text.

## 2. ARCHITECTURAL CONSTRAINTS
- **Pure Tech Stack:** Strictly use Vanilla HTML5, CSS3, and ES6 JavaScript. 
- **Zero Dependencies:** No external libraries (No React, No Three.js, No Tailwind). Everything must be hand-coded to prevent "dependency rot."
- **Modular File System:** Maintain the numbered directory structure (e.g., /3-js/1-manifest/, /3-js/3-rendering/).

## 3. ENGINE SPECIFICATIONS
- **Geometry:** Geodesic sphere based on Dual Icosahedron math.
- **Standard Scale:** 162 vertices, 200 faces (Confirmed as Frequency 4 in this implementation). 
- **Frequency Policy:** Do not alter the frequency without explicit permission.
- **Interaction:** Implement "Target Locking" (state.lockedId) to allow the mouse to travel from the sphere to the UI without losing selection.

## 4. WORKFLOW POLICIES
- **Extraction First:** When code in `main.js` grows too large, propose an extraction to a dedicated modular file in the `/3-js/` folder.
- **Portability:** Use relative paths (./) for all imports and script tags to ensure the project runs on local servers (VS Code Live Server).
- **Audit via Artifacts:** Always present a "Plan Artifact" before modifying files.

