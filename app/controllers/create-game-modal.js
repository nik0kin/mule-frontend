import Ember from 'ember';
import constants from '../common/constants';

export default Ember.Controller.extend({
  actions: {
    createGame: function() {
      var webservicesUrl = constants.webservicesUrl + "/games",
        request = Ember.$.post(webservicesUrl, this.getProperties("name"));
      request.then(this.createGameSuccess.bind(this), this.createGameFailure.bind(this));
    }
  },

  createGameSuccess: function(data) {
    this.transitionToRoute('games', data._id);
    this.reset();
  },

  createGameFailure: function(err) {
    alert('create game failed: ' + JSON.stringify(err));
    //this.reset();
  },

  reset: function() {
    this.setProperties({
      name: ''
    });
  }
});
