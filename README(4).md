# TECHFEST NEXUS

### A scroll-driven 3D interactive web experience for Techfest

**TECHFEST NEXUS** is a responsive WebGL experience built around one idea: **Techfest is not just an event to browse — it is a technological world to enter.**

Instead of treating 3D as decoration, the website uses a persistent real-time **Nexus Core** that reacts to scrolling, pointer movement, dragging and user actions. As the visitor moves through the page, the camera, core, orbital systems and spatial composition continuously transform to create a connected journey from introduction to final access.

---

## Experience Overview

The interface is structured as a progression through five connected scenes:

**01 — Hero / Nexus Core**  
Introduces the central 3D object, live HUD telemetry and pointer-based spatial movement.

**02 — Vision**  
The camera shifts deeper into the scene while the interface explains the core idea behind the experience: exploration, interaction and transformation.

**03 — Technology Worlds**  
Three interactive modules represent Cognitive Systems, Robotic Frontiers and Deep Space. Hovering and focusing a module also influences its corresponding 3D satellite.

**04 — Live Signal**  
A telemetry console appears while the user can click and drag anywhere on the experience to alter the Nexus orientation directly.

**05 — Final Access**  
The journey ends with an **Initialize Nexus** interaction that triggers a spatial pulse and terminal-style access sequence.

---

## Key Interactions

- **Scroll-controlled 3D transitions** — camera position, Nexus position and scale change between sections.
- **Pointer parallax** — the central scene subtly follows cursor movement.
- **Drag interaction** — click and drag to manually rotate and disturb the Nexus orientation.
- **Pulse Core** — a hero interaction that temporarily energizes and expands the central object.
- **Interactive Technology Worlds** — each card is connected to a corresponding 3D satellite object.
- **Focus Object** — clicking a world module reorients the 3D scene toward that system.
- **Live telemetry UI** — animated waveform, latency, node count, uplink and phase indicators.
- **Initialize Nexus** — final 3D pulse plus staged terminal messages.
- **Responsive navigation and layout** — optimized for desktop, tablet and mobile screens.

---

## 3D Scene Architecture

The WebGL layer is rendered with **Three.js** and remains active behind the full website.

The scene includes:

- Metallic **Icosahedron Nexus Core**
- Secondary wireframe core layers
- Three independently rotating orbital rings
- Three floating technology satellites
- Dynamic point-lighting and emissive materials
- Atmospheric fog for depth
- Responsive particle field
  - approximately **1,700 particles on larger screens**
  - approximately **900 particles on smaller screens**
- Real-time camera and object interpolation

The 3D scene is intentionally persistent across sections so the website feels like one continuous environment instead of separate animated blocks.

---

## Scroll Animation System

**GSAP + ScrollTrigger** controls the transition between scene states.

Each major section defines a different combination of:

- camera depth
- Nexus X/Y/Z position
- object scale
- content reveal timing
- live depth telemetry

This creates the feeling that the user is travelling through a single 3D system while scrolling down a conventional webpage.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling & responsive UI | CSS3 |
| Interaction logic | Vanilla JavaScript |
| Real-time 3D rendering | Three.js / WebGL |
| Scroll & transition engine | GSAP |
| Scroll synchronization | GSAP ScrollTrigger |
| Typography | Space Grotesk + Inter |

There is **no framework, package installation or build process required**.

---

## Project Structure

```text
techfest-3d-nexus/
│
├── index.html      # Page structure, HUDs and content sections
├── styles.css      # Responsive UI, layout and visual effects
├── script.js       # Three.js scene, GSAP transitions and interactions
└── README.md       # Project documentation
```

---

## Run Locally

The website loads Three.js and GSAP as browser modules/CDN dependencies, so it should be opened through a local HTTP server rather than by directly double-clicking `index.html`.

### Option 1 — Python

From inside the project folder:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

### Option 2 — VS Code Live Server

Open the project in VS Code and launch `index.html` using the **Live Server** extension.

> An internet connection is required for the CDN-hosted Three.js, GSAP and Google Fonts resources.

---

## Recommended Demo Flow

A **40–50 second recording** is enough to demonstrate the complete experience clearly.

1. **Hero** — move the pointer around the screen to show 3D parallax.
2. Click **PULSE CORE** to trigger the first interactive effect.
3. **Scroll into Vision** and show the camera/core transition.
4. Continue to **Technology Worlds**.
5. Hover over each world card and click **FOCUS OBJECT** on one or more modules.
6. Scroll to **Live Signal** and click-drag across the page to rotate the Nexus.
7. Continue to **Final Access**.
8. Click **INITIALIZE NEXUS** and allow the terminal sequence to finish.
9. Briefly show a mobile viewport to demonstrate responsiveness.

The important part of the recording is not speed — it is making the **relationship between scrolling, UI interaction and the 3D scene visibly clear**.

---

## Responsive Design

The experience adapts its layout and rendering load for smaller devices.

Desktop includes the complete navigation, larger spatial composition and denser particle field. Tablet and mobile layouts reorganize the content into single-column sections, replace the desktop navigation with a compact menu, reduce the particle count and preserve the core interactions without requiring a separate mobile build.

The stylesheet also includes handling for users who prefer reduced motion.

---

## Design Direction

The visual system combines:

- dark aerospace surfaces
- cyan signal lighting
- transparent telemetry panels
- technical grid overlays
- spatial depth
- minimal typography
- controlled glow rather than excessive neon

The intention was to make the interface feel like a **live technological instrument**, not a conventional event landing page with 3D assets placed on top.

---

## Why TECHFEST NEXUS

The task asks for **3D scroll animations, interactive objects and dynamic transitions**. This project connects all three into the same interaction system:

**Scroll changes the world. Pointer movement influences it. Dragging manipulates it. UI actions trigger it.**

That makes the 3D layer part of the website's navigation and storytelling rather than a passive background animation.

---

## Submission

The project can be submitted using either:

- the **GitHub repository link**, or
- a **screen recording uploaded to Google Drive with Viewer access enabled**.

For the strongest evaluation, the repository can be submitted together with a short recording that demonstrates the interactions that are not immediately visible from source code alone.

---

**TECHFEST NEXUS**  
*Don't watch the future. Enter it.*
