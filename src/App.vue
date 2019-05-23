<template>
  <div id="app" class="app">
    <h1>Connect 4</h1>
    <nav>
      <ul>
        <li><router-link to="/">Results</router-link></li>
        <li><router-link to="/new/match">New Match</router-link></li>
        <li><router-link to="/new/player">New Player</router-link></li>
      </ul>
    </nav>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import ResultsTable from './components/ResultsTable'
import AddMatch from './components/AddMatch'
import AddPlayer from './components/AddPlayer'
import VueRouter from 'vue-router'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: ResultsTable },
    { path: '/new/match', component: AddMatch },
    { path: '/new/player', component: AddPlayer },
  ]
})

export default {
  name: 'App',
  router
}
</script>

<style>
.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0 20px;
}
</style>
