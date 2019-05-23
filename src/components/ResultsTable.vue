<template>
  <div>
    <div v-for="match of matches" v-bind:key="match['.key']">
      <p>{{getDate(match.date)}}</p>
      <p v-if="match.first === match.red">
        <span class="red">{{match.red.nickname}}</span> vs. <span class="yellow">{{match.yellow.nickname}}</span>
      </p>
      <p v-else>
        <span class="yellow">{{match.yellow.nickname}}</span> vs. <span class="red">{{match.red.nickname}}</span>
      </p>
      <p v-if="match.winner" :class="match.result">{{match.winner.nickname}} wins!</p>
      <p v-if="match.result === 'tie'" :class="match.result">Tie!</p>
    </div>
  </div>
</template>

<script>
import { db } from '../db'

export default {
  data () {
    return {
      matches: [],
      players: [],
    }
  },
  firestore () {
    return {
      matches: db.collection('matches').orderBy('date'),
      players: db.collection('players').orderBy('nickname')
    }
  },
  methods: {
    getDate: function (timestamp) {
      let date = new Date(timestamp.seconds * 1000)
      return date.toLocaleDateString()
    }
  },
}
</script>

<style>
  .red {
    color: red;
  }
  .yellow {
    color: orange;
  }
</style>
