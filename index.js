"use strict";

var LinkStateByName = {
  linkStateByName: function(e) {
    var names = e.target.name.split(".");
    var newState = {};
    var targetValue = e.target.value;
    if (e.target.type === "checkbox") {
      targetValue = e.target.checked || false;
    }
    if (names.length === 1) {
      newState[names[0]] = targetValue;
    } else {
      var name1 = names[0];
      newState[name1] = Object.assign({}, this.state[name1]);
      names.reduce(function(value, name, index) {
        if (index === names.length - 1) {
          value[name] = targetValue;
          return value;
        }
        var ret = value[name];
        if (!ret) {
          ret = {};
          value[name] = ret;
        }
        return ret;
      }, newState);
    }
    this.setState(newState);
  },
};

module.exports = LinkStateByName;
