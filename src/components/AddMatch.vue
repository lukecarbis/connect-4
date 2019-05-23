<template>
  <div>
    <h2>New Match</h2>

    <p>
      <label for="add-match-date">Date</label>
      <datepicker v-model="match.date" id="add-match-date"></datepicker>
    </p>

    <p>
      <label for="add-match-red">Red Player</label>
      <select v-model="match.red" id="add-match-red">
        <option value="" disabled>Choose a Player</option>
        <option v-for="(player, idx) of players" :disabled="player === match.yellow" v-bind:key="idx" :value="player">
          {{player.nickname}}
        </option>
      </select>
    </p>

    <p>
      <label for="add-match-yellow">Yellow Player</label>
      <select v-model="match.yellow" id="add-match-yellow">
        <option value="" disabled>Choose a Player</option>
        <option v-for="(player, idx) of players" :disabled="player === match.red" v-bind:key="idx" :value="player">
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
        <option value="__tie">Match Tied</option>
        <template v-for="(player, key) of players">
          <option v-bind:key="key" :value="player" v-if="player">
            {{player.nickname}}
          </option>
        </template>
      </select>
    </p>

    <button @click="add()">Add</button>
  </div>
</template>

<script>
import { db } from '../db'
import datepicker from 'vue-date'

export default {
  data () {
    return {
      match: {
        date: new Date().toISOString().substring(0, 10),
        first: '',
        winner: '',
        result: '',
        red: '',
        yellow: '',
        players: []
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
        this.match.red === '' ||
        this.match.yellow === '' ||
        this.match.first === '' ||
        this.match.winner === ''
      ) {
        return false
      }
      if (this.match.red === this.match.yellow) {
        return false
      }

      this.match.players = [this.match.red, this.match.yellow]

      if ( this.match.winner === '__tie' ) {
        this.match.winner = ''
        this.match.result = 'tie'
      } else if ( this.match.winner === this.match.red ) {
        this.match.result = 'red'
      } else if ( this.match.winner === this.match.yellow ) {
        this.match.result = 'yellow'
      }

      let date = new Date( this.match.date )
      this.match.date = date

      db.collection('matches').add(this.match)
      this.reset()
    },
    remove(matchId) {
      db.collection('matches').doc(matchId).delete()
    },
    reset () {
      this.match.date = this.match.date.toISOString().substring(0, 10)
      this.match.players = []
      this.match.winner = ''
      this.match.first = ''
      this.match.red = ''
      this.match.yellow = ''
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
