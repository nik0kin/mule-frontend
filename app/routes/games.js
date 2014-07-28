import Ember from 'ember';
import Game from '../models/Game';

var GamesRoute = Ember.Route.extend({
  setupController: function(controller) {
    controller.set('model', Game.findAll());
  }
});

export default GamesRoute;