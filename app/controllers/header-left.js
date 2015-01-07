import Ember from 'ember';
import constants from '../common/constants';

var HeaderLeftController = Ember.Controller.extend({
  isUp: false,
  init: function () {
    var that = this;
    Ember.$.getJSON(constants.webservicesUrl + '/alive', function (data, textStatus) {
      if (textStatus === 'success') {
        console.log('up');
        that.set('isUp', true);
      }
    });
  }
});

export default HeaderLeftController;
