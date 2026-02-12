## Stripe Gradient Canvas Background - Research Findings
**Date:** 2026-02-12
**Task:** Research Stripe gradient canvas implementations and examples

### SUMMARY

The Stripe gradient effect is a **WebGL-based animated mesh gradient** that uses:
- **Technology:** WebGL 1.0 with GLSL shaders
- **Noise Algorithm:** Simplex Noise with Fractal Brownian Motion (FBM)
- **Animation:** Time-based shader uniforms
- **Performance:** GPU-accelerated, 60 FPS on mobile and desktop

---

### BEST IMPLEMENTATIONS FOUND

#### 1. **thelevicole/stripe-gradient** (Vanilla JS - Recommended for Custom Implementation)
- **GitHub:** https://github.com/thelevicole/stripe-gradient
- **Commit SHA:** e48abdbfa171af09f5868c6a7d0866c5c51cc2a1
- **Technology:** Pure WebGL with custom MiniGL wrapper
- **Key Features:**
  - Simplified, reverse-engineered version of Stripe's implementation
  - Custom color support via array
  - Wireframe mode available
  - Static gradient option (non-animating)
  - jQuery plugin support

**Usage:**
```javascript
new Gradient({
    canvas: '#my-canvas-id',
    colors: ['#a960ee', '#ff333d', '#90e0ff', '#ffcb57']
});
```

**File Structure:**
- `src/Gradient.js` - Main gradient class
- `src/MiniGL.js` - Minimal WebGL wrapper
- `src/ShadersJs/` - Vertex, Fragment, Noise, Blend shaders
- `src/Uniform.js`, `src/Material.js`, `src/Mesh.js`, `src/PlaneGeometry.js`

**Permalink to main implementation:**
https://github.com/thelevicole/stripe-gradient/blob/e48abdbfa171af09f5868c6a7d0866c5c51cc2a1/src/Gradient.js

---

#### 2. **exzenter/gradient-stripe** (Advanced WebGL with Controls)
- **GitHub:** https://github.com/exzenter/gradient-stripe
- **Live Demo:** https://exzenter.github.io/gradient-stripe/stripe-gradient.html
- **Technology:** WebGL 1.0 / GLSL with interactive control panel
- **Key Features:**
  - Fractal Brownian Motion (FBM) with multiple octaves
  - Mesh modulation using sinusoidal warping
  - Professional blend modes (Multiply, Screen, Overlay) in fragment shader
  - CSS trick for diagonal stripe effect: `skewY(-12deg)` + `overflow: hidden`
  - Real-time parameter adjustment
  - JSON export/import of settings

**Technical Details:**
- **Noise:** 3-layer Simplex noise optimized for performance
- **Skew:** -12 degrees (Stripe's signature angle)
- **Blending:** 8 shader-internal modes + 16 CSS container modes
- **Browser Support:** Chrome 56+, Firefox 51+, Safari 11+, Edge 12+

**Key Insight - The "Stripe" Effect:**
> The actual WebGL canvas is a full rectangle, but its container is transformed using `skewY(-12deg)` and `overflow: hidden`. This creates the signature sharp diagonal edges without requiring complex geometry.

---

#### 3. **JohnnyLeek1/React-Mesh-Gradient** (React/Three.js - Best for React/Next.js)
- **GitHub:** https://github.com/JohnnyLeek1/React-Mesh-Gradient
- **NPM:** `@johnn-e/react-mesh-gradient`
- **Technology:** React + Three.js + React Three Fiber
- **Status:** Archived but functional
- **Key Features:**
  - React component wrapper
  - Three.js powered
  - Interactive event handlers
  - Wireframe mode
  - Customizable speed, colors, background

**Usage:**
```tsx
import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';

function App() {
  return (
    <MeshGradientRenderer
      colors={["#C3E4FF", "#6EC3F4", "#EAE2FF", "#B9BEFF", "#B3B8F9"]}
      speed={0.01}
      wireframe={false}
    />
  );
}
```

**Props Available:**
- `colors` (required) - Array of hex colors
- `wireframe` - Boolean for wireframe mode
- `speed` - Number between 0 and 1
- `backgroundColor` - Hex string
- `backgroundOpacity` - Number between 0 and 1
- Event handlers: `onGradientClick`, `onGradientPointerMove`, etc.

**Limitation:** Currently requires exactly 5 colors (roadmap item to fix)

---

### TECHNICAL APPROACH BREAKDOWN

#### Core Technologies Used:

1. **WebGL Shaders (GLSL)**
   - Vertex shader: Handles mesh deformation
   - Fragment shader: Handles color blending and noise

2. **Noise Functions**
   - Simplex Noise (most common)
   - Fractal Brownian Motion (FBM) for organic movement
   - Multiple octaves with varying frequency (lacunarity) and amplitude (persistence)

3. **Animation Technique**
   - Time-based uniform passed to shaders
   - `requestAnimationFrame` for smooth 60 FPS
   - Delta time for consistent speed across devices

4. **Color Blending**
   - Professional blend modes in fragment shader
   - Not simple linear interpolation
   - Creates vibrant highlights and deep shadows

5. **Mesh Modulation**
   - Sinusoidal warping of UV coordinates
   - `sin()` and `cos()` functions with time-based offsets
   - Simulates liquid surfaces or stretched fabric

---

### IMPLEMENTATION RECOMMENDATIONS FOR REACT/NEXT.JS

#### Option 1: Use React-Mesh-Gradient Package (Easiest)
**Pros:**
- Ready-to-use React component
- Three.js handles WebGL complexity
- Event handlers built-in
- TypeScript support

**Cons:**
- Archived repository (no active maintenance)
- Requires exactly 5 colors currently
- Larger bundle size (Three.js dependency)

**Installation:**
```bash
npm install @johnn-e/react-mesh-gradient
```

---

#### Option 2: Adapt thelevicole/stripe-gradient (Most Control)
**Pros:**
- Lightweight (no Three.js dependency)
- Full control over implementation
- Easy to customize colors
- Well-documented code

**Cons:**
- Need to wrap in React component
- Manual canvas lifecycle management

**Implementation Steps:**
1. Copy `src/` folder from thelevicole/stripe-gradient
2. Create React component wrapper with `useEffect` for initialization
3. Use `useRef` for canvas element
4. Clean up on unmount

**Example React Wrapper:**
```tsx
import { useEffect, useRef } from 'react';
import Gradient from './gradient/Gradient'; // Adapted from thelevicole

export function StripeGradient({ colors }: { colors: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<Gradient | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      gradientRef.current = new Gradient({
        canvas: canvasRef.current,
        colors: colors
      });
    }

    return () => {
      gradientRef.current?.disconnect();
    };
  }, [colors]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}
```

---

#### Option 3: NPM Package - stripe-gradient (Simplest Vanilla)
**NPM:** `stripe-gradient` (by khasty720)
**Pros:**
- Published to NPM
- Simple API
- CSS variable support for colors

**Usage:**
```javascript
const gradient = new Gradient();
gradient.initGradient('#gradient-canvas');
```

**CSS Variables:**
```css
#gradient-canvas {
  --gradient-color-1: #b90e50;
  --gradient-color-2: #032e46;
  --gradient-color-3: #151525;
  --gradient-color-4: #0f3b5e;
}
```

---

### COLOR CUSTOMIZATION FOR ORANGE/BROWN THEME

To use orange-500, orange-600, brown-900 colors:

**Tailwind to Hex Conversion:**
- `orange-500`: `#f97316`
- `orange-600`: `#ea580c`
- `brown-900`: `#78350f` (or use `#292524` for neutral-800)

**Recommended Color Palette (4-5 colors):**
```javascript
colors: [
  '#f97316', // orange-500
  '#ea580c', // orange-600
  '#78350f', // brown-900
  '#fb923c', // orange-400 (lighter accent)
  '#c2410c'  // orange-700 (darker accent)
]
```

**Alternative Warm Palette:**
```javascript
colors: [
  '#f97316', // orange-500
  '#ea580c', // orange-600
  '#78350f', // brown-900
  '#fbbf24', // amber-400 (warm highlight)
  '#92400e'  // amber-800 (deep shadow)
]
```

---

### PERFORMANCE CONSIDERATIONS

1. **GPU Acceleration:** All implementations use WebGL for GPU rendering
2. **Frame Rate:** Target 60 FPS, skip frames if document hidden
3. **Pixel Ratio:** Limit to `Math.min(window.devicePixelRatio, 2)` for performance
4. **Mesh Density:** Balance between visual quality and performance
   - Desktop: Higher density (e.g., 500x500 segments)
   - Mobile: Lower density (e.g., 200x200 segments)
5. **Pause on Scroll:** Some implementations pause animation during scroll for performance

---

### ADDITIONAL RESOURCES

**Tutorials:**
- "How to make animated gradients like Stripe" - https://dev.to/jordienr/how-to-make-animated-gradients-like-stripe-56nh
- "How To: Create the Stripe Website Gradient Effect" - https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/
- "A flowing WebGL gradient, deconstructed" - https://alexharri.com/blog/webgl-gradients

**CodePen Examples:**
- https://codepen.io/jordienric/pen/rNepyxy
- https://codepen.io/smitpatelx/pen/GRZayyO

**Other Implementations:**
- scottbedard/gradient - https://github.com/scottbedard/gradient
- sa3dany/wave-gradient - https://github.com/sa3dany/wave-gradient
- thayallans/stripe.gradient.js - https://github.com/thayallans/stripe.gradient.js

---

### RECOMMENDED APPROACH FOR THIS PROJECT

**Use Option 2: Adapt thelevicole/stripe-gradient**

**Reasoning:**
1. Lightweight (no Three.js dependency)
2. Full control over colors (supports any number)
3. Well-structured, readable code
4. Easy to integrate with Next.js
5. Can customize for specific orange/brown theme

**Next Steps:**
1. Copy implementation from thelevicole/stripe-gradient
2. Create React wrapper component
3. Customize colors to orange-500, orange-600, brown-900 palette
4. Add to hero section with proper z-index layering
5. Test performance on mobile devices
6. Consider adding pause-on-scroll for better UX
