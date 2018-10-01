<script>
import Octicon from '../components/octicon';

export default {
  name: 'NotFound',
  components: { Octicon },
};
</script>

<template>
  <div class="notfound">
    <Octicon
      name="stop"
      :scale="10"
    />
    <p>
      Sorry! The page you requested wasn't found.
    </p>
    <p>
      However, since you're already here...
    </p>
    <router-link
      class="button"
      :to="{ name: 'projects' }"
    >
      Go checkout my projects
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  .notfound {
    align-self: center;
    max-width: 500px;
    padding: 1rem;
    margin: 1rem;
    background: rgba(0, 0, 0, .5);
    border: 2px solid #141414;
    box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
    text-align: center;
    @media only screen and (min-width: 1024px) {
      margin: 0;
    }
  }
  .button {
    display: block;
    padding: 1rem 0.5rem;
    background: rgba(127, 127, 127, .3);
    color: inherit;
    border: 1px solid #000;
    text-decoration: none;
    font-size: 1.5em;
  }
</style>
