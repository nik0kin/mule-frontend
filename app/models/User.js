import Ember from 'ember';
import constants from '../common/constants';

var User = Ember.Object.extend({

});


User.reopenClass({

  findQ: function(id) {
    return this.findAllQ().then(function (users) {
      return users.find(function(user) {
        if (user._id == id) {
          return user;
        }
      });
    });
  },

  findAllQ: function() {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        type: 'GET',
        url: constants.webservicesUrl + '/users',
        dataType: 'json',
        success: function (rawUsers) {
          var users = [];
          Ember.A(rawUsers).forEach(function (user) {
            users.addObject(User.create(user));
          });

           resolve(users);
        },
        error: reject
      });
    });
  }
});

export default User;