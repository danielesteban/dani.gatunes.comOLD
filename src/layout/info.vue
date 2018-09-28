<script>
import CV from '../data/cv.pdf';
import Meta from '../data/meta';
import Octicon from '../components/octicon';

export default {
  name: 'Info',
  components: { Octicon },
  computed: {
    CV() {
      return CV;
    },
    Meta() {
      return Meta;
    },
  },
};
</script>

<template>
  <div class="info">
    <h2>{{ Meta.name }}</h2>
    <h5>{{ Meta.description }}</h5>
    <div class="resources">
      <a
        :href="CV"
        :download="`${Meta.name} - CV.pdf`"
      >
        <Octicon
          :scale="1.5"
          name="file-pdf"
        />
        <span>CV</span>
      </a>
      <a
        :href="`https://github.com/${Meta.github}`"
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
        :href="`https://twitter.com/${Meta.twitter}`"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Octicon
          :scale="1.5"
          name="comment-discussion"
        />
        <span>@{{ Meta.twitter }}</span>
      </a>
      <a :href="`mailto:${Meta.email}`">
        <Octicon
          :scale="1.5"
          name="mail"
        />
        <span>{{ Meta.email }}</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $background: rgb(72, 155, 43);
  .info {
    position: relative;
    background: linear-gradient($background, darken($background, 20%));
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
      background: linear-gradient(rgba($background, .9), darken($background, 20%));
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
