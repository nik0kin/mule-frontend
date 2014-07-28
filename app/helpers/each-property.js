import Ember from "ember";

export default Ember.Handlebars.registerHelper('every', function(context, options) {
  var oArray = [], actualData = this.get(context);

  for (var k in actualData) {
    oArray.push({
      key: k,
      value: actualData[k]
    });
  }

  this.set(context, oArray);
  return Ember.Handlebars.helpers.each.apply(this, 
      Array.prototype.slice.call(arguments));
});