<template>
  <div v-if="display">
    <h2>New Match</h2>

    <p>
      <label for="add-match-date">Date</label>
      <datepicker v-model="match.date" id="add-match-date"></datepicker>
    </p>

    <p>
      <label for="add-match-red">Red Player</label>
      <select v-model="match.players.red" id="add-match-red">
        <option value="" disabled>Choose a Player</option>
        <option v-for="(player, idx) of players" :disabled="player === match.players.yellow" v-bind:key="idx" :value="player">
          {{player.nickname}}
        </option>
      </select>
    </p>

    <p>
      <label for="add-match-yellow">Yellow Player</label>
      <select v-model="match.players.yellow" id="add-match-yellow">
        <option value="" disabled>Choose a Player</option>
        <option v-for="(player, idx) of players" :disabled="player === match.players.red" v-bind:key="idx" :value="player">
          {{player.nickname}}
        </option>
      </select>
    </p>

    <p>
      <label for="add-match-first">Who Played First?</label>
      <select v-model="match.first" id="add-match-first">
        <option value="" disabled>Choose a Player</option>
        <template v-for="(player, key) of players">
          <option v-bind:key="key" :value="player" v-if="player">
            {{player.nickname}}
          </option>
        </template>
      </select>
    </p>

    <p>
      <label for="add-match-winner">Who Won?</label>
      <select v-model="match.winner" id="add-match-winner">
        <option value="" disabled>Choose a Player</option>
        <template v-for="(player, key) of players">
          <option v-bind:key="key" :value="player" v-if="player">
            {{player.nickname}}
          </option>
        </template>
      </select>
    </p>

    <button @click="add()">Add</button>
    <button @click="close()">Close</button>
  </div>
</template>

<script>
import { db } from '../db'
import datepicker from 'vue-date'

export default {
  model: {
    prop: 'display',
    event: 'display'
  },
  props: {
    display: Boolean
  },
  data () {
    return {
      match: {
        date: new Date().toISOString().substring(0, 10),
        first: '',
        winner: '',
        players: {red: '', yellow: ''}
      },
      players: []
    }
  },
  firestore () {
    return {
      players: db.collection('players').orderBy('nickname')
    }
  },
  components: {
    datepicker
  },
  methods: {
    add () {
      if (
        this.match.date === '' ||
        this.match.players.red === '' ||
        this.match.players.yellow === '' ||
        this.match.first === '' ||
        this.match.winner === ''
      ) {
        return false
      }
      if (this.match.players.red === this.match.players.yellow) {
        return false
      }

      db.collection('matches').add(this.match)
      this.reset()
      this.close()
    },
    remove(matchId) {
      db.collection('matches').doc(matchId).delete()
    },
    reset () {
      this.match.date = new Date().toISOString().substring(0, 10)
      this.match.players = {red: '', yellow: ''}
      this.match.winner = ''
      this.match.first = ''
      this.match.close()
    },
    close () {
      this.$emit('display', false)
    }
  }
}
</script>

<style>
  .date-picker {
    display: inline-block;
    width: 150px;
  }
</style>
