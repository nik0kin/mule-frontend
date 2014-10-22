import Ember from 'ember';
import BaseRoute from '../baseRoute';
import Game from '../../models/Game';

var OpenGamesRoute = BaseRoute.extend({
	renderTemplate: function () {
    this._super();
    this.render('games', {
      view: 'games/open',
      into: 'application',
      controller: this.controllerFor('games')
    });
	},
  setupController: function(controller) {
    var that = this;
    Game.findAllOpenQ().then(function (games) {
      that.controllerFor('games').set('content', games);
    });
    
		this.controllerFor('headerRight').set('content', Ember.A({}));
  }
});

export default OpenGamesRoute;