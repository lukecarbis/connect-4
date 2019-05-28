<template>
    <div class="player-selection">
        <a class="player-selection__cancel">
            <img src="/images/cancel.png">
        </a>
        <img class="player-image" src="/images/person-silhouette.png">
        <div class="player-selection__quick-stats">
            <h2>Quick Stats:</h2>
            <div class="stat-row"><label>Games Played:</label> 10</div>
            <div class="stat-row"><label>Games Won:</label> 5</div>
            <div class="stat-row"><label>Games Lost:</label> 4</div>
            <div class="stat-row"><label>Games Drawn:</label> 1</div>
            <div class="streak">W L W W L</div>
        </div>
        <div class="player-selection__avatars">
            <div class="player-selection__avatar" 
                 v-for="player of players"
                 :key="player.id"
                 @click="selectPlayer">
                <img src="/images/mario.png">
            </div>
        </div>
        <button class="player-selection__btn-confirm">Confirm</button>
    </div>
</template>

<script>
import { db } from '../db'

export default {
  data() {
    return {
      selectedPlayer: {},
      players: []
    }
  },
  firestore () {
    return {
      players: db.collection('players').orderBy('nickname')
    }
  },
  methods: {
    selectPlayer () {
        console.log('fdsf');
        this.selectedPlayer = this;
    }
  }
}
</script>

<style lang="less" scoped>
img {
    max-width: 100%;
}

.player-selection {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    overflow: hidden;
    max-width: 360px;
    margin: 0 auto;

    .player-image {
        width: 240px;
    }

    &__quick-stats {
        top: 420px;
        right: 40px;
        position: absolute;

        h2 {
            font-size: 18px;
        }

        .stat-row, .streak {
            font-size: 12px;
        }

        .streak {
            padding-top: 3px;
            font-weight: bold;
        }
    }

    &__avatars {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        right: 10px;
        top: 0;
        width: 100px;
        overflow-y: scroll;
        background: rgba(0, 0, 0, 0.4);
        max-height: 400px;
    }

    &__cancel {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 40px;
    }

    &__avatar {
        background: white;
        text-align: center;
        width: 100px;
        height: 100px;
        margin-bottom: 5px;

    }

    &__btn-confirm {
        position: absolute;
        bottom: 0;
        left: 0;
        border: 0;
        background: red;
        height: 60px;
        line-height: 60px;
        width: 100%;
    }
}

</style>