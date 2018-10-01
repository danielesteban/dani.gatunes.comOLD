<script>
// easter egg:
// single file chat component
// https://dani.gatunes.com/#/π
// ============================

import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyBrlOAqQjC98Xn9U9_F6ztaXya-7LwmFBA',
  projectId: 'chat-danigatunes',
});

const { firestore: { FieldValue } } = firebase;
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default {
  name: 'Chat',
  filters: {
    timestamp(time) {
      const date = new Date(time);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return (
        `${year}/${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day} `
        + `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
      );
    },
  },
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    this.$refs.input.focus();
    this.unsubscribe = db.collection('messages')
      .orderBy('time', 'desc')
      .limit(2048)
      .onSnapshot(this.onSnapshot);
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    onKeydown({ keyCode, target }) {
      if (keyCode === 13 && target.value) {
        this.sendMessage(target.value);
        target.value = '';
      }
    },
    onSnapshot(snapshot) {
      const { scroll } = this.$refs;
      const shouldScroll = scroll.scrollHeight - scroll.scrollTop === scroll.clientHeight;
      snapshot.docChanges()
        .filter(change => (change.type === 'added'))
        .reverse()
        .forEach(({ doc }) => {
          const data = doc.data();
          this.messages.push({
            ...data,
            id: doc.id,
            time: data.time ? (data.time.seconds * 1000) : Date.now(),
          });
        });
      if (shouldScroll) {
        setImmediate(() => {
          scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
        });
      }
    },
    sendMessage(text) {
      db.collection('messages').add({
        text,
        time: FieldValue.serverTimestamp(),
      });
    },
  },
};
</script>

<template>
  <div class="chat">
    <div
      ref="scroll"
      class="messages"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        class="message"
      >
        <div class="text">{{ message.text }}</div>
        <div class="time">{{ message.time | timestamp }}</div>
      </div>
    </div>
    <div class="input">
      <input
        ref="input"
        @keydown="onKeydown"
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .chat {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    width: 100%;
    margin: 1rem;
    padding: 1rem;
    background: rgba(0, 0, 0, .5);
    border: 2px solid #141414;
    box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
  }
  .messages {
    position: relative;
    background: rgba(#000, .2);
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem 0.5rem 1rem 1rem;
  }
  .message {
    display: flex;
    align-items: center;
  }
  .text {
    flex-grow: 1;
    padding-right: 0.5rem;
  }
  .time {
    color: #999;
    font-size: 0.75em;
    margin-right: 0.5rem;
  }
  .input {
    position: relative;
    background: #000;
    input {
      background: transparent;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      border: 0;
      width: 100%;
      padding: 1rem;
      outline: 0;
    }
  }
</style>
