import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('games.open');
  }
});

export default IndexRoute;