/**
 * Stripe-style animated mesh gradient
 * Adapted from https://github.com/thelevicole/stripe-gradient
 * All classes consolidated into a single TypeScript module.
 */

// ─── GLSL Shaders ────────────────────────────────────────────────────────────

const noiseShader = `
//
// Simplex noise - Ian McEwan, Ashima Arts (MIT License)
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const blendShader = `
//
// GLSL Blend modes - https://github.com/jamieowen/glsl-blend
//

vec3 blendNormal(vec3 base, vec3 blend) {
  return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
  return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}
`;

const vertexShader = `
varying vec3 v_color;

void main() {
  float time = u_time * u_global.noiseSpeed;

  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;

  vec2 st = 1. - uvNorm.xy;

  // Tilting the plane
  float tilt = resolution.y / 2.0 * uvNorm.y;
  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;
  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

  // Vertex noise
  float noise = snoise(vec3(
    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
    noiseCoord.y * u_vertDeform.noiseFreq.y,
    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
  )) * u_vertDeform.noiseAmp;

  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);
  noise = max(0.0, noise);

  vec3 pos = vec3(
    position.x,
    position.y + tilt + incline + noise - offset,
    position.z
  );

  // Vertex color
  if (u_active_colors[0] == 1.) {
    v_color = u_baseColor;
  }

  for (int i = 0; i < u_waveLayers_length; i++) {
    if (u_active_colors[i + 1] == 1.) {
      WaveLayers layer = u_waveLayers[i];

      float noise = smoothstep(
        layer.noiseFloor,
        layer.noiseCeil,
        snoise(vec3(
          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,
          noiseCoord.y * layer.noiseFreq.y,
          time * layer.noiseSpeed + layer.noiseSeed
        )) / 2.0 + 0.5
      );

      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));
    }
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec3 v_color;

void main() {
  vec3 color = v_color;
  if (u_darken_top == 1.0) {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
  }
  gl_FragColor = vec4(color, 1.0);
}
`;

// ─── Attribute ───────────────────────────────────────────────────────────────

class Attribute {
  gl: MiniGL;
  type: number;
  buffer: WebGLBuffer | null;
  normalized: boolean = false;
  target!: number;
  size!: number;
  values!: Float32Array | Uint16Array;

  constructor(minigl: MiniGL, properties: Record<string, unknown> = {}) {
    Object.assign(this, properties);
    this.gl = minigl;
    this.type = this.gl.getContext().FLOAT;
    this.buffer = this.gl.getContext().createBuffer();
    this.update();
  }

  update() {
    if (this.values) {
      const context = this.gl.getContext();
      context.bindBuffer(this.target, this.buffer);
      context.bufferData(this.target, this.values, context.STATIC_DRAW);
    }
  }

  attach(name: string, program: WebGLProgram): number {
    const context = this.gl.getContext();
    const location = context.getAttribLocation(program, name);
    if (this.target === context.ARRAY_BUFFER) {
      context.enableVertexAttribArray(location);
      context.vertexAttribPointer(location, this.size, this.type, this.normalized, 0, 0);
    }
    return location;
  }

  use(location: number) {
    const context = this.gl.getContext();
    context.bindBuffer(this.target, this.buffer);
    if (this.target === context.ARRAY_BUFFER) {
      context.enableVertexAttribArray(location);
      context.vertexAttribPointer(location, this.size, this.type, this.normalized, 0, 0);
    }
  }
}

// ─── Uniform ─────────────────────────────────────────────────────────────────

class Uniform {
  gl: MiniGL;
  type: string;
  value: unknown;
  typeFn: string;
  excludeFrom?: string;
  transpose?: boolean;

  private _typeMap: Record<string, string> = {
    float: '1f',
    int: '1i',
    vec2: '2fv',
    vec3: '3fv',
    vec4: '4fv',
    mat4: 'Matrix4fv',
  };

  constructor(minigl: MiniGL, type: string, value: unknown, properties: Record<string, unknown> = {}) {
    Object.assign(this, properties);
    this.gl = minigl;
    this.type = type;
    this.value = value;
    this.typeFn = this._typeMap[this.type] || this._typeMap.float;
    this.update();
  }

  update(location?: WebGLUniformLocation | null) {
    if (this.value !== undefined && this.value !== null) {
      let paramB: unknown = this.value;
      let paramC: unknown = null;

      if (this.typeFn.indexOf('Matrix') === 0) {
        paramB = this.transpose;
        paramC = this.value;
      }

      const fn = `uniform${this.typeFn}` as keyof WebGLRenderingContext;
      const ctx = this.gl.getContext();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ctx[fn] as any).call(ctx, location, paramB, paramC);
    }
  }

  getDeclaration(name: string, type: string, length?: number): string {
    if (this.excludeFrom !== type) {
      if (this.type === 'array') {
        const arr = this.value as Uniform[];
        return `${arr[0].getDeclaration(name, type, arr.length)}\nconst int ${name}_length = ${arr.length};`;
      }

      if (this.type === 'struct') {
        let namePrefix = name.replace('u_', '');
        namePrefix = namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1);

        const structValue = this.value as Record<string, Uniform>;
        const declaration = Object.entries(structValue)
          .map(([fieldName, uniform]) => uniform.getDeclaration(fieldName, type).replace(/^uniform/, ''))
          .join('');

        const suffix = length && length > 0 ? `[${length}]` : '';
        return `uniform struct ${namePrefix} {\n    ${declaration}\n} ${name}${suffix};`;
      }

      const suffix = length && length > 0 ? `[${length}]` : '';
      return `uniform ${this.type} ${name}${suffix};`;
    }
    return '';
  }
}

// ─── PlaneGeometry ───────────────────────────────────────────────────────────

class PlaneGeometry {
  gl: MiniGL;
  attributes: {
    position: Attribute;
    uv: Attribute;
    uvNorm: Attribute;
    index: Attribute;
  };
  xSegCount: number = 0;
  ySegCount: number = 0;
  vertexCount: number = 0;
  quadCount: number = 0;
  width: number = 0;
  height: number = 0;
  orientation: string = 'xz';

  constructor(minigl: MiniGL) {
    this.gl = minigl;
    const context = this.gl.getContext();
    context.createBuffer();

    this.attributes = {
      position: new Attribute(this.gl, {
        target: context.ARRAY_BUFFER,
        size: 3,
      }),
      uv: new Attribute(this.gl, { target: context.ARRAY_BUFFER, size: 2 }),
      uvNorm: new Attribute(this.gl, { target: context.ARRAY_BUFFER, size: 2 }),
      index: new Attribute(this.gl, {
        target: context.ELEMENT_ARRAY_BUFFER,
        size: 3,
        type: context.UNSIGNED_SHORT,
      }),
    };

    this.setTopology();
    this.setSize();
  }

  setTopology(xSeg: number = 1, ySeg: number = 1) {
    this.xSegCount = xSeg;
    this.ySegCount = ySeg;
    this.vertexCount = (this.xSegCount + 1) * (this.ySegCount + 1);
    this.quadCount = this.xSegCount * this.ySegCount * 2;
    this.attributes.uv.values = new Float32Array(2 * this.vertexCount);
    this.attributes.uvNorm.values = new Float32Array(2 * this.vertexCount);
    this.attributes.index.values = new Uint16Array(3 * this.quadCount);

    for (let y = 0; y <= this.ySegCount; y++) {
      for (let x = 0; x <= this.xSegCount; x++) {
        const i = y * (this.xSegCount + 1) + x;
        this.attributes.uv.values[2 * i] = x / this.xSegCount;
        this.attributes.uv.values[2 * i + 1] = 1 - y / this.ySegCount;
        this.attributes.uvNorm.values[2 * i] = (x / this.xSegCount) * 2 - 1;
        this.attributes.uvNorm.values[2 * i + 1] = 1 - (y / this.ySegCount) * 2;

        if (x < this.xSegCount && y < this.ySegCount) {
          const s = y * this.xSegCount + x;
          this.attributes.index.values[6 * s] = i;
          this.attributes.index.values[6 * s + 1] = i + 1 + this.xSegCount;
          this.attributes.index.values[6 * s + 2] = i + 1;
          this.attributes.index.values[6 * s + 3] = i + 1;
          this.attributes.index.values[6 * s + 4] = i + 1 + this.xSegCount;
          this.attributes.index.values[6 * s + 5] = i + 2 + this.xSegCount;
        }
      }
    }

    this.attributes.uv.update();
    this.attributes.uvNorm.update();
    this.attributes.index.update();
  }

  setSize(width: number = 1, height: number = 1, orientation: string = 'xz') {
    this.width = width;
    this.height = height;
    this.orientation = orientation;

    if (!this.attributes.position.values || this.attributes.position.values.length !== 3 * this.vertexCount) {
      this.attributes.position.values = new Float32Array(3 * this.vertexCount);
    }

    const halfWidth = width / -2;
    const halfHeight = height / -2;
    const segWidth = width / this.xSegCount;
    const segHeight = height / this.ySegCount;

    for (let yIdx = 0; yIdx <= this.ySegCount; yIdx++) {
      const yPos = halfHeight + yIdx * segHeight;
      for (let xIdx = 0; xIdx <= this.xSegCount; xIdx++) {
        const xPos = halfWidth + xIdx * segWidth;
        const idx = yIdx * (this.xSegCount + 1) + xIdx;

        this.attributes.position.values[3 * idx + 'xyz'.indexOf(orientation[0])] = xPos;
        this.attributes.position.values[3 * idx + 'xyz'.indexOf(orientation[1])] = -yPos;
      }
    }

    this.attributes.position.update();
  }
}

// ─── Material ────────────────────────────────────────────────────────────────

class Material {
  gl: MiniGL;
  uniforms: Record<string, Uniform>;
  uniformInstances: Array<{
    uniform: Uniform;
    location: WebGLUniformLocation | null;
  }> = [];
  program: WebGLProgram;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;

  constructor(minigl: MiniGL, vertexShaders: string, fragments: string, uniforms: Record<string, Uniform> = {}) {
    this.gl = minigl;
    this.uniforms = uniforms;

    const context = this.gl.getContext();
    const prefix = `precision highp float;\n`;

    const vertexSource = `
      ${prefix}
      attribute vec4 position;
      attribute vec2 uv;
      attribute vec2 uvNorm;
      ${this._getUniformVariableDeclarations(this.gl.commonUniforms, 'vertex')}
      ${this._getUniformVariableDeclarations(uniforms, 'vertex')}
      ${vertexShaders}
    `;

    const fragmentSource = `
      ${prefix}
      ${this._getUniformVariableDeclarations(this.gl.commonUniforms, 'fragment')}
      ${this._getUniformVariableDeclarations(uniforms, 'fragment')}
      ${fragments}
    `;

    this.vertexShader = this._getShaderByType(context.VERTEX_SHADER, vertexSource);
    this.fragmentShader = this._getShaderByType(context.FRAGMENT_SHADER, fragmentSource);
    this.program = context.createProgram()!;

    context.attachShader(this.program, this.vertexShader);
    context.attachShader(this.program, this.fragmentShader);
    context.linkProgram(this.program);

    if (!context.getProgramParameter(this.program, context.LINK_STATUS)) {
      console.error(context.getProgramInfoLog(this.program));
    }

    context.useProgram(this.program);
    this.attachUniforms(undefined, this.gl.commonUniforms);
    this.attachUniforms(undefined, this.uniforms);
  }

  private _getShaderByType(type: number, source: string): WebGLShader {
    const context = this.gl.getContext();
    const shader = context.createShader(type)!;
    context.shaderSource(shader, source);
    context.compileShader(shader);

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      console.error(context.getShaderInfoLog(shader));
    }

    return shader;
  }

  private _getUniformVariableDeclarations(uniforms: Record<string, Uniform>, type: string): string {
    return Object.entries(uniforms)
      .map(([name, value]) => value.getDeclaration(name, type))
      .join('\n');
  }

  attachUniforms(name: string | undefined, uniforms: Record<string, Uniform> | Uniform) {
    if (!name) {
      Object.entries(uniforms as Record<string, Uniform>).forEach(([n, uniform]) => {
        this.attachUniforms(n, uniform);
      });
    } else {
      const u = uniforms as Uniform;
      if (u.type === 'array') {
        (u.value as Uniform[]).forEach((uniform, i) => {
          this.attachUniforms(`${name}[${i}]`, uniform);
        });
      } else if (u.type === 'struct') {
        Object.entries(u.value as Record<string, Uniform>).forEach(([field, uniform]) => {
          this.attachUniforms(`${name}.${field}`, uniform);
        });
      } else {
        this.uniformInstances.push({
          uniform: u,
          location: this.gl.getContext().getUniformLocation(this.program, name),
        });
      }
    }
  }
}

// ─── Mesh ────────────────────────────────────────────────────────────────────

class Mesh {
  gl: MiniGL;
  geometry: PlaneGeometry;
  material: Material;
  wireframe: boolean = false;
  attributeInstances: Array<{ attribute: Attribute; location: number }> = [];

  constructor(minigl: MiniGL, geometry: PlaneGeometry, material: Material) {
    this.geometry = geometry;
    this.material = material;
    this.gl = minigl;

    Object.entries(this.geometry.attributes).forEach(([name, attribute]) => {
      this.attributeInstances.push({
        attribute,
        location: attribute.attach(name, this.material.program),
      });
    });

    this.gl.meshes.push(this);
  }

  draw() {
    const context = this.gl.getContext();
    context.useProgram(this.material.program);

    this.material.uniformInstances.forEach(({ uniform, location }) => {
      uniform.update(location);
    });

    this.attributeInstances.forEach(({ attribute, location }) => {
      attribute.use(location);
    });

    const mode = this.wireframe ? context.LINES : context.TRIANGLES;
    context.drawElements(mode, this.geometry.attributes.index.values.length, context.UNSIGNED_SHORT, 0);
  }

  remove() {
    this.gl.meshes = this.gl.meshes.filter((m) => m !== this);
  }
}

// ─── MiniGL ──────────────────────────────────────────────────────────────────

class MiniGL {
  private _canvas: HTMLCanvasElement;
  private _context: WebGLRenderingContext;
  commonUniforms: Record<string, Uniform>;
  meshes: Mesh[] = [];

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this._canvas = canvas;
    this._context = canvas.getContext('webgl', { antialias: true })!;

    const identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    this.commonUniforms = {
      projectionMatrix: new Uniform(this, 'mat4', identity),
      modelViewMatrix: new Uniform(this, 'mat4', identity),
      resolution: new Uniform(this, 'vec2', [1, 1]),
      aspectRatio: new Uniform(this, 'float', 1),
    };

    this.setSize(width, height);
  }

  getCanvas(): HTMLCanvasElement {
    return this._canvas;
  }

  getContext(): WebGLRenderingContext {
    return this._context;
  }

  setSize(width: number = 640, height: number = 480) {
    this._canvas.width = width;
    this._canvas.height = height;
    this._context.viewport(0, 0, width, height);
    (this.commonUniforms.resolution as Uniform).value = [width, height];
    (this.commonUniforms.aspectRatio as Uniform).value = width / height;
  }

  setOrthographicCamera() {
    (this.commonUniforms.projectionMatrix as Uniform).value = [
      2 / this._canvas.width,
      0,
      0,
      0,
      0,
      2 / this._canvas.height,
      0,
      0,
      0,
      0,
      2 / -4000,
      0,
      0,
      0,
      0,
      1,
    ];
  }

  render() {
    this._context.clearColor(0, 0, 0, 0);
    this._context.clearDepth(1);
    this.meshes.forEach((mesh) => mesh.draw());
  }
}

// ─── Gradient ────────────────────────────────────────────────────────────────

export interface GradientOptions {
  canvas: HTMLCanvasElement;
  colors: string[];
  wireframe?: boolean;
  density?: [number, number];
  angle?: number;
  amplitude?: number;
  static?: boolean;
  seed?: number;
}

const defaultOptions: Required<Omit<GradientOptions, 'canvas' | 'seed'>> & {
  canvas: null;
  seed: number;
} = {
  canvas: null,
  colors: ['#f00', '#0f0', '#00f'],
  wireframe: false,
  density: [0.06, 0.16],
  angle: 0,
  amplitude: 320,
  static: false,
  seed: 5,
};

export class StripeGradient {
  private _minigl!: MiniGL;
  private _canvas: HTMLCanvasElement;
  private _options: GradientOptions;
  private _flags: Record<string, unknown> = { playing: true };
  private _animFrameId: number = 0;
  private _resizeHandler: (() => void) | null = null;

  // Internal state
  private time: number = 1253106;
  private mesh!: Mesh;
  private material!: Material;
  private geometry!: PlaneGeometry;
  private uniforms!: Record<string, Uniform>;

  private width: number = 0;
  private height: number = 600;
  private xSegCount: number = 0;
  private ySegCount: number = 0;
  private freqX: number = 0.00014;
  private freqY: number = 0.00029;
  private seed: number = 5;
  private activeColors: number[] = [1, 1, 1, 1];

  constructor(options: GradientOptions) {
    this._options = options;
    this._canvas = options.canvas;
    this.seed = options.seed ?? Math.random() * 100;

    if (!this._canvas) {
      throw new Error('Missing Canvas element.');
    }

    this._minigl = new MiniGL(this._canvas, this._canvas.offsetWidth, this._canvas.offsetHeight);

    this.init();
  }

  private getOption<K extends keyof GradientOptions>(name: K): GradientOptions[K] {
    return this._options[name] ?? ((defaultOptions as Record<string, unknown>)[name as string] as GradientOptions[K]);
  }

  private setFlag(name: string, value: unknown): unknown {
    return (this._flags[name] = value);
  }

  private getFlag(name: string, defaultValue?: unknown): unknown {
    return this._flags[name] ?? defaultValue;
  }

  private resize = () => {
    const [densityX, densityY] = this.getOption('density') ?? defaultOptions.density;
    this.width = this._canvas.offsetWidth;
    this.height = this._canvas.offsetHeight;
    this._minigl.setSize(this.width, this.height);
    this._minigl.setOrthographicCamera();
    this.xSegCount = Math.ceil(this.width * densityX);
    this.ySegCount = Math.ceil(this.height * densityY);
    this.mesh.geometry.setTopology(this.xSegCount, this.ySegCount);
    this.mesh.geometry.setSize(this.width, this.height);
    this.mesh.material.uniforms.u_shadow_power.value = this.width < 600 ? 5 : 6;
  };

  private animate = (event: number = 0) => {
    const shouldSkipFrame = !!document.hidden || !this.getFlag('playing') || parseInt(String(event), 10) % 2 === 0;
    let lastFrame = this.getFlag('lastFrame', 0) as number;

    if (!shouldSkipFrame) {
      this.time += Math.min(event - lastFrame, 1000 / 15);
      lastFrame = this.setFlag('lastFrame', event) as number;
      this.mesh.material.uniforms.u_time.value = this.time;
      this._minigl.render();
    }

    if (lastFrame !== 0 && this.getOption('static')) {
      this._minigl.render();
      return this.disconnect();
    }

    if (this.getFlag('playing')) {
      this._animFrameId = requestAnimationFrame(this.animate);
    }
  };

  private normalizeColor(hexCode: number): number[] {
    return [((hexCode >> 16) & 255) / 255, ((hexCode >> 8) & 255) / 255, (255 & hexCode) / 255];
  }

  private initMaterial(): Material {
    const colors = (this.getOption('colors') ?? defaultOptions.colors)
      .map((hex) => {
        if (hex.length === 4) {
          const expanded = hex
            .substr(1)
            .split('')
            .map((c) => c + c)
            .join('');
          hex = `#${expanded}`;
        }
        return hex ? `0x${hex.substr(1)}` : null;
      })
      .filter(Boolean)
      .map((h) => this.normalizeColor(parseInt(h as string, 16)));

    const angle = this.getOption('angle') ?? defaultOptions.angle;
    const amplitude = this.getOption('amplitude') ?? defaultOptions.amplitude;

    this.uniforms = {
      u_time: new Uniform(this._minigl, 'float', 0),
      u_shadow_power: new Uniform(this._minigl, 'float', 10),
      u_darken_top: new Uniform(this._minigl, 'float', 0),
      u_active_colors: new Uniform(this._minigl, 'vec4', this.activeColors),

      u_global: new Uniform(this._minigl, 'struct', {
        noiseFreq: new Uniform(this._minigl, 'vec2', [this.freqX, this.freqY]),
        noiseSpeed: new Uniform(this._minigl, 'float', 0.000005),
      }),

      u_vertDeform: new Uniform(
        this._minigl,
        'struct',
        {
          incline: new Uniform(this._minigl, 'float', Math.sin(angle) / Math.cos(angle)),
          offsetTop: new Uniform(this._minigl, 'float', -0.5),
          offsetBottom: new Uniform(this._minigl, 'float', -0.5),
          noiseFreq: new Uniform(this._minigl, 'vec2', [3, 4]),
          noiseAmp: new Uniform(this._minigl, 'float', amplitude),
          noiseSpeed: new Uniform(this._minigl, 'float', 10),
          noiseFlow: new Uniform(this._minigl, 'float', 3),
          noiseSeed: new Uniform(this._minigl, 'float', this.seed),
        },
        { excludeFrom: 'fragment' }
      ),

      u_baseColor: new Uniform(this._minigl, 'vec3', colors[0], {
        excludeFrom: 'fragment',
      }),

      u_waveLayers: new Uniform(this._minigl, 'array', [], {
        excludeFrom: 'fragment',
      }),
    };

    for (let e = 1; e < colors.length; e += 1) {
      const waveLayerUniform = new Uniform(this._minigl, 'struct', {
        color: new Uniform(this._minigl, 'vec3', colors[e]),
        noiseFreq: new Uniform(this._minigl, 'vec2', [2 + e / colors.length, 3 + e / colors.length]),
        noiseSpeed: new Uniform(this._minigl, 'float', 11 + 0.3 * e),
        noiseFlow: new Uniform(this._minigl, 'float', 6.5 + 0.3 * e),
        noiseSeed: new Uniform(this._minigl, 'float', this.seed + 10 * e),
        noiseFloor: new Uniform(this._minigl, 'float', 0.1),
        noiseCeil: new Uniform(this._minigl, 'float', 0.63 + 0.07 * e),
      });

      (this.uniforms.u_waveLayers.value as Uniform[]).push(waveLayerUniform);
    }

    const combinedVertexShader = [noiseShader, blendShader, vertexShader].join('\n\n');

    return new Material(this._minigl, combinedVertexShader, fragmentShader, this.uniforms);
  }

  private initMesh() {
    this.material = this.initMaterial();
    this.geometry = new PlaneGeometry(this._minigl);
    this.mesh = new Mesh(this._minigl, this.geometry, this.material);
    this.mesh.wireframe = this.getOption('wireframe') ?? false;
  }

  private init() {
    this.initMesh();
    this.resize();
    this._animFrameId = requestAnimationFrame(this.animate);
    this._resizeHandler = this.resize;
    window.addEventListener('resize', this._resizeHandler);
  }

  play() {
    this.setFlag('playing', true);
    this._animFrameId = requestAnimationFrame(this.animate);
  }

  pause() {
    this.setFlag('playing', false);
  }

  disconnect() {
    this.pause();
    if (this._animFrameId) {
      cancelAnimationFrame(this._animFrameId);
    }
    if (this._resizeHandler) {
      window.removeEventListener('resize', this._resizeHandler);
    }
  }
}
