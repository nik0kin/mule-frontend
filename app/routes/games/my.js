/*global _ */

import Ember from 'ember';
import Game from '../../models/Game';
import constants from '../../common/constants';

var MyGamesRoute = Ember.Route.extend({

  beforeModel: function () {
    if (!this.controllerFor('headerRight').loggedInUserId) {
      this.transitionTo('games.open');
    }
  },

  renderTemplate: function () {
    this.render('headerLeft', { 
      view: 'headerLeft', 
      outlet: 'headerLeft', 
      into: 'application',
      controller: this.controllerFor('headerLeft')
    });
    this.render('headerRight', { 
      view: 'headerRight', 
      outlet: 'headerRight', 
      into: 'application',
      controller: this.controllerFor('headerRight')
    });
    this.render('games', {
      view: 'games/my',
      into: 'application',
      controller: this.controllerFor('games')
    });
  },
  setupController: function() {
    var that = this,
      loggedInUserId = this.controllerFor('headerRight').loggedInUserId;

    Game.findAllQ().then(function (games) {
      var myGames = _.filter(games, function (game) {
        var userInGame = false;

        _.each(game.players, function (player) {
          if (player.playerID === loggedInUserId) {
            userInGame = true;
          }
        });

        return userInGame;
      });
console.log(myGames)
      that.controllerFor('games').set('content', myGames);

      var getHistorysQ = function (_games) {
        var promises = [];

        _games.forEach(function (game) {
          if (game.gameStatus === 'open') { return; }
          var p = new Ember.RSVP.Promise(function (resolve, reject) {
            Ember.$.ajax({
              type: 'GET',
              url: constants.webservicesUrl + '/games/' + game.get('_id') + '/history',
              dataType: 'json',
              success: resolve,
              error: reject
            });
          }).then(function (rawHistory) {
            console.log(rawHistory);
            game.set('history', rawHistory);
            game.set('roundNumber', rawHistory.roundNumber);
            console.log(game);
          });
          promises.push(p);
        });

        return Ember.RSVP.all(promises);
      };
      return getHistorysQ(myGames);
    });
    
    this.controllerFor('headerRight').set('content', Ember.A({}));
  }
});

export default MyGamesRoute;