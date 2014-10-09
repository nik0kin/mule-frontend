import Ember from 'ember';

var GamesIndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('games.open');
  }
});

export default GamesIndexRoute;