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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding-top: 1rem;
  }
</style>
