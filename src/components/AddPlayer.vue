<template>
  <div>
    <h2>New Player</h2>

    <p>
      <label for="add-player-first-name">First Name</label>
      <input v-model="player.name.first" id="add-player-first-name" />
    </p>

    <p>
      <label for="add-player-last-name">Last Name</label>
      <input v-model="player.name.last" id="add-player-last-name" />
    </p>

    <p>
      <label for="add-player-nickname">Nickname</label>
      <input v-model="player.nickname" id="add-player-nickname" />
    </p>

    <p>
      <label for="add-player-email">Email</label>
      <input v-model="player.email" id="add-player-email" type="email" />
    </p>

    <button @click="add()">Add</button>
  </div>
</template>

<script>
import { db } from '../db'

export default {
  data () {
    return {
      player: {
        name: {first: '', last: ''},
        nickname: '',
        email: ''
      }
    }
  },
  methods: {
    add () {
      if (
        this.player.name.first === '' ||
        this.player.name.last === '' ||
        this.player.nickname === '' ||
        this.player.email === ''
      ) {
        return false
      }
      db.collection('players').add(this.player)
      this.reset()
    },
    remove (playerId) {
      db.collection('players').doc(playerId).delete()
    },
    reset () {
      this.player.name = {first: '', last: ''}
      this.player.nickname = ''
      this.player.email = ''
    }
  }
}
</script>

<style>
</style>
