<script>
import Background from './background';
import Favicon from './favicon';
import Info from './info';

export default {
  name: 'Layout',
  components: {
    Background,
    Favicon,
    Info,
  },
};
</script>

<template>
  <div>
    <Background />
    <Favicon />
    <Info />
    <router-view />
  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: 'Print Char 21';
    src: url(../fonts/printchar21.ttf);
  }

  *, *:after, *:before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #141414;
    color: #fff;
    font-family: 'Print Char 21';
    font-size: 0.6rem;
    line-height: 1.6rem;
    font-weight: 400;
    text-shadow: rgba(0, 0, 0, .4) 1px 2px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
    cursor: default;
    @media only screen and (min-width: 512px) {
      font-size: 0.75rem;
      line-height: 1.75rem;
    }
    @media only screen and (min-width: 1024px) {
      padding-bottom: 9rem;
    }
  }

  ::-webkit-scrollbar {
    width: 1rem;
  }
  ::-webkit-scrollbar-track {
    background: rgba(#141414, .25);
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(72, 155, 43, .25);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(72, 155, 43, .5);
  }
</style>
