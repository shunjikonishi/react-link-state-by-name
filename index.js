"use strict";

var LinkStateByName = {
  linkStateByName(e) {
    var names = e.target.name.split(".");
    var newState = {};
    if (names.length === 1) {
      newState[names[0]] = e.target.value;
    } else {
      var name1 = names[0];
      newState[name1] = Object.assign({}, this.state[name1]);
      names.reduce(function(value, name, index) {
        if (index === names.length - 1) {
          value[name] = e.target.value;
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
