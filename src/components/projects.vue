<script>
import Projects from '../data/projects';
import Project from './project';

export default {
  name: 'Projects',
  components: { Project },
  computed: {
    Projects() {
      return Projects;
    },
  },
};
</script>

<template>
  <div class="projects">
    <Project
      v-for="project in Projects"
      :key="project.snapshot"
      v-bind="project"
    />
  </div>
</template>

<style lang="scss" scoped>
  .projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem;
    @media only screen and (min-width: 1024px) {
      padding-bottom: 10rem;
    }
  }
</style>
