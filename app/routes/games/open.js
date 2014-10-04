import Ember from 'ember';
import Game from '../../models/Game';
import constants from '../../common/constants';

var OpenGamesRoute = Ember.Route.extend({
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