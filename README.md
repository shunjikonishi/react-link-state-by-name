# react-link-state-by-name
A substitute of react-link-state

## Install

```
npm install react-link-state-by-name --save
```

## How to use
This mixin decide target state by name attribute.
You can use deep state too.

``` javascript
var LinkStateByName = require("react-link-state-by-name");

var MyComponent = React.createClass({
  mixins: [LinkStateByName],
  getInitialState() {
    return {
      foo: {
        var: ""
      },
      hoge: ""
    };
  },

  render() {
    return (
      <div>
        <input name="hoge" value={this.state.hoge} onChange={this.linkStateByName} />
        <input name="foo.var" value={this.state.foo.var} onChange={this.linkStateByName} />
      </div>
    );
  },

});
```
