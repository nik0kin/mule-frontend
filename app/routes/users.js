import Ember from 'ember';
import User from '../models/User';

var UsersRoute = Ember.Route.extend({
	renderTemplate: function () {
		this.render('headerRight', { 
      view: 'headerRight', 
      outlet: 'headerRight', 
      into: 'application',
      controller: this.controllerFor('headerRight')
    });
	},
  setupController: function(controller) {
    var userId = this.controllerFor('headerRight').loggedInUserId;
    console.log('userId = ' + userId);
    var that = this;
    User.findQ(userId).then(function (user) {
      console.log('YEELLING');
      console.log(user);
      //that.controllerFor('users.index').set('content', user);
      //controller.set('content', user);
      //that.refresh();
    });

		this.controllerFor('headerRight').set('content', Ember.A({}));
  }
});

export default UsersRoute;