<script>
import Octicon from './octicon';

export default {
  name: 'Project',
  components: { Octicon },
  props: {
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    snapshot: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="project">
    <div>
      <img
        :src="require(`../snapshots/${snapshot}.png`)"
      >
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
          <span>{{ link }}</span>
          <Octicon
            :scale="2"
            name="link-external"
          />
        </div>
        <a
          :href="link"
          rel="noopener noreferrer"
          target="_blank"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .project {
    padding: 1rem;
    width: 100%;
    height: 460px;
    &, > div {
      display: flex;
      justify-content: center;
    }
    > div {
      position: relative;
      background: #000;
      box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
      overflow: hidden;
      > img {
        height: 100%;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        position: absolute;
        top: -100%;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        color: #fff;
        padding: 1rem;
        transition: top .15s ease-out;
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
            padding: 0.25rem 0.5rem;
            background: rgba(127, 127, 127, .25);
            color: rgba(255, 255, 255, .75);
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
      &:hover .info {
        top: 0;
      }
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
