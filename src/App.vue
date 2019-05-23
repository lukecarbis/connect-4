<template>
  <div id="app" class="app">
    <h1>Connect 4</h1>
    <nav>
      <ul>
        <li><a href="/">Results</a></li>
        <li><a href="/new/match">New Match</a></li>
        <li><a href="/new/player">New Player</a></li>
      </ul>
    </nav>
    <RouterView/>
  </div>
</template>

<script>
import RouterView from './components/RouterView'

export default {
  name: 'App',
  components: {
    RouterView
  }
}
</script>

<style>
.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0 20px;
}
</style>
