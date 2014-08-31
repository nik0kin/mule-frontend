import Ember from 'ember';
import User from '../../models/User';

var UsersRoute = Ember.Route.extend({
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
	},
  beforeModel: function () {
    if (!this.controllerFor('headerRight').loggedInUserId) {
      this.transitionTo('games');
    }
  },
  
  model: function () {
    var userId = this.controllerFor('headerRight').loggedInUserId;
    console.log(':) userId = ' + userId);
    //var that = this;
    return User.findQ(userId)
  },
  
  setupController: function(controller) {
    this.controllerFor('users').set('content', this.currentModel);
		this.controllerFor('headerRight').set('content', Ember.A({}));
  }
});

export default UsersRoute;