import Ember from 'ember';
import constants from '../common/constants';

var RSVP = Ember.RSVP;

var Game = Ember.Object.extend({
  history: null,
  playersCount: function () {
    var c = 0;
    for(var p in this.get('players')) {
      c++;
    }
    return c;
  }.property('players'),
  statusMsg: function () {
    switch(this.get('gameStatus')){
      case 'open':
        return "Open";
      case 'inProgress':
        return "In Progress";
      case 'finished':
        return "Ended";
      default:
        //error
        return '';
    }
  }.property('gameStatus'),
  statusColor: function () {
    switch(this.get('gameStatus')){
      case 'open':
        return "#00FF00";
      case 'inProgress':
        return "#0000FF";
      case 'finished':
        return "#FF0000";

      default:
        //error
        return "#000000";
    }
  }.property('gameStatus')
});


Game.reopenClass({

  findQ: function(id) {
    var promises = {
      game: new RSVP.Promise(function (resolve, reject) {
        Ember.$.ajax({
          type: 'GET',
          url: constants.webservicesUrl + '/games/' + id,
          dataType: 'json',
          success: function (rawGame) {
            var game = Game.create(rawGame);        
            resolve(game);
          },
          error: reject
        });
      }),
      history: new RSVP.Promise(function (resolve, reject) {
        Ember.$.ajax({
          type: 'GET',
          url: constants.webservicesUrl + '/games/' + id + '/history',
          dataType: 'json',
          success: function (rawHistory) {
            //var game = Game.create(rawGame);        
            resolve(rawHistory);
          },
          error: function () { resolve({currentRound: 0}) }
        });
      })
    };

    return RSVP.hash(promises)
      .then(function (results) {
        var game = results.game;
        game.history = results.history;

        return game;
      });
  },
  findAllQ: function() {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: constants.webservicesUrl + '/games',
        dataType: 'json',
        success: function (rawGames) {
          var games = [];
          Ember.A(rawGames).forEach(function (game) {
            games.addObject(Game.create(game));
          });

           resolve(games);
        },
        error: reject
      });
    });
  },
  findAll: function() {

    var games = [],
    rawGames = [
  {
    "gameBoard": "53c4d049f40d217718cd8936",
    "ruleBundle": {
      "id": "53c4d034f40d217718cd8931",
      "name": "MuleSprawl"
    },
    "ruleBundleGameSettings": {
      "customBoardSettings": {
        "height": 20,
        "width": 20
      }
    },
    "_id": "53c4d049f40d217718cd8935",
    "__v": 0,
    "players": {
      "p1": {
        "playerID": "53c4d03cf40d217718cd8932",
        "playerStatus": "inGame"
      }
    },
    "gameStatus": "inProgress",
    "maxPlayers": 1,
    "nextTurnTime": "2014-07-27T18:02:45.408Z",
    "turnTimeLimit": 15,
    "turnProgressStyle": "autoprogress",
    "name": "n"
  },
  {
    "gameBoard": "53d53eab6b1a0641469edb76",
    "ruleBundle": {
      "id": "53c4d034f40d217718cd892d",
      "name": "Backgammon"
    },
    "_id": "53d53eab6b1a0641469edb75",
    "__v": 0,
    "players": {
      "p1": {
        "playerID": "53d53e9d6b1a0641469edb74",
        "playerStatus": "inGame"
      }
    },
    "gameStatus": "open",
    "maxPlayers": 2,
    "nextTurnTime": "3130-03-31T09:13:01.000Z",
    "turnTimeLimit": 99999,
    "turnProgressStyle": "waitprogress",
    "name": "back gammon game :)"
  }
];

    Ember.A(rawGames).forEach(function(game) {
      games.addObject(Game.create(game));
    });

    return games;
  }
});

export default Game;