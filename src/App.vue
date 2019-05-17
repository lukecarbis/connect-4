<template>
  <div id="app" class="app">
    <h1>Connect 4 Match Results</h1>
    <nav>
      <ul>
        <li><button @click="displayAddMatch = true">New Match</button></li>
        <li><button @click="displayAddPlayer = true">New Player</button></li>
      </ul>
    </nav>
    <AddMatch v-model="displayAddMatch"/>
    <AddPlayer v-model="displayAddPlayer"/>
    <ResultsTable/>
  </div>
</template>

<script>
import AddMatch from './components/AddMatch'
import AddPlayer from './components/AddPlayer'
import ResultsTable from './components/ResultsTable'

export default {
  name: 'App',
  data () {
    return {
      displayAddMatch: false,
      displayAddPlayer: false
    }
  },
  components: {
    AddMatch,
    AddPlayer,
    ResultsTable
  }
}
</script>

<style>
.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0 20px;
}
</style>
