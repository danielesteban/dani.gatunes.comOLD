<script>
export default {
  name: 'Favicon',
  mounted() {
    const { $refs: { canvas } } = this;
    const ctx = canvas.getContext('2d');

    // Initialize
    const size = 8;
    const scale = 2;
    canvas.width = size * scale;
    canvas.height = size * scale;
    const grid = [];
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        if (
          Math.sqrt(
            ((y - (size * 0.5) + 0.5) ** 2)
            + ((x - (size * 0.5) + 0.5) ** 2)
          ) < size * 0.5
        ) {
          grid.push({ x, y });
        }
      }
    }
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    grid.forEach(({ x, y }) => {
      const r = 100 + Math.floor(Math.random() * 129);
      const g = 100 + Math.floor(Math.random() * 129);
      const b = 100 + Math.floor(Math.random() * 129);
      for (let py = 0; py < scale; py += 1) {
        for (let px = 0; px < scale; px += 1) {
          const pixel = (
            (((y * scale) + py) * (size * scale))
            + ((x * scale) + px)
          ) * 4;
          pixels.data[pixel] = r;
          pixels.data[pixel + 1] = g;
          pixels.data[pixel + 2] = b;
          pixels.data[pixel + 3] = 0xFF;
        }
      }
    });
    const tag = document.createElement('link');
    tag.rel = 'icon';
    tag.type = 'image/png';
    document.head.appendChild(tag);

    // Cache refs & memory
    this.state = {
      canvas,
      ctx,
      grid,
      pixels,
      size,
      scale,
      tag,
    };

    // Start animation
    setImmediate(this.animate);
  },
  beforeDestroy() {
    const { state } = this;
    clearTimeout(state.animationHandler);
    document.head.removeChild(state.tag);
  },
  methods: {
    animate() {
      const { state } = this;
      const {
        canvas,
        ctx,
        grid,
        pixels,
        size,
        scale,
        tag,
      } = state;

      const step = pixel => (
        Math.min(
          Math.max(
            pixels.data[pixel] + Math.floor(Math.random() * 65) - 32,
            100
          ),
          228
        )
      );

      grid.forEach(({ x, y }) => {
        const sample = (
          (y * size * scale * scale) + (x * scale)
        ) * 4;
        const r = step(sample);
        const g = step(sample + 1);
        const b = step(sample + 2);
        for (let py = 0; py < scale; py += 1) {
          for (let px = 0; px < scale; px += 1) {
            const pixel = (
              (((y * scale) + py) * (size * scale))
              + ((x * scale) + px)
            ) * 4;
            pixels.data[pixel] = r;
            pixels.data[pixel + 1] = g;
            pixels.data[pixel + 2] = b;
            pixels.data[pixel + 3] = 0xFF;
          }
        }
      });
      ctx.putImageData(pixels, 0, 0);
      tag.href = canvas.toDataURL('image/png');

      // Since this can't keep up with v-sync and we don't care about precise timings,
      // I just call setTimeout instead of requestAnimationFrame.
      state.animationHandler = setTimeout(this.animate, 100);
    },
  },
};
</script>

<template>
  <canvas ref="canvas" />
</template>

<style lang="scss" scoped>
  canvas {
    display: none;
  }
</style>
