import Ember from 'ember';

var Game = Ember.Object.extend({

});


Game.reopenClass({

  find: function(id) {
    return this.findAll().find(function(notification) {
      if (parseInt(notification.id, 10) == id) {
        return notification;
      }
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