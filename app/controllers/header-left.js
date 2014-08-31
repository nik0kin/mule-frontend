import Ember from 'ember';
import constants from '../common/constants';

var HeaderLeftController = Ember.Controller.extend({
  isUp: false,
  init: function () {
    var that = this;
    Ember.$.get(constants.webservicesUrl + '/alive', {
      dataType: 'json',
      success: function () {
        console.log('up')
        that.set('isUp', true);
      }
    });
  }
});

export default HeaderLeftController;