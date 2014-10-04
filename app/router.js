import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('games', { path: '/games' }, function () {
    this.route('all', { path: '/all'}); // formerly /games
    this.route('open', { path: '/open'});
    this.route('my', { path: '/my'});

    this.route("show", { path: '/:_id'});
  });
  this.resource('users', { path: '/users' }, function () {
  });
});

export default Router;
