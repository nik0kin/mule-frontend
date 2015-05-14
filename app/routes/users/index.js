import Ember from 'ember';
import BaseRoute from '../baseRoute';
import User from '../../models/User';

var UsersRoute = BaseRoute.extend({
  beforeModel: function () {
    if (!this.controllerFor('headerRight').loggedInUserId) {
      this.transitionTo('games.open');
    }
  },
  
  model: function () {
    var userId = this.controllerFor('headerRight').loggedInUserId;
    console.log(':) userId = ' + userId);
    //var that = this;
    return User.fetchQ(userId);
  },
  
  setupController: function() {
    this.controllerFor('users').set('model', this.currentModel);
    this.controllerFor('headerRight').set('content', Ember.A({}));
  }
});

export default UsersRoute;
