<script>
export default {
  name: 'Favicon',
  mounted() {
    const { $refs: { canvas } } = this;

    // Initialize
    const size = 8;
    const scale = 2;
    const grid = [];
    const pixel = [];
    for (let y = 0; y < scale; y += 1) {
      for (let x = 0; x < scale; x += 1) {
        pixel.push({ x, y });
      }
    }
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        if (
          Math.sqrt(
            ((y - (size * 0.5) + 0.5) ** 2)
            + ((x - (size * 0.5) + 0.5) ** 2)
          ) < size * 0.5
        ) {
          grid.push(pixel.map(({ x: px, y: py }) => (
            (
              (((y * scale) + py) * (size * scale))
              + ((x * scale) + px)
            ) * 4
          )));
        }
      }
    }
    canvas.width = size * scale;
    canvas.height = size * scale;
    const ctx = canvas.getContext('2d');
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    grid.forEach((pixel) => {
      const r = 100 + Math.floor(Math.random() * 129);
      const g = 100 + Math.floor(Math.random() * 129);
      const b = 100 + Math.floor(Math.random() * 129);
      pixel.forEach((index) => {
        pixels.data[index] = r;
        pixels.data[index + 1] = g;
        pixels.data[index + 2] = b;
        pixels.data[index + 3] = 0xFF;
      });
    });
    ctx.putImageData(pixels, 0, 0);
    const tag = document.createElement('link');
    tag.rel = 'icon';
    tag.type = 'image/png';
    tag.href = canvas.toDataURL('image/png');
    document.head.appendChild(tag);

    // Cache refs & memory
    this.state = {
      canvas,
      ctx,
      grid,
      pixels,
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
        tag,
      } = state;

      const step = sample => (
        Math.min(
          Math.max(
            pixels.data[sample] + Math.floor(Math.random() * 65) - 32,
            100
          ),
          228
        )
      );
      grid.forEach((pixel) => {
        const r = step(pixel[0]);
        const g = step(pixel[0] + 1);
        const b = step(pixel[0] + 2);
        pixel.forEach((index) => {
          pixels.data[index] = r;
          pixels.data[index + 1] = g;
          pixels.data[index + 2] = b;
        });
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
