/*global _ */
import Ember from 'ember';
import constants from '../common/constants';
import User from './User';

var RSVP = Ember.RSVP;

var Game = Ember.Object.extend({
  history: null,
  playersCount: function () {
    var c = 0;
    _.each(this.get('players'), function () {
      c++;
    });
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
  }.property('gameStatus'),
  playersArray: null,

  init: function () {
    var array = [], promises = [];
    _.each(this.get('players'), function (player, playerRel) {
      var pa = {
        relId: playerRel,
        id: player.playerID,
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
      history: new RSVP.Promise(function (resolve) {
        Ember.$.ajax({
          type: 'GET',
          url: constants.webservicesUrl + '/games/' + id + '/history',
          dataType: 'json',
          success: function (rawHistory) {
            //var game = Game.create(rawGame);        
            resolve(rawHistory);
          },
          error: function () { resolve({currentRound: 0}); }
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
  }
});

export default Game;