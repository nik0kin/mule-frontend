import Ember from 'ember';
import GamesController from './games';

var HeaderRightController = Ember.Controller.extend({
  //contentBinding: GamesController
  loginFailed: false,
  isProcessing: false,
  isSlowConnection: false,
  timeout: null,

  login: function() {
    this.setProperties({
      loginFailed: false,
      isProcessing: true
    });

    this.set("timeout", setTimeout(this.slowConnection.bind(this), 5000));

    var request = Ember.$.post("http://localhost:3130/LoginAuth", this.getProperties("username", "password"));
    request.then(this.success.bind(this), this.failure.bind(this));
    console.log('log in');
  },

  success: function() {
    this.reset();
    //document.location = "/welcome";
  },

  failure: function() {
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