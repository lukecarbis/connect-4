<template>
  <div>
    <div v-for="match of matches" v-bind:key="match['.key']">
      <p>{{getDate(match.date)}}</p>
      <p v-if="match.first === match.players.red">
        <span class="red">{{match.players.red.nickname}}</span> vs. <span class="yellow">{{match.players.yellow.nickname}}</span>
      </p>
      <p v-else>
        <span class="yellow">{{match.players.yellow.nickname}}</span> vs. <span class="red">{{match.players.red.nickname}}</span>
      </p>
      <p :class="match.winner === match.players.red ? 'red' : 'yellow'">{{match.winner.nickname}} wins!</p>
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
      console.log(timestamp)
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
