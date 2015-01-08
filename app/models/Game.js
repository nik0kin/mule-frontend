/*global _ */
import Ember from 'ember';
import constants from '../common/constants';
import User from './User';

var RSVP = Ember.RSVP;

var Game = Ember.Object.extend({
  history: null,
  isGameStatusOpen: Ember.computed.equal('gameStatus', 'open'),
  isGameStatusInProgress: Ember.computed.equal('gameStatus', 'inProgress'),
  isAutoProgress: Ember.computed.equal('turnProgressStyle', 'autoprogress'),

  ////////PLAYER STUFF/////////
  playersCount: function () {
    var c = 0;
    _.each(this.get('players'), function () {
      c++;
    });
    return c;
  }.property('players'),

  whosTurnPlayerRel: function () { // an array
    var h = this.get('history');

    if (!h) {
      return undefined;
    }

    if (h.turnSubmitStyle === 'roundRobin') {
      return [h.turnOrder[h.currentPlayerIndexTurn]];
    }

    var array = [];
    _.each(h.currentTurnStatus, function (status, playerRel) {
      if (status) {
        array.push(playerRel);
      }
    });

    return array;
  }.property('history'),

  whosTurnUsername: function () {
    var playersArray = this.get('playersArray'),
      whosTurnPlayerRel = this.get('whosTurnPlayerRel');

    if (!whosTurnPlayerRel || whosTurnPlayerRel.length === 0) {
      return undefined;
    }

    var usernamesArray = [];
    _.each(whosTurnPlayerRel, function (playerRel) {
      _.each(playersArray, function (playerInfo) {
        if (playerInfo.relId === playerRel) {
          usernamesArray.push(playerInfo.username);
        }
      });
    });

    return usernamesArray;
  }.property('whosTurnPlayerRel', 'playersArray'),

  whosTurnUsernameDisplay: function () {
    var whosTurnUsername = this.get('whosTurnUsername'),
      str = '';

    _.each(whosTurnUsername, function (username, index) {
      str += username;

      if (index !== whosTurnUsername.length - 1) {
        str += ', ';
      }
    });

    return str;
  }.property('whosTurnUsername'),

  ////////////////////////////
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
  }.property('gameStatus'),
  ruleBundleIconFile: function () {
    var ruleBundleName = this.get('ruleBundle.name').toLowerCase();
    if (ruleBundleName === 'mulesprawl' || ruleBundleName === 'backgammon') {
      return 'assets/images/ruleBundleIcons/' + ruleBundleName + '.png';
    }

    return null;
  }.property('ruleBundle.name'),
  playersArray: null,

  init: function () {
    var array = [], promises = [];
    _.each(this.get('players'), function (player, playerRel) {
      var pa = {
        relId: playerRel,
        id: player.playerId,
        status: player.playerStatus,
      };
      array.push(pa);
      var p =User.getUserQ(pa.id)
        .then(function (user) {
          pa.username = user.username;
        });
      promises.push(p);
    });
    var that = this;
    Ember.RSVP.all(promises).then(function () {
      that.set('playersArray', array);
    });
  }
});


Game.reopenClass({

  findQ: function(id) {
    var promise = new RSVP.Promise(function (resolve, reject) {
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
      })
      .then(function (game) {
        if (game.gameStatus === 'open') {
          return game;
        }

        return new RSVP.Promise(function (resolve) {
          Ember.$.ajax({
            type: 'GET',
            url: constants.webservicesUrl + '/games/' + id + '/history',
            dataType: 'json',
            success: function (rawHistory) {
              //var game = Game.create(rawGame);
              game.set('history', rawHistory);
              resolve(game);
            },
            error: function () { resolve({currentRound: 0}); }
          });
        });
      });

    return promise;
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

          var sortedGames = _.sortBy(games, function (game) {
            return {
              open: 0,
              inProgress: 1,
              finished: 2
            }[game.gameStatus];
          });

          resolve(sortedGames);
        },
        error: reject
      });
    });
  },
  findAllOpenQ: function() {
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

          var openGames = _.filter(games, function (game) {
            return game.gameStatus === 'open';
          });

          resolve(openGames);
        },
        error: reject
      });
    });
  }
});

export default Game;
