"use strict";
var merge = require("lodash.merge");

var LinkStateByName = {
  linkStateByName(e) {
    var names = e.target.name.split(".");
    var newState = {};
    if (names.length === 1) {
      newState[names[0]] = e.target.value;
    } else {
      newState = merge(this.state, names.reduceRight(function(value, name) {
        var ret = {};
        ret[name] = value;
        return ret;
      }, e.target.value));

    }
    this.setState(newState);
  }
};

module.exports = LinkStateByName;
