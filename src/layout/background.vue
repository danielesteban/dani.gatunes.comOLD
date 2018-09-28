<script>
import { vec2, mat4 } from 'gl-matrix';
import { Noise } from 'noisejs';
import requestAnimationFrame, { cancel as cancelAnimationFrame } from 'raf';
import vertexShader from '../shaders/background.vert';
import fragmentShader from '../shaders/background.frag';

const QUAD_WIDTH = 20;
const QUAD_HEIGHT = 30;

export default {
  name: 'Background',
  mounted() {
    const { $refs: { canvas } } = this;
    const hints = { antialias: false, preserveDrawingBuffer: false };
    const GL = canvas.getContext('webgl', hints) || canvas.getContext('experimental-webgl', hints);
    if (!GL) return;

    // Allocate memory
    const state = {
      GL,
      albedo: GL.createBuffer(),
      position: GL.createBuffer(),
      indices: GL.createBuffer(),
      shader: GL.createProgram(),
      noise: new Noise(Math.random()),
      pointer: vec2.fromValues(-999, -999),
      projection: mat4.create(),
      halo: 180,
      scale: 0.6,
    };
    this.state = state;

    // Compile and upload shader
    const vertex = GL.createShader(GL.VERTEX_SHADER);
    GL.shaderSource(vertex, vertexShader);
    GL.compileShader(vertex);
    const fragment = GL.createShader(GL.FRAGMENT_SHADER);
    GL.shaderSource(fragment, fragmentShader);
    GL.compileShader(fragment);
    GL.attachShader(state.shader, vertex);
    GL.attachShader(state.shader, fragment);
    GL.linkProgram(state.shader);
    GL.useProgram(state.shader);

    // Initialize quads
    this.reset();

    // Start animation
    setImmediate(this.animate);

    // Capture pointer
    window.addEventListener('mousemove', this.onPointerMove, false);

    // Handle window resize
    window.addEventListener('resize', this.reset, false);
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.onPointerMove);
    window.removeEventListener('resize', this.reset);
    cancelAnimationFrame(this.state.animationHandler);
  },
  methods: {
    animate(time) {
      const {
        GL,
        colors,
        count,
        halo,
        noise,
        pointer,
        quads,
      } = this.state;
      quads.forEach((quad, i) => {
        const [x, y] = quad;
        let color = (
          (1 + noise.simplex3(x / 100, y / 100, time * 0.0003)) * 1.1 * 128
        ) / 1000;
        const distance = vec2.distance(quad, pointer);
        if (distance <= halo) {
          const light = ((halo - distance) / halo) * 0.25;
          color += light - (light * 0.5);
        }
        for (let v = 0; v < 4; v += 1) colors[(i * 4) + v] = color;
      });
      GL.bufferSubData(GL.ARRAY_BUFFER, 0, colors);
      GL.drawElements(GL.TRIANGLES, count, GL.UNSIGNED_SHORT, 0);
      this.state.animationHandler = requestAnimationFrame(this.animate);
    },
    onPointerMove({ clientX: x, clientY: y }) {
      const { pointer, scale } = this.state;
      pointer[0] = x * scale;
      pointer[1] = y * scale;
    },
    reset() {
      const { $refs: { canvas }, state } = this;
      const {
        GL,
        albedo,
        indices,
        position,
        projection,
        scale,
        shader,
      } = state;

      // Resize canvas
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      GL.viewport(0, 0, GL.drawingBufferWidth, GL.drawingBufferHeight);
      mat4.ortho(projection, 0, GL.drawingBufferWidth, 0, GL.drawingBufferHeight, 0, 1.0);
      GL.uniformMatrix4fv(GL.getUniformLocation(shader, 'transform'), false, projection);

      // Generate quads
      const w = QUAD_WIDTH * 0.5;
      const h = QUAD_HEIGHT * 0.5;
      const quadVertices = [
        [-w, -h],
        [w, -h],
        [w, h],
        [-w, h],
      ];
      const quadIndices = [
        0, 1, 2,
        2, 3, 0,
      ];
      const vertices = [];
      const index = [];
      const quads = [];
      for (
        let y = (canvas.height % QUAD_HEIGHT) * 0.5, offset = 0;
        y < canvas.height + QUAD_HEIGHT * 0.5;
        y += QUAD_HEIGHT
      ) {
        for (
          let x = (canvas.width % QUAD_WIDTH) * 0.5;
          x < canvas.width + QUAD_WIDTH * 0.5;
          x += QUAD_WIDTH, offset += 4
        ) {
          quadVertices.forEach((v) => {
            vertices.push(x + v[0]);
            vertices.push(canvas.height - y + v[1]);
          });
          // eslint-disable-next-line no-loop-func
          quadIndices.forEach(i => index.push(offset + i));
          quads.push(vec2.fromValues(x, y));
        }
      }

      // Bind the position VBO and the EBO
      const positionLocation = GL.getAttribLocation(shader, 'position');
      GL.bindBuffer(GL.ARRAY_BUFFER, position);
      GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);
      GL.vertexAttribPointer(positionLocation, 2, GL.FLOAT, 0, 0, 0);
      GL.enableVertexAttribArray(positionLocation);
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indices);
      GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), GL.STATIC_DRAW);
      state.count = index.length;
      state.quads = quads;

      // Allocate and bind the albedo streaming buffer
      state.colors = new Float32Array(quads.length * 4);
      const albedoLocation = GL.getAttribLocation(shader, 'albedo');
      GL.bindBuffer(GL.ARRAY_BUFFER, albedo);
      GL.bufferData(GL.ARRAY_BUFFER, state.colors, GL.STREAM_DRAW);
      GL.vertexAttribPointer(albedoLocation, 1, GL.FLOAT, 0, 0, 0);
      GL.enableVertexAttribArray(albedoLocation);
    },
  },
};
</script>

<template>
  <canvas ref="canvas" />
</template>

<style lang="scss" scoped>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
