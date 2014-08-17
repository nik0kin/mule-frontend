import Ember from 'ember';
import Game from '../../models/Game';

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
    var games = Game.findAll();
    
    this.controllerFor('games').set('content', games);
		this.controllerFor('headerRight').set('content', Ember.A({}));
  }
});

export default GamesRoute;