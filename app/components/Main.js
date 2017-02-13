var React = require('react');
var WebMenu = require('WebMenu');
var Footer = require('Footer');
var styles = require('./../styles/ui.scss')

var Main = React.createClass({
  render: function () {
    return (
      <div>
        <WebMenu />
        {this.props.children}
        <Footer />
			</div>
    );
  }
});

module.exports = Main;
