import Ember from 'ember';
import Game from '../../models/Game';
import constants from '../../common/constants';

var GamesRoute = Ember.Route.extend({
	renderTemplate: function () {
		this.render('headerRight', { 
      view: 'headerRight', 
      outlet: 'headerRight', 
      into: 'application',
      controller: this.controllerFor('headerRight')
    });
	},
  setupController: function(controller) {
    var that = this;
    Game.findAllQ().then(function (games) {
      that.controllerFor('games').set('content', games);

      var getHistorysQ = function (games) {
        var promises = [];

        games.forEach(function (game, index) {
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
      return getHistorysQ(games);
    });
    
		this.controllerFor('headerRight').set('content', Ember.A({}));
  }
});

export default GamesRoute;