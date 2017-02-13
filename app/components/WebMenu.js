var React = require('react');
var { Link, IndexLink } = require('react-router');
var { Segment, Menu, Icon } = require('semantic-ui-react');

var WebMenu = React.createClass({
  render() {
      return (
        <div className="ui inverted segment">
          <div className="ui inverted secondary pointing menu">
            <IndexLink className="item" activeClassName="active" to="/">Home</IndexLink>
            <Link className="item" activeClassName="active" to="/chapter1">Chapter 1</Link>
            <Link className="item" activeClassName="active" to="/chapter2">Chapter 2</Link>
            <Link className="item" activeClassName="active" to="/chapter3">Chapter 3</Link>
          </div>
        </div>
      )
  }
});

module.exports = WebMenu;
