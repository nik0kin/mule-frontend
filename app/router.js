import Ember from 'ember';

var Router = Ember.Router.extend({
  location: MuleFrontendENV.locationType
});

Router.map(function() {
	this.resource('games', function () {
	});
});

export default Router;
