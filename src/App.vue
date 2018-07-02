<template>
  <div class="container" id="app">
    <div class=score-board>
      <p>Away: {{ awayScore }}</p>
      <p>Home: {{ homeScore }}</p>
      <p>Inning: {{ inning }}</p>
      <p>Outs: {{ outs }}</p>
    </div>
    <b-row>
      <b-col md="4" offset-md="4">
        <b-img src="/src/assets/field/000-field-view.png" fluid alt="Responsive image" />
      </b-col>
    </b-row>
    <b-row class="text-center">
      <template v-for="variant in actions">
        <b-col md="4" offset-md="4">
          <b-button variant="primary" class="play-action-btn">
            {{variant}}
          </b-button>
        </b-col>
      </template>
      <b-col md="4" offset-md="4">
        <b-button variant="danger" class="new-game-btn">New Game</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      actions: ['single','double','triple','home-run','steal','out'],
      homeScore: 0,
      awayScore: 0,
      inning: 1,
      outs: 0
    }
  }
}
</script>

<style lang="scss">
  .play-action-btn {
    margin: 5px 0;
    width: 100%;
  }

  .new-game-btn {
    margin: 25px 0;
    width: 100%;
  }
</style>
