import Ember from 'ember';
import constants from '../common/constants';

var User = Ember.Object.extend({

});


var allUsersCache;
User.reopenClass({
  getUserQ: function (id) {
    if (allUsersCache) {
      var user = allUsersCache.find(function (user) {
        return user._id === id;
      });
      return Ember.RSVP.resolve(user);
    }
    return this.fetchQ(id);
  },
  // costly to findall everytime, tsk tsk
  fetchQ: function(id) {
    return this.fetchAllQ().then(function (users) {
      return users.find(function(user) {
        if (user._id === id) {
          return user;
        }
      });
    });
  },

  fetchAllQ: function() {
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

          allUsersCache = users;
          resolve(users);
        },
        error: reject
      });
    });
  }
});

export default User;