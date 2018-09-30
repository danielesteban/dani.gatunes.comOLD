<script>
import { Projects } from 'data';
import Project from '../components/project';

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
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem;
  }
</style>
