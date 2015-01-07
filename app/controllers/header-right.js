import Ember from 'ember';
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

  init: function () {
    var that = this;

    Ember.$.get(constants.webservicesUrl + '/session')
      .then(function (result) {
        console.log('logged in as ' + result._id);

        that.set('loggedIn', true);
        that.set('loggedInUserId', result._id);
        that.set('loggedInUsername', result.username);
      });
  },

  actions: {
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

    logout: function () {
      this.setProperties({
        loggedIn: false,
        loggedInUserId: undefined,
        loggedInUsername: undefined
      });

      var webservicesUrl = constants.webservicesUrl + "/logout",
        that = this;

      Ember.$.post(webservicesUrl)
        .then(function () {
          console.log('logged out');
          that.transitionToRoute('games.open');
        });
    }
  },

  loginSuccess: function(data) {
    this.set('loggedIn', true);
    this.set('loggedInUserId', data.userId);
    this.set('loggedInUsername', data.username);
    this.reset();
    this.transitionToRoute('games.my');
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
