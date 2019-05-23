<template>
	<component :is="currentView"></component>
</template>

<script>
import AddMatch from './AddMatch'
import AddPlayer from './AddPlayer'
import ResultsTable from './ResultsTable'

const routes = {
  '/': ResultsTable,
  '/new/match': AddMatch,
  '/new/player': AddPlayer,
}

export default {
  data () {
    return {
      route: window.location.pathname
    }
  },
  computed: {
    currentView () {
      return routes[ this.route ] || routes['/']
    }
  }
}
</script>
