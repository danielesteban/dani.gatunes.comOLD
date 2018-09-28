<script>
import Octicon from '../components/octicon';
import CV from '../data/cv.pdf';

export default {
  name: 'Info',
  components: { Octicon },
  computed: {
    CV() {
      return CV;
    },
  },
};
</script>

<template>
  <div class="info">
    <h2>Daniel Esteban Nombela</h2>
    <h5>C++/GLSL/JS Full-Stack Developer</h5>
    <div class="resources">
      <a
        :href="CV"
        download="Daniel Esteban Nombela - CV.pdf"
      >
        <Octicon
          :scale="1.5"
          name="file-pdf"
        />
        <span>CV</span>
      </a>
      <a
        href="https://github.com/danielesteban"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Octicon
          :scale="1.5"
          name="mark-github"
        />
        <span>Github</span>
      </a>
      <a
        href="https://twitter.com/DaniGatunes"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Octicon
          :scale="1.5"
          name="comment-discussion"
        />
        <span>@DaniGatunes</span>
      </a>
      <a href="mailto:dani@gatunes.com">
        <Octicon
          :scale="1.5"
          name="mail"
        />
        <span>dani@gatunes.com</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .info {
    position: relative;
    background: rgb(72, 155, 43);
    padding: 1.5rem 2rem;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    z-index: 1;
    > h2 {
      margin: 0;
    }
    > h5 {
      margin: 0 0 0.5rem;
    }
    .resources {
      > a {
        display: flex;
        align-items: center;
        color: inherit;
        text-decoration: none;
        margin-bottom: 1rem;
        > span {
          margin-left: 0.75rem;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    @media only screen and (min-width: 1024px) {
      position: fixed;
      bottom: 0;
      width: 100%;
      background: rgba(72, 155, 43, .8);
      text-align: center;
      .resources {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        > a {
          margin: 0 1rem;
        }
      }
    }
  }
</style>
