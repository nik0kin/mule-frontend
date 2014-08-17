import Ember from 'ember';

var Router = Ember.Router.extend({
  location: MuleFrontendENV.locationType
});

Router.map(function() {
	this.resource('games', { path: '/games' }, function () {
	});
  this.resource('users', { path: '/users' }, function () {
  });
});

export default Router;
