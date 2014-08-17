import Ember from 'ember';
import GamesController from './games';
import constants from '../common/constants';

var HeaderRightController = Ember.Controller.extend({
  //contentBinding: GamesController
  loginFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,

  loggedIn: false,
  loggedInUserId: null,
  loggedInUsername: null,

  login: function() {
    this.setProperties({
      loginFailed: false,
      isProcessing: true
    });

    this.set("timeout", setTimeout(this.slowConnection.bind(this), 5000));

    var webservicesUrl = constants.webservicesUrl + "/LoginAuth",
      request = Ember.$.post(webservicesUrl, this.getProperties("username", "password"));
    request.then(this.loginSuccess.bind(this), this.loginFailure.bind(this));
  },

  loginSuccess: function(data) {
    this.set('loggedIn', true);
    this.set('loggedInUserId', data.userID);
    this.set('loggedInUsername', data.username);
    this.reset();
    this.transitionToRoute('users');
  },

  loginFailure: function() {
    this.reset();
    this.set("loginFailed", true);
  },

  slowConnection: function() {
    this.set("isSlowConnection", true);
  },

  reset: function() {
    clearTimeout(this.get("timeout"));
    this.setProperties({
      isProcessing: false,
      isSlowConnection: false
    });
  }
});

export default HeaderRightController;