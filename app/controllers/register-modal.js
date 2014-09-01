import Ember from 'ember';
import constants from '../common/constants';

export default Ember.Controller.extend({
  actions: {
    register: function() {
      var webservicesUrl = constants.webservicesUrl + "/users",
        request = Ember.$.post(webservicesUrl, this.getProperties("username", "password"));
      request.then(this.loginSuccess.bind(this), this.loginFailure.bind(this));
    }
  },

  loginSuccess: function(data) {
    this.controllerFor('header-right').loginSuccess(data);
    this.transitionToRoute('users');
    this.reset();
  },

  loginFailure: function(err) {
    alert('register failed: ' + JSON.stringify(err));
    this.reset();
  },

  reset: function() {
    this.setProperties({
      username: '',
      password: ''
    });
  }
});
