import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('games');
  }
});

export default IndexRoute;