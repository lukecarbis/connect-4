<template>
  <div>
    <h2>New Match</h2>

    <p>
      <label for="add-match-date">Date</label>
      <datepicker v-model="field.date" id="add-match-date"></datepicker>
    </p>

    <p>
      <label for="add-match-red">Red Player</label>
      <select v-model="field.red" id="add-match-red">
        <option value="" disabled>Choose a Player</option>
        <option v-for="player of players" :disabled="player.id === field.yellow" :key="player.id" :value="player.id">
          {{player.nickname}}
        </option>
      </select>
    </p>

    <p>
      <label for="add-match-yellow">Yellow Player</label>
      <select v-model="field.yellow" id="add-match-yellow">
        <option value="" disabled>Choose a Player</option>
        <option v-for="player of players" :disabled="player.id === field.red" :key="player.id" :value="player.id">
          {{player.nickname}}
        </option>
      </select>
    </p>

    <p>
      <label for="add-match-first">Who Played First?</label>
      <select v-model="field.first" id="add-match-first">
        <option value="" disabled>Choose a Player</option>
        <template v-for="player of players">
          <option :key="player.id" :value="player.id" v-if="player.id === field.red">
            {{player.nickname}}
          </option>
          <option :key="player.id" :value="player.id" v-if="player.id === field.yellow">
            {{player.nickname}}
          </option>
        </template>
      </select>
    </p>

    <p>
      <label for="add-match-winner">Who Won?</label>
      <select v-model="field.winner" id="add-match-winner">
        <option value="" disabled>Choose a Player</option>
        <option value="__tie">Match Tied</option>
        <template v-for="player of players">
          <option :key="player.id" :value="player.id" v-if="player.id === field.red">
            {{player.nickname}}
          </option>
          <option :key="player.id" :value="player.id" v-if="player.id === field.yellow">
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
      field: {
        date: new Date().toISOString().substring(0, 10),
        first: '',
        winner: '',
        red: '',
        yellow: '',
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
        this.field.date === '' ||
        this.field.red === '' ||
        this.field.yellow === '' ||
        this.field.first === '' ||
        this.field.winner === ''
      ) {
        return false
      }
      if ( this.field.red === this.field.yellow ) {
        return false
      }

      // Format the data for Firestore
      let match = {}

      // Save the current time with the selected date, so that entries appear in order
      let matchTime = new Date()
      let matchDate = new Date( this.field.date )
      match.date = new Date(
        matchDate.getFullYear(),
        matchDate.getMonth(),
        matchDate.getDate(),
        matchTime.getHours(),
        matchTime.getMinutes(),
        matchTime.getSeconds(),
      )

      match.red = db.collection('players').doc( this.field.red )
      match.yellow = db.collection('players').doc( this.field.yellow )
      match.players = [match.red, match.yellow]

      if ( this.field.winner === '__tie' ) {
        match.result = 'tie'
      } else if ( this.field.winner === this.field.red ) {
        match.result = 'red'
        match.winner = match.red
      } else if ( this.field.winner === this.field.yellow ) {
        match.result = 'yellow'
        match.winner = match.yellow
      }

      db.collection('matches').add( match )
      this.reset()
    },
    remove(matchId) {
      db.collection('matches').doc( matchId ).delete()
    },
    reset () {
      this.field.players = []
      this.field.winner = ''
      this.field.first = ''
      this.field.red = ''
      this.field.yellow = ''
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
