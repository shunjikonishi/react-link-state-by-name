
import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';

import LinkStateByName from "../index.js";

const MyComponent = React.createClass({
  mixins: [LinkStateByName],
  getInitialState() {
    return {
      a: {
        b: {
          c: "ccc",
          d: "ddd",
        },
        e: "eee",
      },
      var1: "",
    };
  },

  render() {
    return (
      <div>
        <input id="var1" name="var1"  value={this.state.var1}  onChange={this.linkStateByName} />
        <input id="abc"  name="a.b.c" value={this.state.a.b.c} onChange={this.linkStateByName} />
        <input id="abd"  name="a.b.d" value={this.state.a.b.d} onChange={this.linkStateByName} />
        <input id="ae"   name="a.e"   value={this.state.a.e}   onChange={this.linkStateByName} />
      </div>
    );
  },

});

describe("react-link-state-by-name", function() {
  it("should work with single name", function() {
    const wrapper = mount(<MyComponent />);
    const var1 = wrapper.find("#var1");

    assert.equal(wrapper.state().var1, "");
    assert.equal(var1.get(0).value, "");
    var1.simulate("change", {
      target: {
        name: "var1",
        value: "12345",
      },
    });
    assert.equal(wrapper.state().var1, "12345");
    assert.equal(var1.get(0).value, "12345");
    var1.simulate("change", {
      target: {
        name: "var1",
        value: "67890",
      },
    });
    assert.equal(wrapper.state().var1, "67890");
    assert.equal(var1.get(0).value, "67890");
  });

  it("should work with deep name", function() {
    const wrapper = mount(<MyComponent />);
    const abc = wrapper.find("#abc");
    const abd = wrapper.find("#abd");
    const ae  = wrapper.find("#ae");

    assert.equal(wrapper.state().a.b.c, "ccc");
    assert.equal(wrapper.state().a.b.d, "ddd");
    assert.equal(wrapper.state().a.e, "eee");

    assert.equal(abc.get(0).value, "ccc");
    assert.equal(abd.get(0).value, "ddd");
    assert.equal(ae.get(0).value, "eee");

    abc.simulate("change", {
      target: {
        name: "a.b.c",
        value: "12345",
      },
    });
    assert.equal(wrapper.state().a.b.c, "12345");
    assert.equal(wrapper.state().a.b.d, "ddd");
    assert.equal(wrapper.state().a.e, "eee");

    assert.equal(abc.get(0).value, "12345");
    assert.equal(abd.get(0).value, "ddd");
    assert.equal(ae.get(0).value, "eee");

    abd.simulate("change", {
      target: {
        name: "a.b.d",
        value: "67890",
      },
    });
    assert.equal(wrapper.state().a.b.c, "12345");
    assert.equal(wrapper.state().a.b.d, "67890");
    assert.equal(wrapper.state().a.e, "eee");

    assert.equal(abc.get(0).value, "12345");
    assert.equal(abd.get(0).value, "67890");
    assert.equal(ae.get(0).value, "eee");

    abd.simulate("change", {
      target: {
        name: "a.e",
        value: "abcde",
      },
    });
    assert.equal(wrapper.state().a.b.c, "12345");
    assert.equal(wrapper.state().a.b.d, "67890");
    assert.equal(wrapper.state().a.e, "abcde");

    assert.equal(abc.get(0).value, "12345");
    assert.equal(abd.get(0).value, "67890");
    assert.equal(ae.get(0).value, "abcde");
  });
});
