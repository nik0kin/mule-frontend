import Ember from "ember";

export default Ember.Handlebars.registerBoundHelper('jsonToString', 
	function(json) {
		console.log('hello');
  return JSON.stringify(json);
});