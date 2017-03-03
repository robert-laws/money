var React = require('react');
var { Container, Segment, Header, Divider, Label } = require('semantic-ui-react');

var FindPercentage = require('FindPercentage');
var Dividend = require('Dividend');
var DividendYield = require('DividendYield');
var CapitalGains = require('CapitalGains');

var Chapter6 = React.createClass({
  render: function() {
    return (
      <div>
        <Container className="onlyTopDiv">
          <Header as="h1">Chapter 6/7</Header>
        </Container>
        <Dividend />
        <DividendYield />
        <CapitalGains />
        <Container className="onlyTopDiv">
          <Header as="h1">Utilities</Header>
        </Container>
        <FindPercentage />
      </div>
    )
  }
});

module.exports = Chapter6;
