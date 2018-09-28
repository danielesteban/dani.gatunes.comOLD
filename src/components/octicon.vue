<script>
import octicons from 'octicons';

export default {
  name: 'Octicon',
  props: {
    name: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    options() {
      const { options } = octicons[this.name];
      return {
        ...options,
        class: undefined,
        width: options.width * this.scale,
        height: options.height * this.scale,
      };
    },
    path() {
      return octicons[this.name].path;
    },
  },
};
</script>

<template>
  <svg
    v-bind="options"
    v-html="path"
  />
</template>

<style lang="scss" scoped>
  svg {
    fill: currentColor;
    filter: drop-shadow(1px 2px rgba(0, 0, 0, .2));
  }
</style>
