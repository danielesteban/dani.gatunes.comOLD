<script>
import Background from '../components/background';
import Menu from './menu';
import Projects from '../components/projects';

export default {
  name: 'Layout',
  components: { Background, Menu, Projects },
};
</script>

<template>
  <div>
    <Background />
    <Menu />
    <Projects />
  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: 'Print Char 21';
    src: url(../fonts/printchar21.ttf);
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
  }

  *, *:after, *:before {
    box-sizing: border-box;
  }
</style>
