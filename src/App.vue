<template>
  <div class="container">
    <div class="score-board">
      <b-row class="text-center scoreboard">
        <b-col md="2" offset-md="4">
          <p>Away: {{ awayScore }}</p>
          <p>Home: {{ homeScore }}</p>
        </b-col>
        <b-col md="2">
          <p>Inning: {{ inning }}</p>
          <p>Outs: {{ outs }}</p>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col md="6" offset-md="3">
        <b-img :src="fieldViewImg" fluid alt="Responsive image" />
      </b-col>
    </b-row>
    <b-row class="text-center">
      <template v-for="action in actions">
        <b-col md="6" offset-md="3">
          <b-button @click="actionClick(action)" variant="primary" class="play-action-btn">
            {{action}}
          </b-button>
        </b-col>
      </template>
      <b-col md="6" offset-md="3">
        <b-button @click="newGame()" variant="danger" class="new-game-btn">New Game</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="log-section text-center" md="6" offset-md="3">
        <h3>Last 10 Plays:</h3>
        <ul>
          <template v-for="entry in gameLog">
            <template v-for="(play, team) in entry">
              <li class="game-log" :id="team">
                {{ play }}
              </li>
            </template>
          </template>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        actions: ['single','double','triple','homerun','steal','out'],
        homeScore: 0,
        awayScore: 0,
        inning: 1,
        outs: 0,
        isAwayAtBat: true,
        gameLog: [],
        lastPlay: '000'
      }
    },
    methods: {
      actionClick(action) {
        var teamAtBat = this.isAwayAtBat ? "away" : "home";
        if (action == 'out') {
          this.outs ++
          this.updateGameLog(teamAtBat, 'Player called out!');

          if (this.outs == 3) {
            this.inningChange();
          }
          return;
        }

        var eventHash = this.combos[action][this.lastPlay]
        this.lastPlay = eventHash.new;
        if (eventHash.runs_scored > 0) {
          this.updateScore(teamAtBat, eventHash.runs_scored);
        };
        this.updateGameLog(teamAtBat, eventHash.play_call);
      },
      updateScore(teamAtBat, runs_scored) {
        if (teamAtBat == 'away') {
          this.awayScore = this.awayScore + runs_scored;
        } else {
          this.homeScore = this.homeScore + runs_scored;
        };
      },
      updateGameLog(team, message) {
        this.gameLog.unshift({
          [team]: message,
        });

        if (this.gameLog.length > 10) {
          this.gameLog.splice(-1,1)
        }
      },
      inningChange() {
        this.outs = 0;
        this.isAwayAtBat = !this.isAwayAtBat;
        if (this.isAwayAtBat == true) {
          this.inning ++;
        };
        this.lastPlay = '000';
        if (this.inning == 10) {
          alert("Game over! Final Score:\nAway: " + this.awayScore + "\nHome: " + this.homeScore);
          this.resetGame();
        }
      },
      resetGame() {
        this.homeScore = 0;
        this.awayScore = 0;
        this.inning = 1;
        this.outs = 0;
        this.isAwayAtBat = true;
        this.gameLog = [];
        this.lastPlay = '000';
      },
      newGame() {
        if (confirm('Are you sure you want to start a new game?')) {
          this.resetGame();
        };
      }
    },
    computed: {
      fieldViewImg() {
        if (process.env.NODE_ENV === 'production') {
          return "assets/field/" + this.lastPlay + "-field-view.png"
        } else {
          return "/src/assets/field/" + this.lastPlay + "-field-view.png"
        }
      }
    }
  }
</script>

<style lang="scss">
  .scoreboard {
    font-weight: bold
  }

  .play-action-btn {
    margin: 5px 0;
    width: 100%;
  }

  .new-game-btn {
    margin: 25px 0;
    width: 100%;
  }

  .log-section ul {
      list-style: none;
      font-weight: bold;
      text-transform: uppercase;
      padding-left: 0px;
      text-align: center;
  }

  .log-section ul li {
      margin: 5px;
      border-radius: 3px;
  }

  #away {
    color: red;
    background-color: #ffc0c1;
  }

  #home {
    color: blue;
    background-color: #e4e8ff;
  }
</style>
