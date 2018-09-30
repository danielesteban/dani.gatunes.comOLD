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
    position: relative;
    margin: 2rem;
    padding: 1rem;
    background: rgba(0, 0, 0, .5);
    border: 2px solid #141414;
    box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
    text-align: center;
    .button {
      display: block;
      padding: 1rem 0.5rem;
      background: rgba(127, 127, 127, .3);
      color: inherit;
      border: 1px solid #000;
      text-decoration: none;
      font-size: 1.5em;
    }
    @media only screen and (min-width: 1024px) {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0;
      width: 500px;
      transform: translate(-50%, -65%);
    }
  }
</style>
