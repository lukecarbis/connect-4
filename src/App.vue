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
body {
  margin: 0;
}
.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 2rem;
  background: #f5f5f5;
  margin: 0;
  color: #222;
}
h1 {
  margin: 0 0 1rem;
}
a {
  color: #444;
}
a:hover {
  color: #000;
}
nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}
nav ul li {
  flex: 0 1 auto;
  margin: 0.5rem;
}
</style>
