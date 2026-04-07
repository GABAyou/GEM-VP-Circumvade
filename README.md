# GEM-VP-Circumvade v3.0

**GameEngineMaker - Visual Programming (Modular Architecture)**

## Overview
GEM-VP-Circumvade is a high-contrast, vanilla JavaScript game engine built for a Frequency-4 geodesic sphere environment. This project focuses on a "Clean Room" modular architecture, separating rendering, economy, and logic into independent, scalable units.

## Core Features
- **Modular Command Registry**: All game actions (Guard, Shockwave, Invert) are decoupled into independent `.js` modules for horizontal scaling.
- **Dynamic Economy**: Features interest harvesting, maintenance fees, and a "Mercy Rule" bankruptcy system.
- **Accessibility First**: Designed for high-contrast visibility on rugged hardware (Panasonic Toughbook).
- **Zero-Dependency**: 100% Vanilla JS, HTML5 Canvas, and CSS3.

## Project Structure
- `/.context/`: Agent memory, logs, and recursive documentation.
- `/1-commands/`: The Command Registry for minted actions.
- `/3-js/`: Core engine modules (Renderer, Economy, VM, Executor).
- `/6-BlowByBlowActions/`: Historical implementation plans and walkthroughs.

## Developer Note
This engine is developed by a US Military Veteran utilizing a unique ten-finger fingerpicking style (for guitar) and a low-vision/TBI-safe development workflow. 

---
*Built with the Antigravity Agent workflow.*
