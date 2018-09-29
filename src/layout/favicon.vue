<script>
export default {
  name: 'Favicon',
  mounted() {
    const { $refs: { canvas } } = this;

    // Initialize
    canvas.width = 8;
    canvas.height = 8;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const grid = [];
    pixels.data.forEach((v, i) => {
      const pixel = i / 4;
      const x = Math.floor(pixel % canvas.width);
      const y = Math.floor(pixel / canvas.width);
      if (
        Math.sqrt(
          ((y - (canvas.height * 0.5) + 0.5) ** 2)
          + ((x - (canvas.width * 0.5) + 0.5) ** 2)
        ) < canvas.width * 0.5
      ) {
        if (i % 4 === 3) {
          pixels.data[i] = 0xFF;
        } else {
          grid.push(i);
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
      grid: new Uint16Array(grid),
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

      grid.forEach((i) => {
        pixels.data[i] = 90 + Math.floor(Math.random() * 166);
      });
      ctx.putImageData(pixels, 0, 0);
      tag.href = canvas.toDataURL('image/png');

      // Since this doesn't require precise timings, I call setTimeout instead of
      // requestAnimationFrame so it keeps animating when the window loses focus.
      state.animationHandler = setTimeout(this.animate, 20);
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
