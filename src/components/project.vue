<script>
import Octicon from './octicon.vue';

export default {
  name: 'Project',
  components: { Octicon },
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="project">
    <div class="wrapper">
      <img
        :src="require(`data/snapshots/${id}.png`).default"
      >
      <div class="flipper">
        <div class="info">
          <h2>{{ title }}</h2>
          <div class="tags">
            <div
              v-for="tag in tags"
              :key="tag"
            >
              {{ tag }}
            </div>
          </div>
          <p>{{ info }}</p>
          <div class="url">
            <span>https://{{ url }}</span>
            <Octicon
              :scale="2"
              name="link-external"
            />
          </div>
          <a
            :href="`https://${url}`"
            rel="noopener noreferrer"
            target="_blank"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .project {
    padding: 0 1rem 2rem;
    width: 100%;
    height: 460px;
    &, .wrapper {
      display: flex;
      justify-content: center;
    }
    .wrapper, .flipper, .info {
      width: 100%;
      height: 100%;
    }
    .wrapper {
      position: relative;
      background: #000;
      border: 2px solid #141414;
      box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
      overflow: hidden;
      > img {
        height: 100%;
      }
    }
    .flipper {
      position: absolute;
      top: 0;
      left: 0;
      perspective: 1000px;
    }
    .info {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      background: rgba(0, 0, 0, .75);
      color: #fff;
      padding: 1.5rem;
      transform: rotateX(-180deg);
      transform-origin: 0% 0%;
      transform-style: preserve-3d;
      transition: transform .25s ease-out;
      will-change: transform;
      > a {
        display: block;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
      }
      > h2 {
        margin: 0 0 1rem;
      }
      > p {
        flex-grow: 1;
      }
      .tags {
        display: flex;
        > div {
          flex-grow: 1;
          padding: 0.125rem 0.25rem;
          background: rgba(50, 50, 50, .3);
          color: rgba(255, 255, 255, .6);
          border: 1px solid #000;
          margin-left: .25rem;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          &:first-child {
            margin-left: 0;
          }
        }
      }
      .url {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > span {
          color: rgba(255, 255, 255, .5);
          margin-right: 1rem;
          min-width: 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
    .wrapper:hover .info {
      transform: rotateY(0deg);
    }
    @media only screen and (min-width: 1024px) {
      width: (100% / 2);
    }
    @media only screen and (min-width: 1408px) {
      width: (100% / 3);
    }
    @media only screen and (min-width: 1920px) {
      width: (100% / 4);
    }
  }
</style>
